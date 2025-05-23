/* eslint-disable jest-dom/prefer-to-have-value */
import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement } from "react";

import { Button } from "../../button/Button.js";
import { AppSizeProvider } from "../../media-queries/AppSizeProvider.js";
import { DropdownMenu } from "../../menu/DropdownMenu.js";
import { MenuItemRadio } from "../../menu/MenuItemRadio.js";
import { fireEvent, render, screen } from "../../test-utils/index.js";
import { Form } from "../Form.js";
import { Radio } from "../Radio.js";
import { useRadioGroup } from "../useRadioGroup.js";

describe("useRadioGroup", () => {
  it("should not check any radio elements by default", () => {
    function Test(): ReactElement {
      const { getRadioProps } = useRadioGroup({ name: "example" });

      return (
        <Form>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
        </Form>
      );
    }

    const { container } = render(<Test />);

    const radio1 = screen.getByRole("radio", { name: "First" });
    const radio2 = screen.getByRole("radio", { name: "Second" });
    const radio3 = screen.getByRole("radio", { name: "Third" });
    const radio4 = screen.getByRole("radio", { name: "Forth" });
    expect(radio1).toHaveAttribute("value", "a");
    expect(radio2).toHaveAttribute("value", "b");
    expect(radio3).toHaveAttribute("value", "c");
    expect(radio4).toHaveAttribute("value", "d");
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();

    fireEvent.click(radio3);
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();
    expect(container).toMatchSnapshot();
  });

  it("should support creating a required radio group", () => {
    const onInvalid = jest.fn();
    function Test(): ReactElement {
      const { getRadioProps } = useRadioGroup({
        name: "example",
        required: true,
        onInvalid,
      });

      return (
        <Form>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
          <Button type="submit">Submit</Button>
        </Form>
      );
    }

    const { container } = render(<Test />);
    expect(onInvalid).not.toHaveBeenCalled();

    const submit = screen.getByRole("button", { name: "Submit" });
    const radio1 = screen.getByRole("radio", { name: "First" });

    fireEvent.click(submit);

    expect(onInvalid).toHaveBeenCalledTimes(4);
    expect(container).toMatchSnapshot();

    fireEvent.click(radio1);
    expect(container).toMatchSnapshot();
  });

  it("should support a default value and inferring the valid types from that default value", () => {
    type ExampleValue = "a" | "b" | "c" | "d";

    const onChange = jest.fn();
    const defaultValue: ExampleValue = "a";

    function Test(): ReactElement {
      const { getRadioProps } = useRadioGroup({
        name: "example",
        onChange,
        defaultValue,
      });

      // @ts-expect-error
      getRadioProps("invalid");

      return (
        <Form>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
        </Form>
      );
    }

    render(<Test />);

    const radio1 = screen.getByRole("radio", { name: "First" });
    const radio2 = screen.getByRole("radio", { name: "Second" });
    expect(onChange).not.toHaveBeenCalled();
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    fireEvent.click(radio1);
    expect(onChange).not.toHaveBeenCalled();
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();

    fireEvent.click(radio2);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
  });

  it("should support resetting to the default value", () => {
    function Test(): ReactElement {
      const { getRadioProps, reset } = useRadioGroup({
        name: "example",
        defaultValue: () => "c",
      });

      return (
        <Form onReset={reset}>
          <Radio {...getRadioProps("a")} label="First" />
          <Radio {...getRadioProps("b")} label="Second" />
          <Radio {...getRadioProps("c")} label="Third" />
          <Radio {...getRadioProps("d")} label="Forth" />
          <Button type="reset">Reset</Button>
        </Form>
      );
    }

    render(<Test />);

    const radio1 = screen.getByRole("radio", { name: "First" });
    const radio2 = screen.getByRole("radio", { name: "Second" });
    const radio3 = screen.getByRole("radio", { name: "Third" });
    const radio4 = screen.getByRole("radio", { name: "Forth" });
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();

    fireEvent.click(radio2);
    expect(radio1).not.toBeChecked();
    expect(radio2).toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();

    fireEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();
  });

  it("should support rendering within a menu", () => {
    type Value = 1 | 2 | 3 | 4;

    function Test() {
      const { getRadioProps } = useRadioGroup<Value>({
        menu: true,
        defaultValue: 3,
      });

      return (
        <DropdownMenu buttonChildren="Toggle">
          <MenuItemRadio {...getRadioProps(1)}>First</MenuItemRadio>
          <MenuItemRadio {...getRadioProps(2)}>Second</MenuItemRadio>
          <MenuItemRadio {...getRadioProps(3)}>Third</MenuItemRadio>
          <MenuItemRadio {...getRadioProps(4)}>Forth</MenuItemRadio>
        </DropdownMenu>
      );
    }

    render(<Test />, { wrapper: AppSizeProvider });

    fireEvent.click(screen.getByRole("button", { name: "Toggle" }));
    expect(screen.getByRole("menu")).toMatchSnapshot();

    const radio1 = screen.getByRole("menuitemradio", { name: "First" });
    const radio2 = screen.getByRole("menuitemradio", { name: "Second" });
    const radio3 = screen.getByRole("menuitemradio", { name: "Third" });
    const radio4 = screen.getByRole("menuitemradio", { name: "Forth" });
    expect(radio1).not.toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeChecked();
    expect(radio4).not.toBeChecked();

    fireEvent.click(radio1);
    expect(radio1).toBeChecked();
    expect(radio2).not.toBeChecked();
    expect(radio3).not.toBeChecked();
    expect(radio4).not.toBeChecked();
  });
});
