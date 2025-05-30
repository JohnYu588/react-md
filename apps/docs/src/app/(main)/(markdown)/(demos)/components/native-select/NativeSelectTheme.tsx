import { box } from "@react-md/core/box/styles";
import { Form } from "@react-md/core/form/Form";
import { NativeSelect } from "@react-md/core/form/NativeSelect";
import { type ReactElement } from "react";

export default function NativeSelectTheme(): ReactElement {
  return (
    <Form
      className={box({
        justify: "stretch",
        disablePadding: true,
        fullWidth: true,
      })}
    >
      <NativeSelect label="Label" theme="none">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <NativeSelect label="Label" theme="underline">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <NativeSelect label="Label" theme="filled">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
      <NativeSelect label="Label" theme="outline">
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
        <option>Option 4</option>
      </NativeSelect>
    </Form>
  );
}
