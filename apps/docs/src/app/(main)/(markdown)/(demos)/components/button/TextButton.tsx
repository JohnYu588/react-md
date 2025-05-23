import { Button } from "@react-md/core/button/Button";
import { type ReactElement } from "react";

export default function TextButton(): ReactElement {
  return (
    <>
      <Button>Clear</Button>
      <Button theme="primary">Primary</Button>
      <Button theme="secondary">Secondary</Button>
    </>
  );
}
