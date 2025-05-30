import { describe, expect, it } from "@jest/globals";
import { type ReactElement } from "react";

import { fireEvent, render, screen } from "../test-utils/index.js";
import { useToggle } from "../useToggle.js";

function Test(): ReactElement {
  const { toggle, toggled, enable, disable } = useToggle();

  return (
    <>
      <div data-testid="output">{`${toggled}`}</div>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
      <button type="button" onClick={enable}>
        Enable
      </button>
      <button type="button" onClick={disable}>
        Disable
      </button>
    </>
  );
}

describe("useToggle", () => {
  it("should work as expected with no arguments", () => {
    render(<Test />);

    const output = screen.getByTestId("output");
    const toggle = screen.getByRole("button", { name: "Toggle" });
    const enable = screen.getByRole("button", { name: "Enable" });
    const disable = screen.getByRole("button", { name: "Disable" });
    expect(output).toHaveTextContent("false");

    fireEvent.click(toggle);
    expect(output).toHaveTextContent("true");
    fireEvent.click(toggle);
    expect(output).toHaveTextContent("false");

    fireEvent.click(disable);
    expect(output).toHaveTextContent("false");

    fireEvent.click(enable);
    expect(output).toHaveTextContent("true");
    fireEvent.click(enable);
    expect(output).toHaveTextContent("true");

    fireEvent.click(disable);
    expect(output).toHaveTextContent("false");
  });

  it("should allow for a default state", () => {
    function Test(): ReactElement {
      const { toggled } = useToggle(true);

      return <div data-testid="output">{`${toggled}`}</div>;
    }

    render(<Test />);

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("true");
  });

  it("should allow for a default state using a callback function", () => {
    function Test(): ReactElement {
      const { toggled } = useToggle(() => true);

      return <div data-testid="output">{`${toggled}`}</div>;
    }

    render(<Test />);

    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("true");
  });
});
