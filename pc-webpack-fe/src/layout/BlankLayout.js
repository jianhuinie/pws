import classNames from 'classnames';

const BlankLayout = ({children, name}) => (
    <div class={classNames(name)}>
        {children}
    </div>
);

export default BlankLayout;
