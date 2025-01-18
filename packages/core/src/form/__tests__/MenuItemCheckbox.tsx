import { describe, expect, it, jest } from "@jest/globals";
import { createRef } from "react";
import { rmdRender, screen } from "../../test-utils/index.js";
import { type MenuItemCheckboxProps } from "../MenuItemInputToggle.js";
import { MenuItemCheckbox } from "../MenuItemCheckbox.js";

describe("MenuItemCheckbox", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLLIElement>();
    const props = {
      ref,
      checked: false,
      onCheckedChange: jest.fn(),
      children: "Checkbox",
    } as const;

    const { rerender } = rmdRender(<MenuItemCheckbox {...props} />);

    const element = screen.getByRole("menuitemcheckbox", { name: "Checkbox" });
    expect(ref.current).toBeInstanceOf(HTMLLIElement);
    expect(ref.current).toBe(element);
    expect(element).toMatchSnapshot();

    rerender(
      <MenuItemCheckbox
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(element).toMatchSnapshot();
  });

  it("should allow for a custom unchecked and checked icon", () => {
    const props: MenuItemCheckboxProps = {
      icon: null,
      checkedIcon: <span data-testid="checked" />,
      iconAfter: true,
      children: "Checkbox",
      checked: false,
      onCheckedChange: jest.fn(),
    };

    const { rerender } = rmdRender(<MenuItemCheckbox {...props} />);

    const element = screen.getByRole("menuitemcheckbox", { name: "Checkbox" });
    expect(element).toMatchSnapshot();
    expect(element.querySelector(".rmd-icon")).toBeNull();

    rerender(<MenuItemCheckbox {...props} checked />);
    expect(element).toMatchSnapshot();
  });
});
