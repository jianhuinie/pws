/**
 * 富文本编辑器 预览弹窗
 * @author niejianhui
 */
import React from 'react';
import { Modal } from 'antd';
import PageController from 'common/controller/PageController';

require('css-loader!./index.styl');

class PreviewDialog extends PageController {
    

    render() {
        const self = this;
        const colorClassMap = {
            '#000000': 'black',
            '#999999': 'grey',
            '#FC5C5A': 'pink',
            '#FF6C00': 'yellow',
            '#0F86E8': 'blue',
            '#43B244': 'green',
            '#3D618A': 'brown',
            '#9900CC': 'purple'
        };
        return (
            <div>
                 <Modal
                    visible={self.props.showDialog}
                    closable={false}
                    footer={null}
                    width={780}
                    wrapClassName="preview-dialog"
                >
                    <div className="exit-btn" onClick={self.props.onExit}>退出预览</div>
                    <div className="preview-content">
                        {self.props.editorList.map((item) => {
                            let curItem;
                            switch (item.type) {
                                case 'title':
                                    curItem = (
                                        <div className="preview-title" key={item.uniqueId}>{item.options.text}</div>
                                    );
                                    break;
                                case 'body':
                                    curItem = (
                                        <div 
                                            key={item.uniqueId}
                                            className={'preview-body ' + (colorClassMap[item.options.color]) + (item.options.fontWeight === 'bold' ? ' font-bold' : '') 
                                            + (item.options.fontSize === '17px' ? ' font-big' : '') + (item.options.textAlign === 'center' ? ' align-center' : '')}
                                        >
                                            {item.options.text}
                                        </div>
                                    );
                                    break;
                                case 'photo':
                                    curItem = (
                                        <div className="preview-photo" key={item.uniqueId}>
                                            <img src={item.options.url} />
                                        </div>
                                    );
                                    break;
                                case 'video':
                                    curItem = (
                                        <div className="preview-video" key={item.uniqueId}>
                                            <span className="video-icon"></span>
                                            <img src={item.options.coverUrl} />
                                        </div>
                                    );
                                    break;
                                case 'audio':
                                    curItem = (
                                        <div className="preview-audio" key={item.uniqueId}>
                                            <span className="voice-icon"></span>
                                            <img src="https://imgs.genshuixue.com/0cms/d/file/content/2016/08/57b693e1e3815.png" />
                                        </div>
                                    );
                                    break;
                                default:
                                    break;
                            }
                            return curItem;
                        })}
                    </div>
                </Modal>
            </div>
        );
    }
};

export default PreviewDialog;