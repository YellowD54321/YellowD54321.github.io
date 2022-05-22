import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { WorkingTimer, RestingTimer } from "../TimeCounter";

const getFinalWorkingTimeMock = jest.fn(
  (timeString) => "Final working time is " + timeString
);

const getFinalRestingTimeMock = jest.fn(
  (timeString) => "Final resting time is " + timeString
);
// async function waitMilliSeconds(ms) {
//   return jest.advanceTimersByTime(ms);
// }
// async function waitMilliSeconds(ms) {
//   return new Promise((resolve) => {
//     setTimeout(() => resolve(), ms);
//   });
// }

jest.useFakeTimers();
jest.spyOn(global, "setInterval");

describe("Working Timer", () => {
  let startTime = 20;
  let defaultCountState = "STOP";
  beforeEach(() => {
    startTime = 20;
    defaultCountState = "STOP";
    // jest.useFakeTimers();
  });
  test("Is exist.", () => {
    render(
      <WorkingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalWorkingTime={getFinalWorkingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    const workingTimer = screen.getByTestId("timer-clock");
    expect(workingTimer).toBeInTheDocument();
  });

  test("Time shows correct.", () => {
    render(
      <WorkingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalWorkingTime={getFinalWorkingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    const workingTimer = screen.getByTestId("timer-clock");
    expect(workingTimer.textContent).toBe("20:00");
  });

  test("Time shows correct after time of list changed.", () => {
    const { rerender } = render(
      <WorkingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalWorkingTime={getFinalWorkingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    startTime = 30;
    rerender(
      <WorkingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalWorkingTime={getFinalWorkingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    const workingTimer = screen.getByTestId("timer-clock");
    expect(workingTimer.textContent).toBe("30:00");
  });

  test("setInterval is called.", () => {
    defaultCountState = "START";
    render(
      <WorkingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalWorkingTime={getFinalWorkingTimeMock}
        isCounting={true}
        canResetStartTime={false}
      />
    );
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});

describe("Resting Timer", () => {
  let startTime = 5;
  let defaultCountState = "STOP";
  beforeEach(() => {
    startTime = 5;
    defaultCountState = "STOP";
    // jest.useFakeTimers();
  });
  test("Is exist.", () => {
    render(
      <RestingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalRestingTime={getFinalRestingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    const restingTimer = screen.getByTestId("timer-clock");
    expect(restingTimer).toBeInTheDocument();
  });

  test("Time shows correct.", () => {
    render(
      <RestingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalRestingTime={getFinalRestingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    const restingTimer = screen.getByTestId("timer-clock");
    expect(restingTimer.textContent).toBe("05:00");
  });

  test("Time shows correct after time of list changed.", () => {
    const { rerender } = render(
      <RestingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalRestingTime={getFinalRestingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    startTime = 10;
    rerender(
      <RestingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalRestingTime={getFinalRestingTimeMock}
        isCounting={false}
        canResetStartTime={true}
      />
    );
    const restingTimer = screen.getByTestId("timer-clock");
    expect(restingTimer.textContent).toBe("10:00");
  });

  test("setInterval is called.", () => {
    defaultCountState = "START";
    render(
      <RestingTimer
        startTime={startTime}
        countState={defaultCountState}
        getFinalRestingTime={getFinalRestingTimeMock}
        isCounting={true}
        canResetStartTime={false}
      />
    );
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });
});
