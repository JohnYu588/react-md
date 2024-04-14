// import { addAppToast } from "@/toasts.js";
import { TooltippedButton } from "@react-md/core/button/TooltippedButton";
import { cssUtils } from "@react-md/core/cssUtils";
import { DialogHeader } from "@react-md/core/dialog/DialogHeader";
import { DialogTitle } from "@react-md/core/dialog/DialogTitle";
import { Tooltip } from "@react-md/core/tooltip/Tooltip";
import { useTooltip } from "@react-md/core/tooltip/useTooltip";
import CloseOutlinedIcon from "@react-md/material-icons/CloseOutlinedIcon";
import ShareOutlinedIcon from "@react-md/material-icons/ShareOutlinedIcon";
import { type ReactElement } from "react";
import styles from "./HowToUseSheetHeader.module.scss";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";
import { MaterialSymbolOrIcon } from "./MaterialSymbolOrIcon.jsx";
import { CopyToClipboard } from "@react-md/code/CopyToClipboard";

export function HowToUseSheetHeader(): ReactElement {
  const { selectedIconName, deselectIcon } = useMaterialIconsAndSymbols();
  const { elementProps, tooltipProps } = useTooltip({
    hoverTimeout: 0,
    overflowOnly: true,
  });
  const name = (selectedIconName || "").replace(/_/g, " ");

  return (
    <DialogHeader className={styles.header}>
      <MaterialSymbolOrIcon iconName={selectedIconName} />
      <DialogTitle
        {...elementProps}
        as="h4"
        type="headline-6"
        className={cssUtils({
          className: styles.title,
          textTransform: "capitalize",
          textOverflow: "ellipsis",
        })}
      >
        {name}
      </DialogTitle>
      <Tooltip
        {...tooltipProps}
        className={cssUtils({ textTransform: "capitalize" })}
      >
        {name}
      </Tooltip>
      <CopyToClipboard
        aria-label="Share"
        tooltip="Copy url to clipboard"
        getCopyText={() => window.location.href}
        onCopied={() => {
          // addAppToast({ toastId: "copied" });
        }}
        iconSize="normal"
        buttonType="icon"
      >
        <ShareOutlinedIcon />
      </CopyToClipboard>
      <TooltippedButton
        aria-label="Close"
        tooltip="Close"
        onClick={deselectIcon}
        buttonType="icon"
      >
        <CloseOutlinedIcon />
      </TooltippedButton>
    </DialogHeader>
  );
}
