import React from 'react';

export default class EditShootForm extends React.Component {
  constructor() {
    super();
    this.sendChangedDetail = this.sendChangedDetail.bind(this);
  }

  sendChangedDetail(detail) {
    return (event) => {
      this.props.onDetailChanged({[detail]: event.target.value});
    }
  }

  formattedDate() {
    let date = new Date(this.props.date);
    var day = ("0" + date.getDate()).slice(-2);
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear()+"-"+(month)+"-"+(day) ;
  }

  handleDateChanged(event) {
    let date = event.target.valueAsDate;
    let dateStr = date.toISOString();
    this.props.onDetailChanged(date: dateStr);
  }

  render() {
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

