import { forwardRef } from "react";
import type { SVGIconProps } from "@react-md/icon";
import { SVGIcon } from "@react-md/icon";

export default forwardRef<SVGSVGElement, SVGIconProps>(
  function AirplanemodeInactiveSharpIcon(props, ref) {
    return (
      <SVGIcon {...props} ref={ref}>
        <path d="M10.5 7.67V3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V9l8.5 5v2l-4.49-1.32-7.01-7.01zm9.28 14.94 1.41-1.41-7.69-7.7-3.94-3.94-6.75-6.75-1.42 1.41 6.38 6.38L2 14v2l8.5-2.5V19L8 20.5V22l4-1 4 1v-1.5L13.5 19v-2.67l6.28 6.28z" />
        <path d="M0 0h24v24H0V0z" fill="none" />
      </SVGIcon>
    );
  }
);
