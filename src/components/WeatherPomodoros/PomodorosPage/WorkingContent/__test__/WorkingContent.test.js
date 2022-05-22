import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import WorkingContent from "../WorkingContent";

const getWorkingContentValueMock = jest.fn();

describe("Working Content", () => {
  const countState = "STOP";
  test("Is exist.", () => {
    render(
      <WorkingContent
        countState={countState}
        isReadOnly={false}
        getWorkingContentValue={getWorkingContentValueMock}
      />
    );
    const inputContent = screen.getByRole("textbox");
    expect(inputContent).toBeInTheDocument();
  });
  test("has placeholder.", () => {
    render(
      <WorkingContent
        countState={countState}
        isReadOnly={false}
        getWorkingContentValue={getWorkingContentValueMock}
      />
    );
    const inputContent = screen.getByRole("textbox");
    expect(inputContent.placeholder).not.toBe("");
  });
  test("is read only when isReadOnly equals true.", () => {
    render(
      <WorkingContent
        countState={countState}
        isReadOnly={true}
        getWorkingContentValue={getWorkingContentValueMock}
      />
    );
    const inputContent = screen.getByRole("textbox");
    console.log(inputContent);
    expect(inputContent).toHaveAttribute("readonly");
  });
});
