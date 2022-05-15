import { render, screen, cleanup } from "@testing-library/react";
import { StartButton, StopButton } from "../Button";

describe("Start Button", () => {
  test("start button is created.", () => {
    render(<StartButton />);
    const startButtonElement = screen.getByRole("button");
    expect(startButtonElement).toBeInTheDocument();
  });

  test("start button text is not empty.", () => {
    render(<StartButton />);
    const startButtonElement = screen.getByRole("button");
    expect(startButtonElement.textContent).not.toBe("");
  });
});

describe("Stop Button", () => {
  test("stop button is created.", () => {
    render(<StopButton />);
    const stopButtonElement = screen.getByRole("button");
    expect(stopButtonElement).toBeInTheDocument();
  });
});

// test("stop button text is not empty.", () => {
//   render(<StopButton />);
//   const stopButtonElement = screen.getByRole("button");
//   expect(stopButtonElement.textContent).not.toBe("");
// });
