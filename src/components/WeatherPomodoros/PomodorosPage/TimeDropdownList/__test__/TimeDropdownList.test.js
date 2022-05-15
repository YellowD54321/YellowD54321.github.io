import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import {
  WorkingTimeDropdownList,
  RestingTimeDropdownList,
} from "../TimeDropdownList";

const getTimeValue = (data) => {
  // console.log(data);
  return data;
};

describe("WorkingTimeDropdownList", () => {
  // beforeEach(() => {
  //   console.log("*** before each ***");
  // });
  test("List is exist.", () => {
    render(<WorkingTimeDropdownList getTimeValue={getTimeValue} />);
    const dropdownList = screen.getByTestId("workingTimeDropdownSelecter");
    expect(dropdownList).toBeInTheDocument();
  });

  test("Default value is working.", () => {
    const defaultStartTime = 10;
    render(
      <WorkingTimeDropdownList
        getTimeValue={getTimeValue}
        defaultStartTime={defaultStartTime}
      />
    );
    const dropdownList = screen.getByTestId("workingTimeDropdownSelecter");
    expect(dropdownList.value).toBe(defaultStartTime.toString());
  });

  test("Check value when selected.", () => {
    const defaultStartTime = 10;
    const selectdTime = 25;
    render(
      <WorkingTimeDropdownList
        getTimeValue={getTimeValue}
        defaultStartTime={defaultStartTime}
      />
    );
    const dropdownList = screen.getByTestId("workingTimeDropdownSelecter");
    fireEvent.change(dropdownList, {
      target: { value: selectdTime.toString() },
    });
    expect(dropdownList.value).toBe(selectdTime.toString());
  });

  test("Return value when selected.", () => {
    const defaultReturnText = "The return text is: ";
    let returnText = "";
    const getTimeValue = (data) => {
      returnText = defaultReturnText;
      returnText = returnText + data.toString();
    };
    const defaultStartTime = 10;
    const selectdTime = 25;
    render(
      <WorkingTimeDropdownList
        getTimeValue={getTimeValue}
        defaultStartTime={defaultStartTime}
      />
    );
    const dropdownList = screen.getByTestId("workingTimeDropdownSelecter");
    fireEvent.change(dropdownList, {
      target: { value: selectdTime.toString() },
    });
    expect(returnText).toBe(defaultReturnText + selectdTime.toString());
  });
});

describe("RestingTimeDropdownList", () => {
  // beforeEach(() => {
  //   console.log("*** before each ***");
  // });
  test("List is exist.", () => {
    render(<RestingTimeDropdownList getTimeValue={getTimeValue} />);
    const dropdownList = screen.getByTestId("restingTimeDropdownSelecter");
    expect(dropdownList).toBeInTheDocument();
  });

  test("Default value is working.", () => {
    const defaultStartTime = 10;
    render(
      <RestingTimeDropdownList
        getTimeValue={getTimeValue}
        defaultStartTime={defaultStartTime}
      />
    );
    const dropdownList = screen.getByTestId("restingTimeDropdownSelecter");
    expect(dropdownList.value).toBe(defaultStartTime.toString());
  });

  test("Check value when selected.", () => {
    const defaultStartTime = 10;
    const selectdTime = 30;
    render(
      <RestingTimeDropdownList
        getTimeValue={getTimeValue}
        defaultStartTime={defaultStartTime}
      />
    );
    const dropdownList = screen.getByTestId("restingTimeDropdownSelecter");
    fireEvent.change(dropdownList, {
      target: { value: selectdTime.toString() },
    });
    expect(dropdownList.value).toBe(selectdTime.toString());
  });

  test("Return value when selected.", () => {
    const defaultReturnText = "The return text is: ";
    let returnText = "";
    const getTimeValue = (data) => {
      returnText = defaultReturnText;
      returnText = returnText + data.toString();
    };
    const defaultStartTime = 10;
    const selectdTime = 25;
    render(
      <RestingTimeDropdownList
        getTimeValue={getTimeValue}
        defaultStartTime={defaultStartTime}
      />
    );
    const dropdownList = screen.getByTestId("restingTimeDropdownSelecter");
    fireEvent.change(dropdownList, {
      target: { value: selectdTime.toString() },
    });
    expect(returnText).toBe(defaultReturnText + selectdTime.toString());
  });
});
