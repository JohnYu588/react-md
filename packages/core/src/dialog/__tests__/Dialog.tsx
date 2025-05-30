import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement, createRef } from "react";

import { Button } from "../../button/Button.js";
import { PORTAL_CONTAINER_ID } from "../../portal/PortalContainerProvider.js";
import {
  act,
  rmdRender,
  screen,
  userEvent,
  waitFor,
} from "../../test-utils/index.js";
import { TRANSITION_CONFIG } from "../../transition/config.js";
import { useToggle } from "../../useToggle.js";
import { isElementVisible } from "../../utils/isElementVisible.js";
import { Dialog, type DialogProps } from "../Dialog.js";
import { DEFAULT_DIALOG_CLASSNAMES, dialog } from "../styles.js";

type TestProps = Omit<
  DialogProps,
  "aria-label" | "aria-labelledby" | "visible" | "onRequestClose"
> & { defaultVisible?: boolean };

function Test(props: TestProps): ReactElement {
  const { children, defaultVisible = false, ...remaining } = props;

  const { toggled, enable, disable } = useToggle(defaultVisible);
  return (
    <>
      <Button onClick={enable}>Show</Button>
      <Dialog
        {...remaining}
        aria-label="Dialog"
        visible={toggled}
        onRequestClose={disable}
        overlayProps={{
          "data-testid": "overlay",
          ...remaining.overlayProps,
        }}
        containerProps={{
          "data-testid": "container",
          ...remaining.containerProps,
        }}
      >
        <Button onClick={disable}>Close</Button>
        {children}
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  it("should apply the correct styling, HTMLAttributes, and allow a ref", () => {
    const ref = createRef<HTMLDivElement>();
    const props = {
      "aria-label": "Dialog",
      ref,
      visible: true,
      onRequestClose: () => {},
    } as const;

    const { rerender } = rmdRender(<Dialog {...props} />);

    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(dialog);
    expect(dialog).toMatchSnapshot();

    rerender(
      <Dialog
        {...props}
        style={{ color: "white" }}
        className="custom-class-name"
      />
    );
    expect(dialog).toMatchSnapshot();
  });

  it("should use conditional rendering but support being hidden with the DISPLAY_NONE_CLASS by setting temporary to false", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    let show = screen.getByRole("button", { name: "Show" });
    expect(() => screen.getByRole("dialog")).toThrow();
    expect(() => screen.getByRole("button", { name: "Close" })).toThrow();

    await user.click(show);
    let dialog = screen.getByRole("dialog", { name: "Dialog" });
    let closeButton = screen.getByRole("button", { name: "Close" });
    expect(dialog).not.toHaveClass("rmd-dialog--enter");

    await user.click(closeButton);
    expect(dialog).not.toBeInTheDocument();
    expect(closeButton).not.toBeInTheDocument();

    // I do not support toggling the temporary state without going through the
    // full transition flow again
    rerender(<Test key="restart" temporary={false} />);
    show = screen.getByRole("button", { name: "Show" });
    dialog = screen.getByRole("dialog", { name: "Dialog" });
    closeButton = screen.getByRole("button", { name: "Close" });

    expect(isElementVisible(dialog)).toBe(false);
    expect(isElementVisible(closeButton)).toBe(false);

    await user.click(show);
    expect(isElementVisible(dialog)).toBe(true);
    expect(isElementVisible(closeButton)).toBe(true);

    await user.click(closeButton);
    expect(isElementVisible(dialog)).toBe(false);
    expect(isElementVisible(closeButton)).toBe(false);
  });

  it("should render an overlay unless the disableOverlay prop is true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    const show = screen.getByRole("button", { name: "Show" });
    expect(() => screen.getByTestId("overlay")).toThrow();

    await user.click(show);
    expect(() => screen.getByTestId("overlay")).not.toThrow();
    expect(() => screen.getByRole("dialog", { name: "Dialog" })).not.toThrow();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(() => screen.getByTestId("overlay")).toThrow();
    expect(() => screen.getByRole("dialog")).toThrow();

    rerender(<Test disableOverlay />);

    await user.click(show);
    expect(() => screen.getByTestId("overlay")).toThrow();
    expect(() => screen.getByRole("dialog", { name: "Dialog" })).not.toThrow();
  });

  it("should allow the user to close the dialog by clicking on the overlay", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);
    await user.click(screen.getByRole("button", { name: "Show" }));

    expect(() => screen.getByRole("dialog", { name: "Dialog" })).not.toThrow();
    await user.click(screen.getByTestId("overlay"));
    expect(() => screen.getByRole("dialog")).toThrow();
  });

  it("should move the focus onto the dialog when it becomes visible and back to the previous element once it is closed", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    const show = screen.getByRole("button", { name: "Show" });
    await user.click(show);

    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(dialog).toHaveFocus();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(dialog).not.toBeInTheDocument();

    // have to use waitFor because this focus happens after an animation frame
    // due to the weird timing of Enter keydown events compared to space
    await waitFor(() => {
      expect(show).toHaveFocus();
    });
  });

  it("should allow both the dialog and overlay to disable the portal behavior by enabling the disablePortal prop", async () => {
    const user = userEvent.setup();
    rmdRender(<Test disablePortal />);

    await user.click(screen.getByRole("button", { name: "Show" }));

    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    const overlay = screen.getByTestId("overlay");
    const portalContainer = document.getElementById(PORTAL_CONTAINER_ID);
    expect(portalContainer).not.toContainElement(dialog);
    expect(portalContainer).not.toContainElement(overlay);
  });

  it("should close the modal when the escape key is pressed and the disableEscapeClose is not true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    const show = screen.getByRole("button", { name: "Show" });
    await user.click(show);
    let dialog = screen.getByRole("dialog", { name: "Dialog" });

    await user.keyboard("[Escape]");
    expect(dialog).not.toBeInTheDocument();

    rerender(<Test disableEscapeClose />);
    await user.click(show);
    dialog = screen.getByRole("dialog", { name: "Dialog" });

    await user.keyboard("[Escape]");
    expect(dialog).toBeInTheDocument();
  });

  it("should be able to render as a modal with the correct accessibility", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Test aria-describedby="alert-message" modal>
        <div id="alert-message">Warning</div>
      </Test>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const alertDialog = screen.getByRole("alertdialog", { name: "Dialog" });
    const overlay = screen.getByTestId("overlay");

    expect(alertDialog).toHaveAttribute("aria-modal", "true");
    expect(overlay).not.toHaveClass("rmd-overlay--clickable");
    expect(overlay).toMatchSnapshot();
  });

  it("should not close the modal dialog when escape key is pressed or the overlay is clicked", async () => {
    const user = userEvent.setup();
    rmdRender(
      <Test aria-describedby="alert-message" modal>
        <div id="alert-message">Warning</div>
      </Test>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));
    const alertDialog = screen.getByRole("alertdialog", { name: "Dialog" });

    await user.keyboard("[Escape]");
    expect(alertDialog).toBeInTheDocument();

    await user.click(screen.getByTestId("overlay"));
    expect(alertDialog).toBeInTheDocument();
  });

  it("should be able to render as a full-page dialog by setting the type prop to full-page", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    await user.click(screen.getByRole("button", { name: "Show" }));
    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    const container = screen.getByTestId("container");
    expect(container).toMatchSnapshot();

    rerender(<Test type="full-page" />);
    expect(container).toBeInTheDocument();
    expect(dialog).toMatchSnapshot();
  });

  it("should enable scroll lock on the page while visible unless the disableScrollLock prop is true", async () => {
    const user = userEvent.setup();
    const { rerender } = rmdRender(<Test />);

    expect(document.body).not.toHaveStyle("overflow: hidden");

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(document.body).toHaveStyle("overflow: hidden");

    rerender(<Test disableScrollLock />);
    expect(document.body).not.toHaveStyle("overflow: hidden");

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(document.body).not.toHaveStyle("overflow: hidden");

    await user.click(screen.getByRole("button", { name: "Show" }));
    expect(document.body).not.toHaveStyle("overflow: hidden");
  });

  it("should handle nested dialogs by preventing the overlay and box-shadow from getting darker as more dialogs become visible", async () => {
    const user = userEvent.setup();
    function InfiniteDialog({ depth }: { depth: number }): ReactElement {
      const { toggled, enable, disable } = useToggle();

      return (
        <>
          <Button onClick={enable}>{`Show ${depth}`}</Button>
          <Dialog
            aria-label={`Dialog ${depth}`}
            visible={toggled}
            onRequestClose={disable}
            overlayProps={{
              "data-testid": `overlay${depth}`,
            }}
          >
            <InfiniteDialog depth={depth + 1} />
          </Dialog>
        </>
      );
    }

    rmdRender(
      <Test>
        <InfiniteDialog depth={1} />
      </Test>
    );

    await user.click(screen.getByRole("button", { name: "Show" }));

    const overlay = screen.getByTestId("overlay");
    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(overlay).toHaveClass("rmd-overlay--active");
    expect(dialog).not.toHaveClass("rmd-dialog--no-box-shadow");
    expect(overlay.className).toMatchSnapshot();
    expect(dialog.className).toMatchSnapshot();

    await user.click(screen.getByRole("button", { name: "Show 1" }));

    const overlay1 = screen.getByTestId("overlay1");
    const dialog1 = screen.getByRole("dialog", { name: "Dialog 1" });
    expect(overlay).not.toHaveClass("rmd-overlay--active");
    expect(overlay1).toHaveClass("rmd-overlay--active");
    expect(dialog).toHaveClass("rmd-dialog--no-box-shadow");
    expect(dialog1).not.toHaveClass("rmd-dialog--no-box-shadow");
    expect(overlay.className).toMatchSnapshot();
    expect(overlay1.className).toMatchSnapshot();
    expect(dialog.className).toMatchSnapshot();
    expect(dialog1.className).toMatchSnapshot();

    await user.click(screen.getByRole("button", { name: "Show 2" }));
    expect(overlay).not.toHaveClass("rmd-overlay--active");
    expect(overlay1).not.toHaveClass("rmd-overlay--active");
    expect(dialog).toHaveClass("rmd-dialog--no-box-shadow");
    expect(dialog1).toHaveClass("rmd-dialog--no-box-shadow");
    expect(overlay.className).toMatchSnapshot();
    expect(overlay1.className).toMatchSnapshot();
    expect(dialog.className).toMatchSnapshot();
    expect(dialog1.className).toMatchSnapshot();
  });

  it("should allow the appear transition when not using SSR mode", () => {
    expect(TRANSITION_CONFIG.disabled).toBe(true);
    TRANSITION_CONFIG.disabled = false;
    jest.useFakeTimers();

    rmdRender(<Test appear defaultVisible />, { rmdConfig: { ssr: false } });
    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(dialog).toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appear);
    expect(dialog).toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appearActive);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(dialog).not.toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appear);
    expect(dialog).not.toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appearActive);
  });

  it("should disable the appear transition when rendered in SSR mode", () => {
    expect(TRANSITION_CONFIG.disabled).toBe(true);
    TRANSITION_CONFIG.disabled = false;
    jest.useFakeTimers();

    rmdRender(<Test appear defaultVisible />, { rmdConfig: { ssr: true } });
    const dialog = screen.getByRole("dialog", { name: "Dialog" });
    expect(dialog).not.toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appear);
    expect(dialog).not.toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appearActive);
    act(() => {
      jest.runOnlyPendingTimers();
    });
    expect(dialog).not.toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appear);
    expect(dialog).not.toHaveClass(DEFAULT_DIALOG_CLASSNAMES.appearActive);
  });
});

describe("dialog class name utility", () => {
  it("should be callable with no arguments", () => {
    expect(dialog()).toMatchSnapshot();
  });
});
