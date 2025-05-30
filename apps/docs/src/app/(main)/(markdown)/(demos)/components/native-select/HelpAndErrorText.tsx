import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { NativeSelect } from "@react-md/core/form/NativeSelect";
import { type ReactElement } from "react";

export default function HelpAndErrorText(): ReactElement {
  return (
    <Form
      className={box({
        stacked: true,
        disablePadding: true,
      })}
    >
      <NativeSelect
        label="Label"
        messageProps={{
          children: "This is some help text.",
        }}
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <NativeSelect
        label="Label"
        error
        messageProps={{
          children: "This field has an error!",
        }}
      >
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
    </Form>
  );
}
