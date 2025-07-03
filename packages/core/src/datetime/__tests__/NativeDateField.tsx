import { describe, expect, it } from "@jest/globals";
import { type ReactElement, type Ref, createRef } from "react";

import { Button } from "../../button/Button.js";
import { Form } from "../../form/Form.js";
import {
  fireEvent,
  render,
  screen,
  userEvent,
} from "../../test-utils/index.js";
import {
  NativeDateField,
  type NativeDateFieldProps,
} from "../NativeDateField.js";

type TestProps = Partial<NativeDateFieldProps> & {
  inputRef?: Ref<HTMLInputElement>;
};

function Test({
  name = "field",
  inputRef,
  ...options
}: TestProps): ReactElement {
  const { min, max, step, required, disableMessage } = options;
  let messageProps: TestProps["messageProps"];
  if (!disableMessage && (min || max || step || required)) {
    messageProps = {
      "data-testid": "message",
      messageProps: {
        "data-testid": "p",
      },
    };
  }
  return (
    <Form name="form">
      <NativeDateField
        label="Date"
        {...options}
        ref={inputRef}
        name={name}
        containerProps={{
          "data-testid": "container",
        }}
        messageContainerProps={{
          "data-testid": "message-container",
        }}
        messageProps={messageProps}
      />
      <Button type="reset">Reset</Button>
      <Button type="submit">Submit</Button>
    </Form>
  );
}

const setup = (props?: Partial<NativeDateFieldProps>) => {
  const user = userEvent.setup();
  const { rerender } = render(<Test {...props} />);
  const field = screen.getByLabelText("Date");
  const container = screen.getByTestId("container");
  const reset = screen.getByRole("button", { name: "Reset" });
  const submit = screen.getByRole("button", { name: "Submit" });

  return {
    user,
    field,
    container,
    reset,
    submit,
    rerender: (props?: TestProps) => rerender(<Test {...props} />),
  };
};

describe("NativeDateField", () => {
  it("should apply the correct styling, HTML attributes, and allow a ref", () => {
    const ref = createRef<HTMLInputElement>();
    const props = {
      label: "Field",
      name: "field",
      ref,
    } as const;
    const { rerender } = render(<NativeDateField {...props} />);

    const field = screen.getByLabelText("Field");
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).toBe(field);
    expect(field).toMatchSnapshot();

    rerender(
      <NativeDateField
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(field).toMatchSnapshot();
  });

  it("should support the readOnly state", () => {
    const { container, field } = setup({ readOnly: true });

    expect(field).toHaveAttribute("readOnly");
    expect(container).toMatchSnapshot();
  });

  it("should support the disabled state", () => {
    const { container, field } = setup({ disabled: true });

    expect(field).toBeDisabled();
    expect(container).toMatchSnapshot();
  });

  it("should support an error state", () => {
    const { container } = setup({ error: true });
    expect(container).toMatchSnapshot();
  });

  it("should not render the FormMessageContainer if the min, max, step, and required props are not provided", () => {
    const { rerender } = setup();

    expect(() => screen.getByTestId("message-container")).toThrow();

    rerender({ min: "2025-01-01", max: "2026-01-01" });
    expect(() => screen.getByTestId("message-container")).not.toThrow();
    expect(() => screen.getByTestId("message")).not.toThrow();

    rerender({ min: "2025-01-01", max: "2026-01-01", disableMessage: true });
    expect(() => screen.getByTestId("message-container")).toThrow();
    expect(() => screen.getByTestId("message")).toThrow();
  });

  it("should handle simple validation inherited from the useTextField hook", async () => {
    const { user, field, container, reset } = setup({
      min: "2025-01-01",
      max: "2026-01-01",
    });
    expect(field).toHaveValue("");
    const message = screen.getByTestId("message");

    // NOTE: Can't actually type like a user for input type="date" at this time.
    await user.type(field, "2025-01-05");
    expect(field).toHaveValue("2025-01-05");
    fireEvent.blur(field);

    expect(message).toBeEmptyDOMElement();
    expect(container).not.toHaveClass("rmd-text-field-container--error");
    expect(message).not.toHaveClass("rmd-error-color");

    await user.clear(field);
    expect(field).toHaveValue("");
    expect(message).toBeEmptyDOMElement();
    expect(container).not.toHaveClass("rmd-text-field-container--error");
    expect(message).not.toHaveClass("rmd-error-color");

    await user.type(field, "2024-04-08{Tab}");
    expect(field).toHaveValue("2024-04-08");
    expect(message).not.toBeEmptyDOMElement();
    expect(container).toHaveClass("rmd-text-field-container--error");
    expect(message).toHaveClass("rmd-error-color");

    await user.click(reset);
    expect(field).toHaveValue("");
    expect(message).toBeEmptyDOMElement();
    expect(container).not.toHaveClass("rmd-text-field-container--error");
    expect(message).not.toHaveClass("rmd-error-color");
  });
});
