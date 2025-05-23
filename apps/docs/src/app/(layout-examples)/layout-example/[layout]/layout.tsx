import { type Metadata } from "next";
import { notFound } from "next/navigation.js";
import { type ComponentType, type ReactElement, type ReactNode } from "react";

import { pascalCase } from "@/utils/strings.js";

import { ExpandableLayoutExample } from "./ExpandableLayoutExample.jsx";
import { FullHeightExpandableLayoutExample } from "./FullHeightExpandableLayoutExample.jsx";
import { FullHeightLayoutExample } from "./FullHeightLayoutExample.jsx";
import { FullHeightResizableLayoutExample } from "./FullHeightResizableLayoutExample.jsx";
import { ResizableLayoutExample } from "./ResizableLayoutExample.jsx";
import { TemporaryLayoutExample } from "./TemporaryLayoutExample.jsx";
import {
  type ExampleLayoutProps,
  LAYOUT_TYPES,
  type LayoutType,
} from "./layouts.js";

const LAYOUTS = {
  temporary: TemporaryLayoutExample,
  expandable: ExpandableLayoutExample,
  "full-height": FullHeightLayoutExample,
  "full-height-expandable": FullHeightExpandableLayoutExample,
  resizable: ResizableLayoutExample,
  "full-height-resizable": FullHeightResizableLayoutExample,
} satisfies Record<LayoutType, ComponentType<ExampleLayoutProps>>;

export interface RouteParams {
  params: { layout: LayoutType };
}

export interface RootLayoutProps extends RouteParams {
  children: ReactNode;
}

export default function RootLayout(props: RootLayoutProps): ReactElement {
  const { children, params } = props;
  const { layout } = params;
  const Layout = LAYOUTS[layout];
  if (!Layout) {
    notFound();
  }

  return <Layout layout={layout}>{children}</Layout>;
}

export async function generateStaticParams(): Promise<{ layout: string }[]> {
  return LAYOUT_TYPES.map((layout) => ({ layout }));
}

export async function generateMetadata({
  params,
}: RouteParams): Promise<Metadata> {
  const { layout } = params;

  return {
    title: `react-md: ${pascalCase(layout, " ")} Layout Example`,
    description: `An example ${layout} layout for react-md.`,
  };
}
