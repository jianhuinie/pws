import React from 'react';
import ImagePlayer from 'gsx-design/component/ImagePlayer/index';

export default class ReactDemo extends React.Component {
    constructor(props) {
        super(props);
        this.imagePlayer = new ImagePlayer([
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514892569833&di=59a60e9990c8a373bca596fd734e73ef&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fa9d3fd1f4134970a8563d30d9fcad1c8a7865d84.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514892569833&di=7a30e3e169731b933f929f9184641d5b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Feac4b74543a9822673e327b98082b9014a90eb0a.jpg'
        ]);
        this.imagePlayer.show();
    };
    componentDidMount() {
        window.setTimeout(() => {
            this.imagePlayer.hide();
        }, 2000);
    }
    componentWillUnmount() {
        this.imagePlayer.destroy();
    }
    render() {
        return <div>gsx-design-m的alert测试</div>;
    }
};