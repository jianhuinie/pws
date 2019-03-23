import React from 'react';
import './index.styl';

export default function Footer() {
    return (
        <div className="website-footer">
            <div className="wrapper">
                <div className="favor-links">
                    <div>
                        <div className="tel">
                            <i className="icon icon-phone2"></i>
                            <h4>4000-910-910</h4>
                            <span>周一至周日&nbsp;9:00-21:00</span>
                        </div>

                        <div className="list">
                            <h4>联系我们</h4>
                            <ul>
                                <li>
                                    {/* <a rel="nofollow" href="javascript:void(0)" className="show-wechat">官方微信</a> */}
                                    <span rel="nofollow" className="show-wechat">官方微信</span>
                                    <div className="wechat">
                                        <img className="wechatImage" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/07/5b514a7f6b5f8.jpg" alt="" />
                                    </div>
                                </li>
                                <li className="weibo">
                                    <a rel="nofollow noopener noreferrer" href="https://weibo.com/genshuixue" target="_blank">新浪微博</a>
                                </li>
                                <li>
                                    <a rel="nofollow" href="/guide/join?detail=school" target="_blank">诚聘英才</a>
                                </li>
                                <li>
                                    <a rel="nofollow" href="/guide/join?detail=suggestion" target="_blank">意见反馈</a>
                                </li>
                            </ul>
                        </div>
                        <div className="list">
                            <h4>新手指南</h4>
                            <ul>
                                <li>
                                    <a rel="nofollow" href="/guide/student?detail=pcEnroll" target="_blank">如何报名</a>
                                </li>
                                <li>
                                    <a rel="nofollow" href="/guide/student?detail=pcUse" target="_blank">如何使用</a>
                                </li>
                                <li>
                                    <a rel="nofollow" href="/static/app" target="_blank">软件下载</a>
                                </li>
                                <li>
                                    <a rel="nofollow" href="/guide/student?detail=changePwd" target="_blank">常见问题</a>
                                </li>
                            </ul>
                        </div>
                        <div className="list">
                            <a href="https://www.genshuixue.com/">
                                <img className="logo" src="https://imgs.genshuixue.com/0cms/d/file/content/2018/05/5afa45285ec17.png" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="friend-links">
                    <ul>
                        <li>
                            <a rel="nofollow" href="/guide/about?detail=aboutUs" target="_blank">关于我们</a>
                        </li>
                        <li>
                            <a rel="nofollow" href="/guide/about?detail=clause" target="_blank">服务协议</a>
                        </li>
                        <li>
                            <a href="/guide/about?detail=conceal" target="_blank">隐私政策</a>
                        </li>
                        <li>
                            <a href="/guide/about?detail=business" target="_blank">商务合作</a>
                        </li>
                        <li>
                            <a href="/guide/about?detail=news" target="_blank">新闻报道</a>
                        </li>
                        <li>
                            <a href="/guide/about?detail=tort" target="_blank">侵权投诉</a>
                        </li>
                    </ul>
                </div>
                <div className="copyright">
                    <p>
                        Copyright © 2014 -
                        {new Date().getFullYear()}
                        跟谁学
                        <a rel="noopener noreferrer" href="https://www.genshuixue.com/" target="_blank">www.genshuixue.com</a>
                        跟谁学版权所有.
                    </p>
                    <p>
                        电话：4000-910-910&nbsp;&nbsp;
                        地址：北京市海淀区西北旺东路10号院东区7号楼博彦科技西楼&nbsp;&nbsp;
                        京公网安备11010802015210号 | 京ICP证14027590号-1
                    </p>
                </div>
            </div>
        </div>
    );
}
