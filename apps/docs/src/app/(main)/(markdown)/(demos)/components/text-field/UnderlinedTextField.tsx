import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { TextField } from "@react-md/core/form/TextField";
import { type ReactElement } from "react";

export default function UnderlinedTextField(): ReactElement {
  return (
    <Form className={box({ stacked: true, align: "stretch" })}>
      <TextField
        aria-label="Label"
        placeholder="Placeholder-only"
        theme="underline"
      />
      <TextField label="Label" placeholder="Placeholder" theme="underline" />
      <TextField
        label="Label"
        placeholder="Placeholder"
        theme="underline"
        underlineDirection="center"
      />
      <TextField
        label="Label"
        placeholder="Placeholder"
        theme="underline"
        underlineDirection="right"
      />
    </Form>
  );
}
