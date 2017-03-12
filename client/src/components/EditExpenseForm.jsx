
import React from 'react';

export default class EditExpenseForm extends React.Component {

  constructor() {
    super();
  }

  sendChangedDetail(detail) {
  }

  render() {
    return (
      <div>
        <section>
          <label>
            Description:
            <input type="text"
                   value={this.props.description}
                   onChange={this.sendChangedDetail("description")}>
            </input>
          </label>
        </section>
      </div>
    );
  }
}
