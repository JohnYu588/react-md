import { describe, expect, it, jest } from "@jest/globals";
import { type ReactElement } from "react";

import { fireEvent, render, screen } from "../../test-utils/index.js";
import {
  UserInteractionModeProvider,
  useUserInteractionMode,
} from "../UserInteractionModeProvider.js";

describe("UserInteractionModeProvider", () => {
  it("should throw an error if multiple instances are mounted", () => {
    const error = jest.spyOn(console, "error");
    error.mockImplementation(() => {});
    expect(() =>
      render(
        <UserInteractionModeProvider>
          <UserInteractionModeProvider>
            <span />
          </UserInteractionModeProvider>
        </UserInteractionModeProvider>
      )
    ).toThrow(
      "The `UserInteractionModeProvider` cannot be mounted multiple times."
    );

    error.mockRestore();
  });

  it("should update the document.body's className appropriately", () => {
    render(
      <UserInteractionModeProvider>
        <span />
      </UserInteractionModeProvider>
    );

    expect(document.body.className).toContain("mouse-mode");

    fireEvent.keyDown(window);
    expect(document.body.className).toContain("keyboard-mode");

    fireEvent.mouseDown(window);
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(window);
    expect(document.body.className).toContain("touch-mode");
  });

  it("should swap from touch back to mouse only when the mousemove event has not been triggered after a touchstart event", () => {
    // this is really a test that should be done in a browser.
    const now = jest
      .spyOn(Date, "now")
      // first touchstart
      .mockImplementationOnce(() => 0)
      // "fake" mousemove after touchstart
      .mockImplementationOnce(() => 9)
      // "real" mousemove
      .mockImplementationOnce(() => 1300)
      // second touchstart
      .mockImplementationOnce(() => 1500)
      // forth touchstart ("mousemove" after contextmenu never calls Date.now()
      // due to short circuiting)
      .mockImplementationOnce(() => 4000)
      // "fake" mousemove after touchstart
      .mockImplementationOnce(() => 4003)
      // "real" mousemove
      .mockImplementationOnce(() => 6000);

    render(
      <UserInteractionModeProvider>
        <span />
      </UserInteractionModeProvider>
    );
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("mouse-mode");

    fireEvent.touchStart(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.contextMenu(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.touchStart(window);
    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("touch-mode");

    fireEvent.mouseMove(window);
    expect(document.body.className).toContain("mouse-mode");

    now.mockRestore();
  });

  it("should allow for a child component to access the UserInteractionMode with the useUserInteractionMode hook", () => {
    function Test(): ReactElement {
      const mode = useUserInteractionMode();

      return <span data-testid="mode">{mode}</span>;
    }

    render(
      <UserInteractionModeProvider>
        <Test />
      </UserInteractionModeProvider>
    );

    const mode = screen.getByTestId("mode");
    expect(mode).toHaveTextContent("mouse");

    fireEvent.keyDown(window);
    expect(mode).toHaveTextContent("keyboard");

    fireEvent.touchStart(window);
    expect(mode).toHaveTextContent("touch");
  });
});
