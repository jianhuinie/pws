import {NavLink} from 'react-router-dom';

export default function Nav() {
    return (
        <div>
            <NavLink to="/" activeClassName="active" exact>
                首页
            </NavLink>
            <NavLink to="/my" activeClassName="active" exact>
                我的
            </NavLink>
            <NavLink to="/reading" activeClassName="active" exact>
                阅读
            </NavLink>
        </div>
    );
}
