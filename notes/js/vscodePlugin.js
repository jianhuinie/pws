const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const stage3 = require('acorn-stage3');
const jsx = require("acorn-jsx");
const walk = require('acorn-walk');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

// 遍历ast节点
function walkNode(node, callback) {
	callback(node);
	// 有 type 字段的我们认为是一个节点
	Object.keys(node).forEach((key) => {
		const item = node[key];

		if (Array.isArray(item)) {
			item.forEach((sub) => {
			  sub.type && walkNode(sub, callback);
			})
		}

		item && item.type && walkNode(item, callback);
	})
}

// 获取dispatch函数调用的type参数字符串的位置
function getDispatchTypeWordRangeAtPosition(sourceFileText) {
	const {
		Range,
		Position
	} = vscode;

	const dispatchStatement = [];

	// 获取AST
	const sourceCodeSynsax = acorn.Parser.extend(stage3).extend(jsx()).parse(sourceFileText, {
		ecmaVersion: 2020,
		sourceType: 'module',
		locations: true
	});

	// 遍历AST，找出disptch调用参数type位置
	walkNode(sourceCodeSynsax, (node) => {
		// 如果是dispatch函数调用
		if (node.type === 'CallExpression' && node.callee.name === 'dispatch') {
			// 获取第一个参数
			const [dispatchArguments] = node.arguments;

			// 获取参数中type属性值AST节点
			const {value} = dispatchArguments.properties.find(item => item.key.name === 'type');

			const {
				loc: {
					start,
					end
				},
				value: typeValue
			} = value;

			dispatchStatement.push({
				loc: new Range(
					new Position(start.line, start.column),
					new Position(end.line, end.column)
				),
				value: typeValue
			});
		}
	});

	return dispatchStatement;
}

/**
 * 解析model文件夹下的所有model
 */
function parseModel(modelAbsolutePath) {
	let allNamespace = {};

	let allFiles = fs.readdirSync(modelAbsolutePath);

	for(let i = 0; i < allFiles.length; i ++) {
		const currFilePath = path.join(modelAbsolutePath, allFiles[i]);
		let currFileState = fs.statSync(currFilePath);

		// 如果是目录
		if(currFileState.isDirectory()) {
			Object.assign(allNamespace, parseModel(currFilePath));
		}

		// 如果是文件
		if (currFileState.isFile()) {
			// 当前文件的解析结果
			const currFileNamespace = {
				path: currFilePath,
				effectOrReducerName: {}
			};
			let currNameSpace = null;

			// 当前文件源代码
			const modelSourceCode = fs.readFileSync(currFilePath, 'utf-8');

			// 获取AST
			const sourceCodeSynsax = acorn.Parser.extend(stage3).parse(modelSourceCode, {
				ecmaVersion: 2020,
				sourceType: 'module',
				locations: true
			});

			// 遍历AST，找出disptch调用参数type位置
			walkNode(sourceCodeSynsax, (node) => {
				// 如果是namespace 且只解析一次
				if (
					currNameSpace === null &&
					node.type === 'Property' &&
					node.key.name === 'namespace'
				) {
					currNameSpace = node.value.value;
				}

				// 如果是effects或者reducers
				if (
					node.type === 'Property' && (
						node.key.name === 'effects' ||
						node.key.name === 'reducers'
					)
				) {
					// 获取第一个参数
					node.value.properties.forEach(item => {
						const {
							key: {
								name
							},
							loc: {
								start
							}
						} = item;

						currFileNamespace.effectOrReducerName[name] = start;
					});
				}
			});

			allNamespace[currNameSpace] = currFileNamespace;
		}
	}

	return allNamespace;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// dispatch type参数跳转model
	let dispatchDefineDisposable = vscode.languages.registerDefinitionProvider("javascriptreact", {
		provideDefinition(document, position, token) {
			const allDispatchModelStrPosition = getDispatchTypeWordRangeAtPosition(document.getText());
			const positionRange = allDispatchModelStrPosition.find(
				item => item.loc.contains(position.translate(1, 1))
			);

			if (positionRange) {
				// dispatch 的 model/function 字符串
				// const dispatchTargetText = document.getText(positionRange).slice(1, -1).trim();
				const dispatchTargetText = positionRange.value;
				// 去掉前后的引号并且使用‘/’分割
				const [dvaModelNameSpace, functionName] = dispatchTargetText.split('/');
				//找到此文件中函数functionName在第几行第几列
				// 获取model绝对路径
				const modelAbsolutePath = path.join(
					vscode.workspace.workspaceFolders[0].uri.path,
					vscode.workspace.getConfiguration().get('antdProDeveloper.modelPath')
				);
				// 解析model文件夹
				const model = parseModel(modelAbsolutePath);

				// 查找该type参数对应的modle函数位置
				const {
					path: namespaceModelPath,
					effectOrReducerName
				} = model[dvaModelNameSpace];

				// const {rowNumber, columnNumber, filePath} = findDispatchFunctionPosition(destPath, dvaModelNameSpace, functionName);
				if (namespaceModelPath === undefined) {
					vscode.window.showInformationMessage('没有定义该model或者该函数');
					return;
				}

				const {
					line,
					column
				} = effectOrReducerName[functionName];

				return new vscode.Location(
					vscode.Uri.file(namespaceModelPath),
					new vscode.Position(line - 1, column)
				);
			}
		}
	});



	// 输入斜杠提示effect或reducer函数
	let completionModelFunctionDisposable = vscode.languages.registerCompletionItemProvider('javascriptreact', {
		resolveCompletionItem(item, token) {
			return item;
		},
		provideCompletionItems(document, position, token) {
			try{
				const allDispatchModelStrPosition = getDispatchTypeWordRangeAtPosition(document.getText());
				const typeValueInfo = allDispatchModelStrPosition.find(
					item => item.loc.contains(position.translate(1, 1))
				);

				// 如果斜杠在type参数的位置
				if (typeValueInfo) {
					const {value} = typeValueInfo;
					const [namespace] = value.split('/');

					// 获取model绝对路径
					const modelAbsolutePath = path.join(
						vscode.workspace.workspaceFolders[0].uri.path,
						vscode.workspace.getConfiguration().get('antdProDeveloper.modelPath')
					);
					// 解析model文件夹
					const model = parseModel(modelAbsolutePath);

					const models = Object.keys(model[namespace].effectOrReducerName);

					return models.map((item, index) => {
						const currCompletionItem = new vscode.CompletionItem(item, vscode.CompletionItemKind.Function);
						currCompletionItem.documentation = '注释信息' + index;
						return currCompletionItem;
					});
				}
			} catch(e) {

			}
		}
	}, '/');

	// 输入引号提示命名空间
	let completionNamespaceDisposable = vscode.languages.registerCompletionItemProvider('javascriptreact', {
		resolveCompletionItem(item, token) {
			return item;
		},
		provideCompletionItems(document, position, token, context) {
			try{
				const allDispatchModelStrPosition = getDispatchTypeWordRangeAtPosition(document.getText());
				const typeValueInfo = allDispatchModelStrPosition.find(
					item => item.loc.contains(position.translate(1, 1))
				);

				// 如果单引号在type参数的位置
				if (typeValueInfo) {
					// 获取model绝对路径
					const modelAbsolutePath = path.join(
						vscode.workspace.workspaceFolders[0].uri.path,
						vscode.workspace.getConfiguration().get('antdProDeveloper.modelPath')
					);
					// 解析model文件夹
					const model = parseModel(modelAbsolutePath);

					const models = Object.keys(model);

					return models.map((item, index) => {
						const currCompletionItem = new vscode.CompletionItem(item, vscode.CompletionItemKind.Module);
						currCompletionItem.documentation = '注释信息' + index;
						return currCompletionItem;
					});
				}
			} catch(e) {

			}
		}
	}, '\'');

	context.subscriptions.push(
		completionNamespaceDisposable,
		completionModelFunctionDisposable,
		dispatchDefineDisposable
	);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
