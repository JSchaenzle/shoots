import React from 'react';

export default class EditShootForm extends React.Component {

  constructor() {
    super();
    this.sendChangedDetail = this.sendChangedDetail.bind(this);
    this.formattedDate = this.formattedDate.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.handlePriceChanged = this.handlePriceChanged.bind(this);
    this.handleCompletedChanged = this.handleCompletedChanged.bind(this);
  }

  sendChangedDetail(detail) {
    return (event) => {
      this.props.onDetailChanged({[detail]: event.target.value});
    }
  }

  formattedDate() {
    console.log("Formatting date to render");
    let date = new Date(this.props.date);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    let result = date.getFullYear()+"-"+(month)+"-"+(day);
    console.log("Formatted: ", result);
    return result;
  }

  handleDateChanged(event) {
    let date = event.target.valueAsDate;
    console.log("Date", date);
    let dateStr = date.toISOString();
    console.log("DateStr", dateStr);
    this.props.onDetailChanged({date: dateStr});
  }

  handlePriceChanged(event) {
    let price = Number(event.target.value);
    this.props.onDetailChanged({price: price});
  }

  handleCompletedChanged(event) {
    const completed = event.target.checked;
    this.props.onDetailChanged({completed: completed});
  }

  render() {
    return (
      <div>
        <section>
          <label>
            Client Name:
            <input type="text" value={this.props.name} onChange={this.sendChangedDetail("name")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Shoot Date:
            <input type="date" value={this.formattedDate()} onChange={this.handleDateChanged} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label htmlFor="priceField">Price:</label>
          <input type="number" id="priceField" value={this.props.price} onChange={this.handlePriceChanged} disabled={this.props.completed}></input>
        </section>

        <section>
          <label>
            Miles Travelled:
            <input type="number" value={this.props.miles} onChange={this.sendChangedDetail("miles")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Time Shooting:
            <input type="number" value={this.props.shootTimeMinutes} onChange={this.sendChangedDetail("shootTimeMinutes")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Time Editing:
            <input type="number" value={this.props.editingTimeMinutes} onChange={this.sendChangedDetail("editingTimeMinutes")} disabled={this.props.completed}></input>
          </label>
        </section>

        <section>
          <label>
            Completed:
            <input type="checkbox" checked={this.props.completed} onChange={this.handleCompletedChanged}></input>
          </label>
        </section>

      </div>
    )
  }
}

EditShootForm.propTypes = {
  onDetailChanged: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  date: React.PropTypes.string.isRequired,
  price: React.PropTypes.number.isRequired,
  completed: React.PropTypes.bool.isRequired
}

EditShootForm.defaultProps = {
  name: "",
}

