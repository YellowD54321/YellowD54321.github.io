import { render, screen, fireEvent } from "@testing-library/react";
import PomodorosPage from "../PomodorosPage/PomodorosPage";

describe("Pomodoros Main System", () => {
  test("Record list is not exist before resting.", () => {
    render(<PomodorosPage />);
    const recordList = screen.queryByTestId("record-list");
    expect(recordList).toBeNull();
  });
  test("Record list is exist after resting.", () => {
    render(<PomodorosPage />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    const recordList = screen.queryByTestId("record-list");
    expect(recordList).not.toBeNull();
  });
});
