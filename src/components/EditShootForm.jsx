import React from 'react';

export default class EditShootForm extends React.Component {

  constructor() {
    super();
    this.sendChangedDetail = this.sendChangedDetail.bind(this);
    this.formattedDate = this.formattedDate.bind(this);
    this.handleDateChanged = this.handleDateChanged.bind(this);
    this.handlePriceChanged = this.handlePriceChanged.bind(this);
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

  render() {
    console.log("Rendering EditShootForm");
    return (
      <div>
        <section>
          <h4>Client Name:</h4>
          <input type="text" value={this.props.name} onChange={this.sendChangedDetail("name")}></input>
        </section>

        <section>
          <h4>Shoot Date:</h4>
          <input type="date" value={this.formattedDate()} onChange={this.handleDateChanged}></input>
        </section>

        <section>
          <h4>Charge:</h4>
          <span>$</span>
          <input type="number" value={this.props.price} onChange={this.handlePriceChanged}></input>
        </section>

      </div>
    )
  }
}

EditShootForm.propTypes = {
  onDetailChanged: React.PropTypes.func.isRequired,
  date: React.PropTypes.string.isRequired
}

EditShootForm.defaultProps = {
  name: "",
  date: ""
}

