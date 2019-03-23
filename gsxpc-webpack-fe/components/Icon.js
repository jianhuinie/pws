/**
 * @file Icon 组件
 * @author dafo<huanghoujin@baijiahulian.com>
 */
import PropTypes from 'prop-types';

export default function Icon({type, onClick, tabIndex}) {
    return (
        <i
            role="button"
            tabIndex={tabIndex}
            className={`icon icon-${type}`}
            onClick={onClick}
            onKeyPress={onClick}
        />
    );
}

Icon.propTypes = {
    tabIndex: PropTypes.number,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

Icon.defaultProps = {
    tabIndex: 1
};
