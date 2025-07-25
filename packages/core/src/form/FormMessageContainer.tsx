import { type HTMLAttributes, forwardRef } from "react";

import { type PropsWithRef } from "../types.js";
import { FormMessage } from "./FormMessage.js";
import {
  type FormMessageContainerClassNameOptions,
  formMessageContainer,
} from "./formMessageContainerStyles.js";
import { type FormMessageProps } from "./types.js";

/**
 * @since 2.5.0
 */
export interface FormMessageContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    FormMessageContainerClassNameOptions {
  /**
   * If the extension doesn't actually want to render the `FormMessage`
   * component, these props are optional. It kind of eliminates the whole
   * purpose of this component though.
   */
  messageProps?: PropsWithRef<FormMessageProps>;
}

/**
 * Conditionally wraps the `children` in a `.rmd-form-message-container` wrapper
 * and renders the {@link FormMessage} component.
 *
 * @see {@link https://react-md.dev/components/form-message | FormMessage Demos}
 * @since 2.5.0
 */
export const FormMessageContainer = forwardRef<
  HTMLDivElement,
  FormMessageContainerProps
>(function FormMessageContainer(props, ref) {
  const { className, children, inline, messageProps, ...remaining } = props;
  if (!messageProps) {
    return <>{children}</>;
  }

  return (
    <div
      {...remaining}
      ref={ref}
      className={formMessageContainer({ className, inline })}
    >
      {children}
      <FormMessage {...messageProps} />
    </div>
  );
});
