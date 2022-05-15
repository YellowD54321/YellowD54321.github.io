import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { WorkingTimer, RestingTimer } from "../TimeCounter";

// const tick = () => new Promise((res) => setImmediate(res));
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
      <WorkingTimer startTime={startTime} countState={defaultCountState} />
    );
    const workingTimer = screen.getByTestId("timer-clock");
    expect(workingTimer).toBeInTheDocument();
  });

  test("Time shows correct.", () => {
    render(
      <WorkingTimer startTime={startTime} countState={defaultCountState} />
    );
    const workingTimer = screen.getByTestId("timer-clock");
    expect(workingTimer.textContent).toBe("20:00");
  });

  test("Time shows correct after time of list changed.", () => {
    const { rerender } = render(
      <WorkingTimer startTime={startTime} countState={defaultCountState} />
    );
    startTime = 30;
    rerender(
      <WorkingTimer startTime={startTime} countState={defaultCountState} />
    );
    const workingTimer = screen.getByTestId("timer-clock");
    expect(workingTimer.textContent).toBe("30:00");
  });

  test("Timer runs for 1 second.", async () => {
    defaultCountState = "START";
    render(
      <WorkingTimer startTime={startTime} countState={defaultCountState} />
    );
    await waitMilliSeconds(1500);
    const workingTimer = screen.getByTestId("timer-clock");
    console.log(workingTimer.textContent);
    expect(workingTimer.textContent).toBe("19:59");
  });
});

// async function waitMilliSeconds(ms) {
//   return jest.advanceTimersByTime(ms);
// }
async function waitMilliSeconds(ms) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}
