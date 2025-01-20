"use client";

import type { MouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

import type { UseStateInitializer, UseStateSetter } from "../types.js";
import type { SimpleHoverModeContext } from "./useHoverModeProvider.js";

/**
 * @since 6.0.0
 */
export interface HoverModeConfigurationOptions extends SimpleHoverModeContext {
  /** @defaultValue `false` */
  disabled?: boolean;

  /**
   * This can be used to override the `HoverModeContext`'s hover time.
   */
  hoverTimeout?: number;

  /**
   * This can be used to override the `HoverModeContext`'s leave time.
   */
  leaveTimeout?: number;
}

/**
 * @since 6.0.0
 */
export interface ControlledHoverModeOptions
  extends HoverModeConfigurationOptions {
  setVisible: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export interface ControlledHoverModeImplementation {
  startShowFlow: (id?: string | MouseEvent) => void;
  startHideFlow: () => void;
  clearVisibilityTimeout: () => void;
}

/**
 * @since 6.0.0
 */
export interface UncontrolledHoverModeOptions
  extends HoverModeConfigurationOptions {
  defaultVisible?: UseStateInitializer<boolean>;
}

/**
 * @since 6.0.0
 */
export interface UncontrolledHoverModeImplementation
  extends ControlledHoverModeImplementation {
  visible: boolean;
  setVisible: UseStateSetter<boolean>;
}

/**
 * @since 6.0.0
 */
export interface HoverModeImplementation
  extends ControlledHoverModeImplementation {
  visible?: boolean;
  setVisible?: UseStateSetter<boolean>;
}

/**
 * @since 2.8.0
 * @since 5.0.0 This hook no longer returns `handlers` or
 * `stickyHandlers` and does not hide when an element on the page is clicked.
 * @since 6.0.0 Requires passing the custom hover mode context to
 * work.
 */
export function useHoverMode(
  options: ControlledHoverModeOptions
): ControlledHoverModeImplementation;
export function useHoverMode(
  options: UncontrolledHoverModeOptions
): UncontrolledHoverModeImplementation;
export function useHoverMode(
  options: ControlledHoverModeOptions | UncontrolledHoverModeOptions
): HoverModeImplementation {
  const {
    disabled,
    hoverTimeout: hoverTime,
    hoverTimeoutRef,
    leaveTimeout: leaveTime,
    leaveTimeoutRef,
    enableHoverMode,
    disableHoverMode,
    startDisableTimer,
    clearDisableTimer,
    setVisible: propSetVisible,
    defaultVisible = false,
  } = options as ControlledHoverModeOptions & UncontrolledHoverModeOptions;

  const state = useState(defaultVisible);
  let visible: boolean | undefined;
  let setVisible: UseStateSetter<boolean>;
  if (typeof propSetVisible !== "undefined") {
    setVisible = propSetVisible;
  } else {
    [visible, setVisible] = state;
  }

  const visibilityTimeout = useRef<number | undefined>();
  const clearVisibilityTimeout = useCallback(() => {
    window.clearTimeout(visibilityTimeout.current);
  }, []);

  // if the element is near the viewport edge, the mouseleave event might not
  // trigger correctly. for these cases, just clear any timeouts to be safe.
  // do not hide the visibility so that you can still inspect things in the
  // devtools
  useEffect(() => {
    if (disabled) {
      return;
    }

    const handler = (): void => {
      window.clearTimeout(visibilityTimeout.current);

      // might need to play with this more or make it configurable. if the mouse
      // leaves the window, you're _normally_ not interacting with the app
      // anymore and state should reset.
      disableHoverMode();
    };

    document.addEventListener("mouseleave", handler);
    return () => {
      document.removeEventListener("mouseleave", handler);
    };
  }, [disableHoverMode, disabled]);

  useEffect(() => {
    return () => {
      window.clearTimeout(visibilityTimeout.current);
    };
  }, []);

  return {
    visible,
    setVisible: setVisible === propSetVisible ? undefined : setVisible,
    startShowFlow: useCallback(
      (eventOrId) => {
        const hoverTimeout = hoverTime ?? hoverTimeoutRef.current;
        if (disabled || typeof hoverTimeout === "undefined") {
          return;
        }

        let id: string;
        if (typeof eventOrId === "string" || typeof eventOrId === "undefined") {
          id = eventOrId || "";
        } else {
          id = eventOrId.currentTarget.id;
        }

        clearDisableTimer();
        clearVisibilityTimeout();
        visibilityTimeout.current = window.setTimeout(() => {
          enableHoverMode(id);
          setVisible(true);
        }, hoverTimeout);
      },
      [
        clearDisableTimer,
        clearVisibilityTimeout,
        disabled,
        enableHoverMode,
        hoverTime,
        hoverTimeoutRef,
        setVisible,
      ]
    ),
    startHideFlow: useCallback(() => {
      if (disabled) {
        return;
      }

      startDisableTimer();
      clearVisibilityTimeout();
      visibilityTimeout.current = window.setTimeout(() => {
        setVisible(false);
      }, leaveTime ?? leaveTimeoutRef.current);
    }, [
      clearVisibilityTimeout,
      disabled,
      leaveTime,
      leaveTimeoutRef,
      setVisible,
      startDisableTimer,
    ]),
    clearVisibilityTimeout,
  };
}
