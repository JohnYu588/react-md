"use client";

import { useEffect, useState } from "react";

import { useSsr } from "../SsrProvider.js";

/**
 * @example Simple Example
 * ```tsx
 * import { useMediaQuery } from "@react-md/core/media-queries/useMediaQuery";
 * import { type ReactElement } from "react";
 *
 * function Example(): ReactElement {
 *   const matches = useMediaQuery("screen and (min-width: 768px)");
 *
 *   return <>{matches ? "Matches" : "Doesn't"}</>;
 * }
 * ```
 *
 * @see {@link https://react-md.dev/hooks/use-media-query | useMediaQuery Demos}
 * @see {@link https://react-md.dev/components/app-size-provider | AppSizeProvider Demos}
 * @param query - The media query to use
 * @param disabled - When `true`, the `window.matchMedia` API will not be
 * activated and the hook will return the last cached value.
 * @returns `true` if the media query matches
 * @since 6.0.0 Removed the `defaultValue` and `checkImmediately` options.
 */
export function useMediaQuery(query: string, disabled = false): boolean {
  const ssr = useSsr();
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined" || disabled || ssr) {
      return false;
    }

    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (disabled || ssr) {
      return;
    }

    const result = window.matchMedia(query);
    setMatches(result.matches);

    const updater = ({ matches }: MediaQueryListEvent): void => {
      setMatches(matches);
    };

    result.addEventListener("change", updater);
    return () => {
      result.removeEventListener("change", updater);
    };
  }, [disabled, query, ssr]);

  return matches;
}
