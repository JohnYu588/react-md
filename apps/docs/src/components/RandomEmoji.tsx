"use client";

import { randomInt } from "@react-md/core/utils/randomInt";
import { cnb } from "cnbuilder";
import { type HTMLAttributes, type ReactElement, useRef } from "react";

import styles from "./RandomEmoji.module.scss";

// some that I found while viewing google fonts and https://en.wikipedia.org/wiki/List_of_emoticons
const LIST = [
  "(^_^;)",
  "(>_<)",
  "(^_^)b",
  "(;-;)",
  "(≥o≤)",
  "(·.·)",
  "(˚Δ˚)b",
  "(o^^)o",
  "(・・?",
  "\\(^o^)/",
];

export interface RandomEmojiProps extends HTMLAttributes<HTMLDivElement> {
  inheritFont?: boolean;
}

export function RandomEmoji(props: RandomEmojiProps): ReactElement {
  const { className, inheritFont, ...remaining } = props;
  const emoji = useRef("");
  if (emoji.current === "") {
    emoji.current = LIST[randomInt({ max: LIST.length - 1 })];
  }

  return (
    <div
      {...remaining}
      className={cnb(
        styles.container,
        inheritFont && styles.inherit,
        className
      )}
    >
      {emoji.current}
    </div>
  );
}
