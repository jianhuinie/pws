import React from 'react';
import { Modal } from 'antd';
require('css-loader!./index.styl');

export default function SelectModal(props) {
    return (  
        <Modal 
            footer={null}
            visible={props.isShow}
            onCancel={props.onModalClose}
            className={`select-modal ${props.className}`}
            title={props.title}
            closable={props.closable !== undefined ? props.closable : true }
            maskClosable={props.maskClosable !== undefined ? props.maskClosable : true}
        >
            {props.children}
        </Modal>
    );
}