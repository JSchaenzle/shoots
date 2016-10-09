import { connect } from 'react-redux';
import NewExpense from '../components/NewExpense.jsx';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const ExpenseCreator = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewExpense);
