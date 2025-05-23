import { Box } from "@react-md/core/box/Box";
import { Switch } from "@react-md/core/form/Switch";
import { CircularProgress } from "@react-md/core/progress/CircularProgress";
import { type ReactElement, useState } from "react";

export default function CircularProgressTheme(): ReactElement {
  const [checked, setChecked] = useState(false);
  const value = checked ? undefined : 30;
  return (
    <>
      <CircularProgress aria-label="Example" value={value} theme="primary" />
      <CircularProgress aria-label="Example" value={value} theme="secondary" />
      <CircularProgress aria-label="Example" value={value} theme="warning" />
      <CircularProgress aria-label="Example" value={value} theme="success" />
      <CircularProgress aria-label="Example" value={value} theme="error" />
      <CircularProgress
        aria-label="Example"
        value={checked ? undefined : 30}
        theme="current-color"
      />
      <Box disablePadding fullWidth>
        <Switch
          label="Run"
          checked={checked}
          onChange={(event) => {
            setChecked(event.currentTarget.checked);
          }}
        />
      </Box>
    </>
  );
}
