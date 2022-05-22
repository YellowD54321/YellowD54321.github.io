import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { StartButton } from "../Button";

const handleStartButtonClickMock = jest.fn();

describe("Start Button", () => {
  test("start button is created.", () => {
    render(
      <StartButton
        children={"WORK"}
        handleStartButtonClick={handleStartButtonClickMock}
      />
    );
    const startButtonElement = screen.getByRole("button");
    expect(startButtonElement).toBeInTheDocument();
  });

  test("start button text is not empty.", () => {
    render(<StartButton children={"WORK"} />);
    const startButtonElement = screen.getByRole("button");
    expect(startButtonElement.textContent).not.toBe("");
  });

  test("start button is been clicked.", () => {
    render(
      <StartButton
        children={"WORK"}
        handleStartButtonClick={handleStartButtonClickMock}
      />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(handleStartButtonClickMock.mock.calls.length).toEqual(1);
  });
});
