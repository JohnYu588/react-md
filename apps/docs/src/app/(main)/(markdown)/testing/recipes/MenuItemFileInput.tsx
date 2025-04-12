import { type ReactElement } from "react";

import TestFrameworkCodeBlock from "../TestFrameworkCodeBlock.jsx";

const DEFAULT_CODE = `
import { describe, expect, it, {LOCAL} } from "{FRAMEWORK}";
import { DropdownMenu } from "@react-md/core/menu/DropdownMenu";
import { MenuItemFileInput } from "@react-md/core/menu/MenuItemFileInput";
import { rmdRender, screen, userEvent } from "@react-md/core/test-utils";
import { uploadMenuItemFileInput } from "@react-md/core/test-utils/jest-globals";

const handleChange = {LOCAL}.fn();

function Test() {
  return (
    <DropdownMenu buttonChildren="Dropdown Menu">
      <MenuItemFileInput
        onChange={(event) => {
          // do something
          handleUpload(event.currentTarget.files[0]);
        }}
      >
        Upload
      </MenuItemFileInput>
    </DropdownMenu>
  );
}

describe("Test", () => {
  it("should be able to trigger the change event", async () => {
    const user = userEvent.setup();
    rmdRender(<Test />);

    await user.click(screen.getByRole("button", { name: "Dropdown Menu" }));
    const menuItem = screen.getByRole("menuitem", { name: "Upload" });

    const file = new File(["example-content"], "README.md");
    await uploadMenuItemFileInput({
      user,
      menuItem,
      // this could also be a list of files if multiple files should be uploaded
      files: file,
    });

    // expect the files to be uploaded
    expect(handleChange).toHaveBeenCalledWith(file);
  });
});
`;

export default function MenuItemFileInput(): ReactElement {
  return (
    <TestFrameworkCodeBlock
      code={{
        jest: DEFAULT_CODE.replace(/{FRAMEWORK}/g, "@jest/globals").replace(
          /{LOCAL}/g,
          "jest"
        ),
        vitest: DEFAULT_CODE.replace(/{FRAMEWORK}/g, "vitest").replace(
          /{LOCAL}/g,
          "vi"
        ),
      }}
      lang="tsx"
    />
  );
}
