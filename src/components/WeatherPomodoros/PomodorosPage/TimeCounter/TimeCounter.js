import "./timeCounter.css";
import React, { useState, useEffect } from "react";

class Timer extends React.Component {
  constructor({ startTime } = { startTime: 1 }) {
    super();
    this.startTime = startTime;
    this.countingTime = startTime;
  }

  getStartTime() {
    return this.startTime;
  }

  setStartTime(seconds) {
    this.startTime = seconds;
  }

  getCountingTime() {
    return this.countingTime;
  }

  setCountingTime(seconds) {
    this.countingTime = seconds;
  }

  getCountingDuration() {
    return this.getStartTime() - this.getCountingTime();
  }

  isNegative() {
    return this.countingTime <= 0;
  }

  calculateMinutes(seconds) {
    return Math.floor(Math.abs(seconds) / 60);
  }

  calculateSeconds(seconds) {
    return Math.abs(seconds) % 60;
  }

  timeFormat(time) {
    return ("0" + time).toString().slice(-2);
  }

  renderTime(seconds) {
    const countingTime = seconds;
    const minute = this.calculateMinutes(countingTime);
    const second = this.calculateSeconds(countingTime);
    const formatMinute = this.timeFormat(minute);
    const formatSecond = this.timeFormat(second);
    return (countingTime < 0 ? "-" : "") + formatMinute + ":" + formatSecond;
  }

  render() {
    return (
      <h2 className="timer-clock" data-testid="timer-clock">
        {this.renderTime(this.getCountingTime())}
      </h2>
    );
  }
}

export function WorkingTimer({
  startTime,
  countState,
  getFinalWorkingTime,
  isCounting,
  canResetStartTime,
}) {
  const timer = new Timer({ startTime: startTime * 60 });
  const [count, setCount] = useState(timer.getStartTime());
  // const canResetStartTime = countState === "STOP";
  useEffect(() => {
    let timeCounter = null;
    if (isCounting) {
      timeCounter = setInterval(() => {
        setCount((preCount) => preCount - 1);
      }, 1000);
      return () => {
        if (timeCounter) clearInterval(timeCounter);
      };
    } else if (canResetStartTime) {
      setCount(timer.getStartTime());
    }
  }, [startTime, countState]);

  timer.setCountingTime(count);

  useEffect(() => {
    getFinalWorkingTime(timer.renderTime(timer.getCountingDuration()));
  }, [countState]);

  return (
    <div
      className={`working-timer-clock ${
        timer.isNegative() && "timer-clock-negative"
      }`}
    >
      {timer.render()}
    </div>
  );
}

export function RestingTimer({
  startTime,
  countState,
  getFinalRestingTime,
  isCounting,
  canResetStartTime,
}) {
  const timer = new Timer({ startTime: startTime * 60 });
  const [count, setCount] = useState(timer.getStartTime());
  // const resetTimer = countState === "STOP";
  useEffect(() => {
    let timeCounter = null;
    if (isCounting) {
      timeCounter = setInterval(() => {
        setCount((preCount) => preCount - 1);
      }, 1000);
      return () => {
        if (timeCounter) clearInterval(timeCounter);
      };
    } else if (canResetStartTime) {
      setCount(timer.getStartTime());
    }
  }, [startTime, countState]);

  timer.setCountingTime(count);

  useEffect(() => {
    getFinalRestingTime(timer.renderTime(timer.getCountingDuration()));
  }, [countState]);

  return (
    <div
      className={`working-timer-clock ${
        timer.isNegative() && "timer-clock-negative"
      }`}
    >
      {timer.render()}
    </div>
  );
}
