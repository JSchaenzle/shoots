import React from 'react';
import EditExpenseForm from "./EditExpenseForm.jsx"

export default class NewExpense extends React.Component {

  constructor(props) {
    super(props);
    this.handleCreateExpense = this.handleCreateExpense.bind(this);
  }

  handleCreateExpense(event) {
    event.preventDefault();
    this.props.onAddPhotoshootClick(this.state.photoshootDetails);
  }

  render() {
    return (
      <div className="container">
        <form>
          <fieldset>
            <h4>Add a New Expense</h4>
            <EditExpenseForm />
            <section>
              <p>
                <input type="submit" className="button" value="Create" onClick={this.handleCreateExpense}></input>
              </p>
            </section>
          </fieldset>
        </form>
      </div>
    );
  }
}
