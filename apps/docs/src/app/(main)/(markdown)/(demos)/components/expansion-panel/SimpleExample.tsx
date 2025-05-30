"use client";

import { ExpansionPanel } from "@react-md/core/expansion-panel/ExpansionPanel";
import { useToggle } from "@react-md/core/useToggle";
import { type ReactElement } from "react";

export default function SimpleExample(): ReactElement {
  const { toggled, toggle } = useToggle(true);

  return (
    <ExpansionPanel
      expanded={toggled}
      onExpandClick={toggle}
      headerChildren="Panel 1"
    >
      Contents
    </ExpansionPanel>
  );
}
