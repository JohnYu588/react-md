import { type FixedPositionOptions, type HorizontalPosition } from "./types.js";
import {
  type XCoordConfig,
  getCenterXCoord,
  getInnerLeftCoord,
  getInnerRightCoord,
  getLeftCoord,
  getRightCoord,
} from "./utils.js";

/**
 * @internal
 */
interface XPosition {
  left: number;
  right?: number;
  width?: number;
  minWidth?: number;
  actualX: HorizontalPosition;
}

/**
 * @internal
 */
export interface HorizontalFixConfig extends XCoordConfig {
  vwMargin: number;
  screenRight: number;
  disableSwapping: boolean;
}

/**
 * @internal
 */
export interface CreateHorizontalPositionOptions
  extends Required<
    Pick<
      FixedPositionOptions,
      "vwMargin" | "xMargin" | "width" | "disableSwapping"
    >
  > {
  x: HorizontalPosition;
  vw: number;
  elWidth: number;
  initialX?: number;
  containerRect: DOMRect;
}

/**
 * Attempts to position the fixed element so that it will appear to the left of
 * the container element but also within the viewport boundaries. When swapping
 * is enabled, it will attempt to swap to the right position if it can't fit
 * within the viewport to the left. If it can't fit in the viewport even after
 * being swapped to the right or swapping is disabled, it will be positioned to
 * the viewport left boundary.
 *
 * @internal
 */
export function createAnchoredLeft(config: HorizontalFixConfig): XPosition {
  const { vwMargin, screenRight, elWidth, disableSwapping } = config;

  let left = getLeftCoord(config);
  let actualX: HorizontalPosition = "left";
  if (left >= vwMargin) {
    return { actualX, left };
  }

  const swappedLeft = getRightCoord(config);
  if (disableSwapping || swappedLeft + elWidth > screenRight) {
    left = vwMargin;
  } else {
    left = swappedLeft;
    actualX = "right";
  }

  return { actualX, left };
}

/**
 * Attempts to position the fixed element so that it will appear to the
 * inner-left of the container element but also within the viewport boundaries.
 * When swapping is enabled, it will attempt to swap to the right position if it
 * can't fit within the viewport to the left. If it can't fit in the viewport
 * even after being swapped to the right or swapping is disabled, it will be
 * positioned to the viewport left boundary.
 *
 * @internal
 */
export function createAnchoredInnerLeft(
  config: HorizontalFixConfig
): XPosition {
  const { vwMargin, screenRight, elWidth, disableSwapping } = config;

  let left = getInnerLeftCoord(config);
  let actualX: HorizontalPosition = "inner-left";
  if (left + elWidth <= screenRight && left >= vwMargin) {
    return { actualX, left };
  }

  if (disableSwapping) {
    if (left + elWidth > screenRight) {
      left = screenRight - elWidth;
    } else {
      left = vwMargin;
    }

    return { actualX, left };
  }

  const swappedLeft = getInnerRightCoord(config);
  if (swappedLeft < vwMargin) {
    left = vwMargin;
  } else if (swappedLeft + elWidth > screenRight) {
    left = screenRight - elWidth;
    actualX = "inner-right";
  } else {
    left = swappedLeft;
    actualX = "inner-right";
  }

  return { actualX, left };
}

/**
 * Attempts to position the fixed element so that it will appear at the center
 * of the container element but also within the viewport boundaries. If the
 * centered element can't fit within the viewport, it will use the vwMargin
 * value if it overflowed to the left, it'll position to the screen right
 * boundary.
 *
 * @internal
 */
export function createAnchoredHorizontalCenter(
  config: HorizontalFixConfig
): XPosition {
  const { vwMargin, screenRight, elWidth } = config;
  let left = getCenterXCoord(config);
  if (left < vwMargin) {
    left = vwMargin;
  } else if (left + elWidth > screenRight || left < vwMargin) {
    left = screenRight - elWidth;
  }

  return { actualX: "center", left };
}

/**
 * Attempts to position the fixed element so that it will appear to the
 * inner-right of the container element but also within the viewport boundaries.
 * When swapping is enabled, it will attempt to swap to the inner-left position
 * if it can't fit within the viewport to the right. If it can't fit in the
 * viewport even after being swapped to the left or swapping is disabled, it
 * will be positioned to the viewport right boundary.
 *
 * @internal
 */
export function createAnchoredInnerRight(
  config: HorizontalFixConfig
): XPosition {
  const { screenRight, vwMargin, elWidth, disableSwapping } = config;

  let left = getInnerRightCoord(config);
  let actualX: HorizontalPosition = "inner-right";
  if (left >= vwMargin) {
    return { actualX, left: Math.min(left, screenRight - elWidth) };
  }

  const swappedLeft = getInnerLeftCoord(config);
  if (disableSwapping || swappedLeft + elWidth > screenRight) {
    left = vwMargin;
  } else {
    left = Math.max(swappedLeft, vwMargin);
    actualX = "inner-left";
  }

  return { actualX, left };
}

/**
 * Attempts to position the fixed element so that it will appear to the right of
 * the container element but also within the viewport boundaries. When swapping
 * is enabled, it will attempt to swap to the left position if it can't fit
 * within the viewport to the right. If it can't fit in the viewport even after
 * being swapped to the left or swapping is disabled, it will be positioned to
 * the viewport right boundary.
 *
 * @internal
 */
export function createAnchoredRight(config: HorizontalFixConfig): XPosition {
  const { screenRight, vwMargin, elWidth, disableSwapping } = config;

  let left = getRightCoord(config);
  let actualX: HorizontalPosition = "right";
  if (left + elWidth <= screenRight) {
    return { actualX, left };
  }

  const swappedLeft = getLeftCoord(config);
  if (disableSwapping || swappedLeft < vwMargin) {
    left = screenRight - elWidth;
  } else {
    left = swappedLeft;
    actualX = "left";
  }

  return { actualX, left };
}

export interface EqualWidthOptions
  extends Pick<
    CreateHorizontalPositionOptions,
    "x" | "elWidth" | "xMargin" | "vwMargin" | "containerRect" | "initialX"
  > {
  screenRight: number;
  isMinWidth: boolean;
}

/**
 * @internal
 */
export function createEqualWidth(options: EqualWidthOptions): XPosition {
  const {
    x,
    elWidth,
    xMargin,
    vwMargin,
    initialX,
    containerRect,
    screenRight,
    isMinWidth,
  } = options;

  let left = initialX ?? containerRect.left + xMargin;

  let width: number | undefined = containerRect.width - xMargin * 2;
  let minWidth: number | undefined;
  let right: number | undefined;
  if (isMinWidth) {
    minWidth = width;
    // if the fixed element has a width greater than the element it is fixed to,
    // update the width to be the fixed element's width. since the "min-width"
    // option is only possible for horizontally centered elements, need to then
    // update the `left` position again.
    if (elWidth > width) {
      left -= (elWidth - width) / 2;
      minWidth = elWidth;
    }

    width = undefined;
    const elRight = left + elWidth;
    if (elRight > screenRight) {
      left -= elRight - screenRight;
      right = vwMargin;
    }

    left = Math.max(vwMargin, left);
  }

  // going to assume that the container element is visible in the DOM and just
  // make the fixed element have the same left and right corners
  return {
    left,
    right,
    width,
    minWidth,
    actualX: x,
  };
}

/**
 * Creates the horizontal position for a fixed element with the provided
 * options.
 * @internal
 */
export function createHorizontalPosition(
  options: CreateHorizontalPositionOptions
): XPosition {
  const {
    x,
    vw,
    vwMargin,
    xMargin,
    width,
    elWidth,
    initialX,
    containerRect,
    disableSwapping,
  } = options;

  const screenRight = vw - vwMargin;
  if (width !== "equal" && elWidth > vw - vwMargin * 2) {
    // if the element's width is greater than the viewport's width minus the
    // margin on both sides, just make the element span the entire viewport with
    // the margin
    return {
      left: vwMargin,
      right: vwMargin,
      actualX: x,
    };
  }

  if (width === "min" || width === "equal") {
    return createEqualWidth({
      x,
      vwMargin,
      xMargin,
      elWidth,
      initialX,
      containerRect,
      screenRight,
      isMinWidth: width === "min",
    });
  }

  const config: HorizontalFixConfig = {
    vwMargin,
    xMargin,
    elWidth,
    initialX,
    screenRight,
    containerRect,
    disableSwapping,
  };

  switch (x) {
    case "left":
      return createAnchoredLeft(config);
    case "inner-left":
      return createAnchoredInnerLeft(config);
    case "center":
      return createAnchoredHorizontalCenter(config);
    case "inner-right":
      return createAnchoredInnerRight(config);
    case "right":
      return createAnchoredRight(config);
  }
}
