import classNames from 'classnames';

import '~/css/App';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const BasicLayout = ({children, name, location}) => (
    <div class={classNames(name)}>
        <Header />
        <Nav />
        <main>
            {location}
            {children}
        </main>
        <Footer />
    </div>
);

export default BasicLayout;
