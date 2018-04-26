import React from 'react';
import ajax from 'common/util/ajaxService';
import ajaxConfig from 'common/ajaxConfig';
import stringService from 'common/util/stringService';
import PageController from 'common/controller/PageController';
import { hashHistory } from 'react-router';
import UploadPerson from './UploadPerson/index';
import UploadLicense from './UploadLicense/index';
import Privilege from './Privilege/index';
// import Util from 'common/util/util';
require('css-loader!./index.styl'); 

const authenTypeEnum = {
    PERSON: 1,
    ORG: 2
};
export default class Apply extends PageController {

    constructor(props) {
        super(props);
        this.state = {
            authenType: authenTypeEnum.PERSON, // 认证类型
            teacherName: '', // 运营者姓名
            teacherID: '', // 运营者身份证号
            teacherStorageId: '', // 老师身份证存储id
            teacherUrl: '', // 老师身份证地址
            teacherWechatAccount: '', // 运营者微信号
            orgName: '', // 机构名称
            orgTax: '',  // 机构税号
            orgStorageId: '', // 机构认证图片存储id
            orgUrl: '', // 机构认证图片地址
            brandName: '', // 品牌名称
            mpAccount: '', // 公众号
            submiting: false
        };
    }

    componentDidMount() {
        document.title = '微师认证';
        // Util.sharePage();
    }

    /**
     * 认证类型变化
     * @param {number} type 
     */
    handleTypeClick = (type) => {
        this.setState({
            authenType: type
        });
    }

    /**
     * 处理输入变化
     * @param {string} key 
     * @param {string} value 
     * @param {number} maxLength 
     */
    handleInputChange = (key, value, maxLength = 50) => {
        if (stringService.getCharacterLength(value) <= maxLength * 2) {
            this.setState({
                [key]: value
            });
        }
    }

    /**
     * 个人身份证变化
     * @param {object} file 
     */
    handlePersonUploaded = (file) => {
        this.setState({
            teacherStorageId: file.storageId,
            teacherUrl: file.url
        });
    }

    /**
     * 个人身份证变化
     * @param {object} file 
     */
    handleOrgUploaded = (file) => {
        this.setState({
            orgStorageId: file.storageId,
            orgUrl: file.url
        });
    }

    /**
     * 提交申请
     */
    submit = () => {
        this.setState({
            submiting: true
        });
        ajax.post(ajaxConfig.CLASSROOM.AUTHEN, this.state).then((res) => {
            if (res.data && res.data.status) {
                hashHistory.replace('/verifying?id=' + res.data.classId);
            }
        }, () => {
            this.setState({
                submiting: false
            });
        });
    }

    render() {
        const state = this.state;
        const teacherEnabled = state.teacherName &&
                               state.teacherID &&
                               state.teacherWechatAccount &&
                               state.teacherStorageId;
        const btnEnabled = state.authenType === authenTypeEnum.PERSON
                                ?   
                                    teacherEnabled
                                : 
                                    teacherEnabled &&
                                    state.orgName &&
                                    state.orgTax &&
                                    state.orgStorageId &&
                                    state.brandName;
        return (
            <div className="apply-authen">
                <div className="apply-authen-title">选择认证类型</div>
                <div className="apply-authen-type">
                    <div 
                        className="type-item" 
                        onClick={() => {
                            this.handleTypeClick(authenTypeEnum.PERSON);
                        }}
                    >
                        <div className={`type ${authenTypeEnum.PERSON === state.authenType ? 'active' : ''}`}>
                            <span className="icon-authen-person"></span>
                        </div>
                        <div className="name">个人认证</div>
                    </div>
                    <div 
                        className="type-item" 
                        onClick={() => {
                            this.handleTypeClick(authenTypeEnum.ORG);
                        }}
                    >
                        <div className={`type ${authenTypeEnum.ORG === state.authenType ? 'active' : ''}`}>
                            <span className="icon-authen-org"></span>
                        </div>
                        <div className="name">机构认证</div>
                    </div>
                </div>
                <div className="apply-authen-title">填写基本信息</div>
                <div className="apply-authen-item">
                    <div className="name">运营者姓名</div>
                    <input 
                        className="content" 
                        placeholder="请输入姓名" 
                        value={state.teacherName}
                        onChange={(e) => {
                            this.handleInputChange('teacherName', e.target.value, 20);
                        }}
                    />
                </div>
                <div className="apply-authen-item">
                    <div className="name">运营者身份证</div>
                    <input 
                        className="content" 
                        placeholder="请输入身份证或护照ID" 
                        value={state.teacherID}
                        onChange={(e) => {
                            this.handleInputChange('teacherID', e.target.value, 20);
                        }}
                    />
                </div>
                <div className="apply-authen-item">
                    <div className="name">运营者微信号</div>
                    <input 
                        className="content" 
                        placeholder="请输入微信号" 
                        value={state.teacherWechatAccount}
                        onChange={(e) => {
                            this.handleInputChange('teacherWechatAccount', e.target.value, 30);
                        }}
                    />
                </div>
                <UploadPerson 
                    storageId={state.teacherStorageId} 
                    url={state.teacherUrl}
                    onUploaded={this.handlePersonUploaded} 
                />
                {
                    authenTypeEnum.ORG === state.authenType
                    ?
                    <div>
                        <div className="apply-authen-title">填写机构信息</div>
                        <div className="apply-authen-item">
                            <div className="name">企业名称</div>
                            <input 
                                className="content" 
                                placeholder="请输入企业全称" 
                                value={this.state.orgName}
                                onChange={(e) => {
                                    this.handleInputChange('orgName', e.target.value);
                                }}
                            />
                        </div>
                        <div className="apply-authen-item">
                            <div className="name">企业税号</div>
                            <input 
                                className="content" 
                                placeholder="请输入用于开发票的企业税号" 
                                value={this.state.orgTax}
                                onChange={(e) => {
                                    this.handleInputChange('orgTax', e.target.value, 50);
                                }}
                            />
                        </div>
                        <div className="apply-authen-item">
                            <div className="name">品牌名称</div>
                            <input 
                                className="content" placeholder="请输入企业旗下品牌名称" 
                                value={this.state.brandName}
                                onChange={(e) => {
                                    this.handleInputChange('brandName', e.target.value, 30);
                                }}
                            />
                        </div>
                        <div className="apply-authen-item">
                            <div className="name">公众号(选填)</div>
                            <input 
                                className="content" placeholder="请输入公众号名称" 
                                value={this.state.mpAccount}
                                onChange={(e) => {
                                    this.handleInputChange('mpAccount', e.target.value, 30);
                                }}
                            />
                        </div>
                        <UploadLicense 
                            storageId={state.orgStorageId} 
                            url={state.orgUrl}
                            onUploaded={this.handleOrgUploaded} 
                        />
                    </div>
                    :
                    null
                }
                <div className="apply-authen-submit">
                    <button 
                        disabled={!btnEnabled || state.submiting}
                        className="ws-btn-red" onClick={this.submit}
                    >
                        {this.state.submiting ? '提交中' : '提交申请'}
                    </button>
                </div>
                <Privilege isOrg={authenTypeEnum.ORG === state.authenType} />
            </div>
        );
    }
};
