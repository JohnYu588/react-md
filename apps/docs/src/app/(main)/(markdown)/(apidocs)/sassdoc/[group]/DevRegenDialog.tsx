"use client";

import { Button } from "@react-md/core/button/Button";
import { Dialog } from "@react-md/core/dialog/Dialog";
import { useToggle } from "@react-md/core/useToggle";
import CloseIcon from "@react-md/material-icons/CloseIcon";
import { type ReactElement, type ReactNode, useEffect } from "react";

import styles from "./DevRegenDialog.module.scss";

export interface DevRegenDialogProps {
  children: ReactNode;
}

export function DevRegenDialog({
  children,
}: DevRegenDialogProps): ReactElement {
  const { toggled, enable, disable } = useToggle();
  useEffect(() => {
    enable();
  }, [enable]);

  return (
    <Dialog
      visible={toggled}
      onRequestClose={disable}
      aria-label="Regenerate SassDoc"
      type="custom"
      disableOverlay
      disableTransition
      disableScrollLock
      isFocusTypeDisabled={() => true}
      className={styles.dialog}
      containerProps={{
        enabled: true,
        className: styles.container,
      }}
    >
      <Button
        aria-label="Close"
        onClick={disable}
        buttonType="icon"
        className={styles.button}
      >
        <CloseIcon />
      </Button>
      {children}
    </Dialog>
  );
}
