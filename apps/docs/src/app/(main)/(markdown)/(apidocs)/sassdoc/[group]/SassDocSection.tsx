import { type ReactElement } from "react";
import { type FormattedSassDocItem } from "sassdoc-generator/types";

import { LinkableHeading } from "@/components/LinkableHeading.jsx";
import { slug } from "@/utils/slug.js";

import { SassDocItem } from "./SassDocItem.jsx";

export interface SassDocSectionProps {
  items: ReadonlyMap<string, FormattedSassDocItem>;
  children: string;
}

export function SassDocSection({
  items,
  children,
}: SassDocSectionProps): ReactElement | null {
  if (!items.size) {
    return null;
  }

  const baseId = slug(children);
  return (
    <>
      <LinkableHeading id={baseId} level={1}>
        {children}
      </LinkableHeading>
      {[...items.values()].map((item) => (
        <SassDocItem key={item.name} baseId={baseId} item={item} />
      ))}
    </>
  );
}
