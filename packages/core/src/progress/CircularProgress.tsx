import { cnb } from "cnbuilder";
import {
  type CSSProperties,
  type HTMLAttributes,
  forwardRef,
  useMemo,
} from "react";

import { cssUtils } from "../cssUtils.js";
import { type LabelRequiredForA11y } from "../types.js";
import { useEnsuredId } from "../useEnsuredId.js";
import { bem } from "../utils/bem.js";
import { getPercentage } from "../utils/getPercentage.js";
import { type ProgressProps } from "./types.js";

/**
 * @since 6.0.0 Added the `disableShrink` prop.
 * @since 6.0.0 Renamed `small` to `dense`.
 * @since 6.0.0 Renamed `centered` to `disableCentered`.
 * @since 6.0.0 Removed the `maxRotation` prop since the determinate state no
 * longer rotates while increasing value.
 */
export interface CircularProgressProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "id">,
    ProgressProps {
  /**
   * An optional style to apply to the svg within the circular progress. The
   * values of this style object will be merged with the current determinate
   * style (if it exists).
   */
  svgStyle?: CSSProperties;

  /**
   * An optional className to apply to the svg within the circular progress.
   */
  svgClassName?: string;

  /**
   * An optional style to apply to the circle within the circular progress. The
   * values of this style object will be merged with the current determinate
   * style (if it exists).
   */
  circleStyle?: CSSProperties;

  /**
   * An optional className to apply to the circle within the circular progress.
   */
  circleClassName?: string;

  /**
   * The radius for the circle. It is generally recommended to have the radius
   * be 1/2 of the viewbox and minus a few more pixels so that there is some
   * surrounding padding. You probably shouldn't really be changing this prop
   * though.
   *
   * @defaultValue `30`
   */
  radius?: number;

  /**
   * The center point for the circle. This should be half of the `viewBox` prop
   * 99% of the time and probably won't be changed.
   *
   * @defaultValue `33`
   */
  center?: number;

  /**
   * The viewbox for the child svg. I wouldn't recommend changing this value as
   * you will also need to update the `dashoffset` in both Sass and this prop to
   * get the animation to look nice again.
   *
   * @defaultValue `0 0 66 66`
   */
  viewBox?: string;

  /**
   * The `stroke-dashoffset` for the circle within the SVG. You probably won't
   * be changing this value that much as it should match the
   * `$rmd-progress-circle-dashoffset` Sass variable. This is really just used
   * to help to create the determinate progress animation.
   *
   * @defaultValue `187`
   */
  dashoffset?: number;

  /**
   * Boolean if the circular progress should be centered using left and right
   * margins.
   *
   * @defaultValue `false`
   * @since 6.0.0 Renamed from `centered`
   */
  disableCentered?: boolean;

  /**
   * Set to `true` to render as a smaller size.
   *
   * @defaultValue `false`
   * @since 2.3.0
   * @since 6.0.0 Renamed from `small`
   */
  dense?: boolean;

  /**
   * Set this to `true` to update the indeterminate behavior to only rotate
   * which will increase performance during CPU-intensive tasks or when many
   * loading spinners are displayed at once on the page.
   *
   * @defaultValue `false`
   * @since 6.0.0
   */
  disableShrink?: boolean;
}

const styles = bem("rmd-circular-progress");

/**
 * @example Indeterminate Example
 * ```tsx
 * import { CircularProgress } from "@react-md/core/progress/CircularProgress":
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   return <CircularProgress aria-label="Loading" />;
 * }
 * ```
 *
 * @example Determinate Example
 * ```tsx
 * import { CircularProgress } from "@react-md/core/progress/CircularProgress":
 * import { useState, type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   // a number from 0 - 100
 *   const [progress, setProgress] = useState(0);
 *
 *   return <CircularProgress aria-label="File upload" value={progress} />;
 * }
 * ```
 *
 * @since 6.0.0 Updated the determinate circular progress to no longer
 * rotate while increasing the value and require a label for accessibility.
 */
export const CircularProgress = forwardRef<
  HTMLSpanElement,
  LabelRequiredForA11y<CircularProgressProps>
>(function CircularProgress(props, ref) {
  const {
    id: propId,
    className,
    svgStyle,
    svgClassName,
    circleStyle: propCircleStyle,
    circleClassName,
    value,
    min = 0,
    max = 100,
    radius = 30,
    center = 33,
    viewBox = "0 0 66 66",
    theme = "primary",
    dense = false,
    dashoffset = 187,
    disableShrink = false,
    disableCentered = false,
    disableTransition = false,
    ...remaining
  } = props;

  const id = useEnsuredId(propId, "circular-progress");
  let progress: number | undefined;
  if (typeof value === "number") {
    progress = getPercentage({ min, max, value, validate: true });
  }

  const circleStyle = useMemo(() => {
    if (typeof progress !== "number") {
      return propCircleStyle;
    }

    return {
      ...propCircleStyle,
      strokeDashoffset: dashoffset - dashoffset * progress,
    };
  }, [progress, propCircleStyle, dashoffset]);

  const determinate = typeof progress === "number";
  const indeterminate = !determinate;
  return (
    <span
      {...remaining}
      id={id}
      ref={ref}
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cnb(
        styles({ dense, centered: !disableCentered }),
        theme !== "current-color" && cssUtils({ textColor: theme }),
        className
      )}
    >
      <svg
        style={svgStyle}
        className={cnb(
          styles("svg", {
            determinate,
            indeterminate: indeterminate && !disableShrink,
            "rotate-only": indeterminate && disableShrink,
          }),
          svgClassName
        )}
        viewBox={viewBox}
      >
        <circle
          style={circleStyle}
          className={cnb(
            styles("circle", {
              animate: !disableTransition && determinate,
              determinate,
              indeterminate: indeterminate && !disableShrink,
              "rotate-only": indeterminate && disableShrink,
            }),
            circleClassName
          )}
          r={radius}
          cx={center}
          cy={center}
        />
      </svg>
    </span>
  );
});
