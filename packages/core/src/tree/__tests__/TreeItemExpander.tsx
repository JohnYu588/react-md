import { describe, expect, it, jest } from "@jest/globals";

import { fireEvent, render } from "../../test-utils/index.js";
import { TreeItemExpander } from "../TreeItemExpander.js";
import { TreeProvider } from "../TreeProvider.js";

describe("TreeItemExpander", () => {
  it("should throw an error if not wrapped in a TreeProvider", () => {
    const error = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() =>
      render(
        <TreeItemExpander
          itemId="item-1-id"
          addon={null}
          disabled={false}
          expanded={false}
          isLeafNode={false}
        />
      )
    ).toThrow("Cannot find a parent Tree component");

    error.mockRestore();
  });

  it("should force wrapping the icon in a span and move the click props to the span if the icon is not cloneable", () => {
    const toggleTreeItemExpansion = jest.fn();
    const { container } = render(
      <TreeProvider
        temporaryChildItems={false}
        data={{}}
        linkComponent="a"
        disableTransition={false}
        expandedIds={new Set()}
        expanderIcon="icon"
        expanderLeft={false}
        expandMultipleTreeItems={jest.fn()}
        expansionMode="manual"
        metadataLookup={{
          current: {
            disabledItems: {},
            elementToItem: {},
            expandable: {},
            itemToElement: {},
          },
        }}
        rootId={null}
        selectedIds={new Set()}
        selectMultipleTreeItems={jest.fn()}
        toggleTreeItemExpansion={toggleTreeItemExpansion}
        toggleTreeItemSelection={jest.fn()}
        multiSelect={false}
      >
        <TreeItemExpander
          data-testid="icon"
          itemId="item-1-id"
          addon={null}
          disabled={false}
          expanded={false}
          isLeafNode={false}
        />
      </TreeProvider>
    );

    const iconWrapper = container.firstElementChild;
    if (!iconWrapper) {
      throw new Error();
    }
    expect(iconWrapper).toBeInstanceOf(HTMLSpanElement);
    expect(container).toMatchSnapshot();

    fireEvent.click(iconWrapper);
    expect(toggleTreeItemExpansion).toHaveBeenCalledWith("item-1-id");
  });
});
