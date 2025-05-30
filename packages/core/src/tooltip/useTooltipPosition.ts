"use client";

import { useCallback, useState } from "react";

import type { SimplePosition } from "../positioning/types.js";
import {
  DEFAULT_TOOLTIP_POSITION,
  DEFAULT_TOOLTIP_THRESHOLD,
} from "./constants.js";
import { getPosition } from "./utils.js";

/** @internal */
const noop = (): void => {
  // do nothing
};

/**
 * @since 2.8.0
 */
export interface TooltipPositionHookOptions {
  /**
   * An optional controlled position to use that will disable the functionality
   * to determine the "best" position to render the tooltip within the viewport.
   */
  position?: SimplePosition;

  /**
   * An optional position to use before the positioning calculation has
   * occurred. This is also used to determine if the position should be
   * horizontal vs vertical.
   *
   * Vertical - `"below"` or `"above"`
   * Horizontal - `"left"` or `"right"`
   *
   * @defaultValue `"below"`
   */
  defaultPosition?: SimplePosition;

  /**
   * This value should be between 0 and 1 and will be multiplied by either the
   * viewport height or viewport width to determine the best position to render
   * the tooltip based on available space within the viewport.
   *
   * You _probably_ won't ever really need to update this value.
   *
   * @defaultValue `0.75`
   */
  threshold?: number;
}

/**
 * @internal
 * @since 2.8.0
 */
export type UpdateTooltipPosition = (container: HTMLElement) => void;

/**
 * @internal
 * @since 2.8.0
 */
export type TooltipPositionHookReturnValue = [
  SimplePosition,
  UpdateTooltipPosition,
];

/**
 * A hook that's used to determine the "best" position to render the tooltip
 * within the viewport.
 *
 * @internal
 * @since 2.8.0
 */
export function useTooltipPosition(
  options: TooltipPositionHookOptions
): TooltipPositionHookReturnValue {
  const {
    position: determinedPosition,
    threshold = DEFAULT_TOOLTIP_THRESHOLD,
    defaultPosition = DEFAULT_TOOLTIP_POSITION,
  } = options;

  const [position, setPosition] = useState(defaultPosition);
  const updatePosition = useCallback<UpdateTooltipPosition>(
    (container) => {
      setPosition(
        getPosition({
          container,
          threshold,
          defaultPosition,
        })
      );
    },
    [defaultPosition, threshold]
  );

  if (typeof determinedPosition !== "undefined") {
    return [determinedPosition, noop];
  }

  return [position, updatePosition];
}
