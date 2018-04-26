import { connect } from 'react-redux';
import Counter from './component/Counter/index';
import actions from './actions';

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        value: state.count.count
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => {
        dispatch(actions.countAction.increaseAction);
    }
  };
}

// Connected Component
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

export default App;