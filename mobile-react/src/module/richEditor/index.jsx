import React from 'react';
import PageController from 'common/controller/PageController';
import RichEditor from 'common/components/RichEditor/index';
require('css-loader!./index.styl');
class RichEditorIndex extends PageController {
    constructor() {
        super();
        this.state = {
            editorList: [
                {
                    type: 'title',
                    options: {
                        text: 'hello kitty'
                    }
                },
                {
                    type: 'body',
                    options: {
                        text: 'hello tom',
                        fontWeight: 'normal',
                        fontSize: '15px',
                        textAlign: 'left',
                        color: '#000000'
                    }
                },
                {
                    type: 'photo',
                        options: {
                            storageId: '121212',
                            url: 'https://imgs.genshuixue.com/2018/4/6806e65c3b.png',
                            referUrl: 'asasa'
                        }
                },
                {
                    type: 'video',
                        options: {
                            storageId: 'qqqwq',
                            coverUrl: 'https://imgs.genshuixue.com/2018/4/6806e65c3b.png'
                        }
                },
                {
                    type: 'audio',
                        options: {
                            storageId: 'qqqwq',
                            url: 'https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b693e1e3815.png'
                        }
                }
            ]
        };
    }
    onContentChange = (editorList) => {
        console.log(editorList);
    }

    render() {
        const self = this;
        return (
            <div className="rich-editor-container">
                <RichEditor 
                    editorList={self.state.editorList} 
                    onContentChange={self.onContentChange} 
                />
            </div>
        );
    }
}

export default RichEditorIndex;