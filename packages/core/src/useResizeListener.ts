"use client";

import { useEffect } from "react";

import { delegateEvent } from "./delegateEvent.js";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type useResizeObserver } from "./useResizeObserver.js";

/**
 * @since 6.0.0 Removed the `immediate` option to force the resize handler to be
 * called immediately.
 * @since 6.0.0 Renamed to a new API so that there is no longer an `options`
 * property and instead the `AddEventListenerOptions` are part of the hook
 * options.
 * @since 6.0.0 Renamed `onResize` to `onUpdate` and `enabled` to `disabled`.
 */
export interface ResizeListenerOptions extends AddEventListenerOptions {
  /**
   * Set this to `false` to disable throttling with
   * `window.requestAnimationFrame`.
   *
   * @defaultValue `true`
   * @since 6.0.0
   */
  throttle?: boolean;

  /**
   * Set this to `true` to disable attaching the resize event handler.
   *
   * @defaultValue `false`
   */
  disabled?: boolean;

  /**
   * This function will be called whenever the resize event is fired on the
   * `window`. This should be wrapped in `useCallback`.
   */
  onUpdate: (event: Event) => void;
}

/**
 * This hook can be used to listen to the entire window resizing. If you need to
 * observe specific elements resizing, check out the {@link useResizeObserver}
 * hook instead.
 *
 * @example Simple Example
 * ```tsx
 * import { useResizeListener } from "@react-md/core/useResizeListener";
 * import { type ReactElement } from "react";
 * import { useState } from "react";
 *
 * function Example(): ReactElement {
 *   const [size, setSize] = useState({
 *     height: window.innerHeight,
 *     width: window.innerWidth,
 *   });
 *
 *   useResizeListener({
 *     onUpdate(event) {
 *       setSize({
 *         height: window.innerHeight,
 *         width: window.innerWidth,
 *       });
 *     },
 *   });
 *
 *   return (
 *     <>
 *       The current window size:
 *       <pre>
 *         <code>{JSON.stringify(size, null, 2)}</code>
 *       </pre>
 *     </>
 *   );
 * }
 * ```
 *
 * @since 6.0.0  Updated the API to match the `useResizeObserver` and
 * `useIntersectionObserver` hooks by having an `onUpdate` callback and include
 * the `AddEventListenerOptions` as part of the hook options.
 */
export function useResizeListener(options: ResizeListenerOptions): void {
  const {
    once,
    signal,
    capture,
    passive,
    throttle = true,
    disabled = false,
    onUpdate,
  } = options;

  useEffect(() => {
    if (disabled) {
      return;
    }

    const eventHandler = delegateEvent("resize", window, throttle, {
      once,
      signal,
      capture,
      passive,
    });
    eventHandler.add(onUpdate);

    window.dispatchEvent(new Event("resize"));
    return () => {
      eventHandler.remove(onUpdate);
    };
  }, [capture, disabled, onUpdate, once, passive, signal, throttle]);
}
