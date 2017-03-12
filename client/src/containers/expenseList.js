import { connect } from 'react-redux';
import { Expenses } from '../components/Expenses.jsx';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export const ExpenseList = connect(
  mapStateToProps,
  mapDispatchToProps
)(Expenses);
