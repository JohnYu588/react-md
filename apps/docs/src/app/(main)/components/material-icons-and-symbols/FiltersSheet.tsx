"use client";

import { AppBar } from "@react-md/core/app-bar/AppBar";
import { box } from "@react-md/core/box/styles";
import { Button } from "@react-md/core/button/Button";
import { useAppSize } from "@react-md/core/media-queries/AppSizeProvider";
import { Sheet } from "@react-md/core/sheet/Sheet";
import { DEFAULT_SHEET_TIMEOUT } from "@react-md/core/sheet/styles";
import { useCSSTransition } from "@react-md/core/transition/useCSSTransition";
import CloseOutlinedIcon from "@react-md/material-icons/CloseOutlinedIcon";
import RefreshOutlinedIcon from "@react-md/material-icons/RefreshOutlinedIcon";
import { cnb } from "cnbuilder";
import { type ReactElement, useEffect, useId, useState } from "react";

import styles from "./FiltersSheet.module.scss";
import { FiltersSheetContent } from "./FiltersSheetContent.jsx";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

export interface FiltersSheetProps {
  className: string;
}

export function FiltersSheet(props: FiltersSheetProps): ReactElement {
  const { className } = props;

  const titleId = useId();
  const { filtersVisible, toggleFilters, isResettable, resetSymbols } =
    useMaterialIconsAndSymbols();

  // I use temporary layout until desktop
  const { isDesktop } = useAppSize();

  const [transitionIn, setTransitionIn] = useState(false);
  useEffect(() => {
    if (!filtersVisible || !isDesktop) {
      return;
    }

    const main = document.querySelector("main");
    if (!main) {
      return;
    }

    const isActive = (): boolean =>
      main.classList.contains("rmd-layout-h--active");

    setTransitionIn(isActive());

    // kinda hacky way to check if the expandable layout is expanded so that the
    // left/right can animate with the expansion animation
    const observer = new MutationObserver(() => {
      setTransitionIn(isActive());
    });
    observer.observe(main, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, [filtersVisible, isDesktop]);
  const { elementProps } = useCSSTransition({
    timeout: DEFAULT_SHEET_TIMEOUT,
    transitionIn,
    className: cnb(className, styles.sheet),
    classNames: {
      enter: styles.enter,
      enterActive: styles.offset,
      enterDone: styles.offset,
      exit: styles.exit,
    },
  });

  return (
    <Sheet
      aria-label="Filters"
      aria-labelledby={titleId}
      visible={filtersVisible}
      onRequestClose={toggleFilters}
      {...elementProps}
      temporary={!isDesktop}
      disablePortal
      disableOverlay={isDesktop}
      disableScrollLock={isDesktop}
    >
      <AppBar
        theme="clear"
        className={box({ disablePadding: true, justify: "end" })}
      >
        <Button
          disabled={!isResettable}
          onClick={resetSymbols}
          className={styles.button}
        >
          <RefreshOutlinedIcon />
          Reset all
        </Button>
        <Button buttonType="icon" aria-label="Close" onClick={toggleFilters}>
          <CloseOutlinedIcon />
        </Button>
      </AppBar>
      <FiltersSheetContent />
    </Sheet>
  );
}
