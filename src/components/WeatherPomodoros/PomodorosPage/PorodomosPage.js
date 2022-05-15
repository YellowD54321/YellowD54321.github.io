import "./porodomosPage.css";
import React, { useState, useRef } from "react";
import {
  WorkingTimeDropdownList,
  RestingTimeDropdownList,
} from "./TimeDropdownList/TimeDropdownList";
import { StartButton, StopButton } from "./Button/Button";
import { WorkingTimer, RestingTimer } from "./TimeCounter/TimeCounter";
import WorkingContent from "./WorkingContent/WorkingContent";

function PorodomosPage() {
  const COUNT_STATE = {
    STOP: "STOP",
    WORK: "WORK",
    REST: "REST",
  };
  const defaultWorkingTime = 25;
  const defaultRestingTime = 5;
  const [workingTime, setWorkingTime] = useState({
    time: defaultWorkingTime,
  });
  const [restingTime, setRestingTime] = useState({
    time: defaultRestingTime,
  });
  const [countState, setCountState] = useState(COUNT_STATE.STOP);
  const [workingContentText, setWorkingContentText] = useState("");
  const [finalWorkingtime, setFinalWorkingtime] = useState(0);
  const [finalRestingtime, setFinalRestingtime] = useState(0);
  let hasFinished = useRef(false);

  function getWorkingTimeValue(timeValue) {
    setWorkingTime((preState) => {
      return {
        ...preState,
        time: timeValue,
      };
    });
  }
  function getRestingTimeValue(timeValue) {
    setRestingTime((preState) => {
      return {
        ...preState,
        time: timeValue,
      };
    });
  }

  function handleStartButtonClick() {
    setCountState(getNextState());
    if (isNextStateStop()) {
      hasFinished.current = true;
    }
  }

  function getNextState() {
    switch (countState) {
      case COUNT_STATE.STOP:
        return COUNT_STATE.WORK;
      case COUNT_STATE.WORK:
        return COUNT_STATE.REST;
      case COUNT_STATE.REST:
        return COUNT_STATE.STOP;
      default:
        return COUNT_STATE.STOP;
    }
  }

  function isStateWork() {
    return countState === COUNT_STATE.WORK;
  }

  function isStateRest() {
    return countState === COUNT_STATE.REST;
  }

  function isStateStop() {
    return countState === COUNT_STATE.STOP;
  }

  function isNextStateStop() {
    return getNextState() === COUNT_STATE.STOP;
  }

  function getWorkingContentValue(value) {
    if (isStateWork()) {
      setWorkingContentText(value);
    }
  }

  function getFinalWorkingTime(value) {
    if (isStateStop()) {
      setFinalWorkingtime(value);
    }
  }

  function getFinalRestingTime(value) {
    if (isStateStop()) {
      setFinalRestingtime(value);
    }
  }

  function recordList() {
    const isRecording = isStateStop();
    if (!isRecording || !hasFinished.current) {
      return null;
    }
    return (
      <div>
        <h3>Working Content</h3>
        <p>{workingContentText}</p>
        <h3>Working Duration</h3>
        <p>{finalWorkingtime}</p>
        <h3>Resting Duration</h3>
        <p>{finalRestingtime}</p>
      </div>
    );
  }

  return (
    <div className="pomodoros-page-body">
      <div className="pomodoros-page-main">
        <h2 className="pomodoros-page-title">
          This project is still building.
        </h2>
        <div className="pomodoros-page-timers">
          <div className="pomodoros-page-working-region">
            <WorkingTimer
              startTime={workingTime.time}
              countState={countState}
              getFinalWorkingTime={getFinalWorkingTime}
              isCounting={isStateWork()}
              canResetStartTime={isStateStop()}
            />
            <WorkingTimeDropdownList
              defaultStartTime={defaultWorkingTime}
              getTimeValue={getWorkingTimeValue}
              isDisable={isStateWork() || isStateRest()}
            />
          </div>
          <div className="pomodoros-page-working-region">
            <RestingTimer
              startTime={restingTime.time}
              countState={countState}
              getFinalRestingTime={getFinalRestingTime}
              isCounting={isStateRest()}
              canResetStartTime={isStateStop()}
            />
            <RestingTimeDropdownList
              defaultStartTime={defaultRestingTime}
              getTimeValue={getRestingTimeValue}
              isDisable={isStateWork() || isStateRest()}
            />
          </div>
        </div>
        <WorkingContent
          getWorkingContentValue={getWorkingContentValue}
          isReadOnly={isStateWork() || isStateRest()}
          countState={countState}
        />
        <StartButton handleStartButtonClick={handleStartButtonClick}>
          {getNextState().toString()}
        </StartButton>
      </div>
      <div className="pomodoros-page-record-list">{recordList()}</div>
    </div>
  );
}
export default PorodomosPage;
