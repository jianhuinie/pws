/**
 * 单次课
 * 
 * @author zhaoxiudan@baijiahulian.com
 */

import React from 'react';

export default function Single(props) {
    return (
        <div className="child-page">
            {props.children}
        </div>
    );
}