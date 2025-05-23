import { describe, expect, it } from "@jest/globals";
import { cnb } from "cnbuilder";

import { render, screen } from "../../test-utils/index.js";
import { FontIcon } from "../FontIcon.js";
import { IconRotator } from "../IconRotator.js";
import { SVGIcon } from "../SVGIcon.js";

function Icon({ className }: { className?: string }) {
  return <i data-testid="icon" className={cnb("custom-icon", className)} />;
}

describe("IconRotator", () => {
  it("should default to cloning the icon rotator class names into the child element", () => {
    const { container, rerender } = render(
      <IconRotator data-testid="rotator" rotated={false}>
        <Icon />
      </IconRotator>
    );
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveClass(
      "custom-icon rmd-icon-rotator rmd-icon-rotator--animate",
      { exact: true }
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator data-testid="rotator" rotated>
        <Icon />
      </IconRotator>
    );
    expect(icon).toHaveClass(
      "custom-icon rmd-icon-rotator rmd-icon-rotator--animate rmd-icon-rotator--rotated",
      { exact: true }
    );
    expect(container).toMatchSnapshot();
  });

  it("should work automatically with the FontIcon component", () => {
    const { container, rerender } = render(
      <IconRotator rotated={false}>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();
  });

  it("should work automatically with the SVGIcon component", () => {
    const { container, rerender } = render(
      <IconRotator rotated={false}>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();
  });

  it("should wrap the children with a span if the forceIconWrap prop is enabled", () => {
    const { container, rerender } = render(
      <IconRotator rotated={false} forceIconWrap>
        <Icon />
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated forceIconWrap>
        <Icon />
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated={false} forceIconWrap>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated forceIconWrap>
        <FontIcon>home</FontIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated={false} forceIconWrap>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();

    rerender(
      <IconRotator rotated forceIconWrap>
        <SVGIcon>
          <path d="0i3odksf" />
        </SVGIcon>
      </IconRotator>
    );
    expect(container).toMatchSnapshot();
  });
});
