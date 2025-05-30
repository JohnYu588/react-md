"use client";

import {
  type ReactElement,
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const context = createContext(false);
const { Provider } = context;
context.displayName = "Ssr";

/**
 * @since 6.0.0
 */
export function useSsr(): boolean {
  return useContext(context);
}

/**
 * @since 6.0.0
 */
export interface SsrProviderProps {
  ssr?: boolean;
  children: ReactNode;
}

/**
 * **Client Component**
 *
 * @see {@link https://react-md.dev/components/ssr-provider | SsrProvider Demos}
 * @since 6.0.0
 */
export function SsrProvider(props: SsrProviderProps): ReactElement {
  const { ssr = false, children } = props;
  const [isSsr, setSsr] = useState(ssr);
  useEffect(() => {
    setSsr(false);
  }, []);
  return <Provider value={isSsr}>{children}</Provider>;
}
