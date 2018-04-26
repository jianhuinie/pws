/**
 * 系列课
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';

export default function Series(props) {
    return (
        <div className="child-page">
            {props.children}
        </div>
    );
}