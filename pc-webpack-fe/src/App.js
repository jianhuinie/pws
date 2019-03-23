import {withRouter} from 'react-router-dom';
import {hot} from 'react-hot-loader';
import '~/css/App';
import Routes from './Routes';

export default hot(module)(withRouter(Routes));
