"use client";
import {
  cssUtils,
  randomInt,
  useSkeletonPlaceholder,
  useToggle,
} from "@react-md/core";
import { useEffect, type ReactElement } from "react";
import styles from "./ReplacingContentExample.module.scss";

export default function ReplacingContentExample(): ReactElement {
  const disabled = useDisabled();
  const skeleton = useSkeletonPlaceholder({
    disabled,
    // style: {},
    className: styles.content,

    // height,
    // width,

    // If a static delay should be applied instead of a randomly generated one,
    // set this value to an `animation-delay` value. Should normally be a
    // negative duration or 0.
    // delay: "-200ms",
    // delay: "0s",
    // delay: "-0.15s",

    // When `delay` is not provided, the delay is a random n umber between these
    // two values. The defaults are shown below
    // minDelay: 0,
    // maxDelay: 400,

    minPercentage: 20,
    maxPercentage: 40,
  });

  return (
    <div className={cssUtils({ className: styles.container, fullWidth: true })}>
      <div {...skeleton}>This is some content!</div>
    </div>
  );
}

function useDisabled(): boolean {
  const { toggled, toggle } = useToggle();
  useEffect(() => {
    const duration = randomInt({ min: 5, max: 8 }) * 1000;
    const timeout = window.setTimeout(toggle, duration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [toggle, toggled]);

  return toggled;
}
