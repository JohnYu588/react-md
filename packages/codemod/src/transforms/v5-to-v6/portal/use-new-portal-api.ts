import {
  type API,
  type FileInfo,
  type JSXAttribute,
  type JSXSpreadAttribute,
  type Options,
} from "jscodeshift";

import { addFileComments } from "../../utils/addFileComment.js";
import { addImportSpecifier } from "../../utils/addImportSpecifier.js";
import { getPropName } from "../../utils/getPropName.js";
import { isPropEnabled } from "../../utils/isPropEnabled.js";
import { removeEmptyImportDeclaration } from "../../utils/removeEmptyImportDeclaration.js";
import { renameIdentifier } from "../../utils/renameIdentifier.js";
import { traverseImportSpecifiers } from "../../utils/traverseImportSpecifiers.js";

const PORTAL_INTO_COMMENT =
  "TODO: The `PortalContainer` replaced the `PortalInto` type but does not support functions. Double check the usage before removing this line.";
const PORTAL_SPREAD_COMMENT =
  "TODO: Check if this is using the `into`, `intoId` since they are no longer supported.";

export default function transformer(
  file: FileInfo,
  api: API,
  options: Options
): string {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions;

  const comments = new Set<string>();

  traverseImportSpecifiers({
    j,
    root,
    name: "PortalInto",
    replace: "PortalContainer",
  }).forEach((name) => {
    comments.add(PORTAL_INTO_COMMENT);

    renameIdentifier({
      j,
      root,
      from: name,
      to: "PortalContainer",
    });
  });

  let portalName = "";
  traverseImportSpecifiers({
    j,
    root,
    name: "Portal",
  }).forEach((name) => {
    portalName = name;
    root
      .find(j.JSXOpeningElement, { name: { name } })
      .forEach((jsxOpeningElement) => {
        const attributes: (JSXAttribute | JSXSpreadAttribute)[] = [];
        jsxOpeningElement.node.attributes?.forEach((attr) => {
          if (attr.type === "JSXSpreadAttribute") {
            attributes.push({
              ...attr,
              comments: [
                ...(attr.comments ?? []),
                j.commentLine(PORTAL_SPREAD_COMMENT),
              ],
            });
          } else {
            const name = getPropName(attr);
            if (["into", "intoId"].includes(name)) {
              comments.add(
                `TODO: Check how the Portal prop \`${name}\` was used since it is no longer supported.`
              );
            } else if (["disabled", "children"].includes(name)) {
              attributes.push(attr);
            }
          }
        });

        jsxOpeningElement.node.attributes = attributes;
      });
  });
  traverseImportSpecifiers({
    j,
    root,
    name: "ConditionalPortal",
    remove: !portalName,
    replace: portalName || undefined,
  }).forEach((name) => {
    if (!portalName) {
      addImportSpecifier({
        j,
        root,
        name: "Portal",
      });
    }

    root.findJSXElements(name).forEach((jsxElement) => {
      j(jsxElement)
        .find(j.JSXOpeningElement, { name: { name } })
        .forEach((jsxOpeningElement) => {
          const attrs = jsxOpeningElement.node.attributes;
          const isSinglePortalProp =
            attrs?.length === 1 && getPropName(attrs[0]) === "portal";
          const portalPropValue =
            isSinglePortalProp &&
            attrs[0].type === "JSXAttribute" &&
            isPropEnabled(attrs[0]);

          if (!attrs?.length || isSinglePortalProp) {
            const props: JSXAttribute[] = [];
            if (!portalPropValue) {
              props.push(
                j.jsxAttribute(
                  {
                    name: "disabled",
                    type: "JSXIdentifier",
                  },
                  null
                )
              );
            }
            j(jsxElement).replaceWith(
              j.jsxElement(
                j.jsxOpeningElement(
                  {
                    name: portalName || "Portal",
                    type: "JSXIdentifier",
                    comments: jsxElement.node.comments || null,
                  },
                  props
                ),
                j.jsxClosingElement({
                  name: portalName || "Portal",
                  type: "JSXIdentifier",
                }),
                jsxElement.node.children
              )
            );
          }
        });
    });
  });

  removeEmptyImportDeclaration({
    j,
    root,
  });

  addFileComments({
    j,
    root,
    comments,
  });

  return root.toSource(printOptions);
}
