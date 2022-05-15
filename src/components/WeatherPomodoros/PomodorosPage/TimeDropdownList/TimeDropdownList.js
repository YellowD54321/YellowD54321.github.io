import React from "react";
import "./timeDropdownList.css";

class TimeDropdownSelecter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.defaultStartTime };
    if (this.props.onChange) {
      this.props.onChange(this.state);
    }
    this.handleChange = this.handleChange.bind(this);
    this.disable = false;
  }
  handleChange(e) {
    this.setState({ value: e.target.value }, () => {
      if (this.props.onChange) {
        this.props.onChange(this.state);
      }
    });
  }

  getValue() {
    return this.state.value;
  }
}

class WorkingTimeDropdownSelecter extends TimeDropdownSelecter {
  render() {
    return (
      <div className="time-dropdown-list-main">
        <label htmlFor="working-time">Working Time:</label>
        <select
          name="working-time"
          className="timeSetter-working-dropdown"
          id="timeSetter-working-dropdown"
          onChange={this.handleChange}
          value={this.state.value}
          data-testid="workingTimeDropdownSelecter"
        >
          <option value="5">5 min</option>
          <option value="10">10 min</option>
          <option value="15">15 min</option>
          <option value="20">20 min</option>
          <option value="25">25 min</option>
          <option value="30">30 min</option>
          <option value="35">35 min</option>
          <option value="40">40 min</option>
          <option value="45">45 min</option>
          <option value="50">50 min</option>
          <option value="55">55 min</option>
          <option value="60">60 min</option>
        </select>
      </div>
    );
  }
}

class RestingTimeDropdownSelecter extends TimeDropdownSelecter {
  render() {
    return (
      <div className="time-dropdown-list-main">
        <label htmlFor="resting-time">Resting Time:</label>
        <select
          name="resting-time"
          className="timeSetter-resting-dropdown"
          id="timeSetter-resting-dropdown"
          onChange={this.handleChange}
          value={this.state.value}
          data-testid="restingTimeDropdownSelecter"
        >
          <option value="5">5 min</option>
          <option value="10">10 min</option>
          <option value="15">15 min</option>
          <option value="20">20 min</option>
          <option value="25">25 min</option>
          <option value="30">30 min</option>
        </select>
      </div>
    );
  }
}

export function WorkingTimeDropdownList({
  defaultStartTime,
  getTimeValue,
  isDisable,
}) {
  const dropdownList = document.getElementById("timeSetter-working-dropdown");
  if (dropdownList) {
    dropdownList.disabled = isDisable;
  }

  function handleTimeChange(data) {
    getTimeValue(data.value);
  }

  return (
    <WorkingTimeDropdownSelecter
      onChange={handleTimeChange}
      defaultStartTime={defaultStartTime}
    />
  );
}

export function RestingTimeDropdownList({
  defaultStartTime,
  getTimeValue,
  isDisable,
}) {
  const dropdownList = document.getElementById("timeSetter-resting-dropdown");
  if (dropdownList) {
    dropdownList.disabled = isDisable;
  }

  function handleTimeChange(data) {
    getTimeValue(data.value);
  }

  return (
    <RestingTimeDropdownSelecter
      onChange={handleTimeChange}
      defaultStartTime={defaultStartTime}
    />
  );
}
