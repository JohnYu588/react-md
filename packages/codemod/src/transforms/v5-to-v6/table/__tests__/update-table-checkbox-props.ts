import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-table-checkbox-props", null, fixture, {
    parser: "tsx",
  });
};

test("TableCheckbox");
