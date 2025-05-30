import { defineTest } from "../../../../test-utils.js";

const test = (fixture: string): void => {
  defineTest(import.meta.url, "update-tree-props", null, fixture, {
    parser: "tsx",
  });
};

test("SimpleTreeProps");
test("TreeItemRenderProps");
