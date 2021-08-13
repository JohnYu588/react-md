import React, { ReactElement } from "react";
import { GridCell } from "@react-md/utils";

import { Markdown } from "components/Markdown";
import {
  ColorAccent,
  PrimaryColor,
  SecondaryColor,
  ThemeMode,
} from "components/Theme";

export interface ThemeUsageProps {
  primary: PrimaryColor;
  secondary: SecondaryColor;
  accent: ColorAccent;
  theme: ThemeMode;
}

const DARK_OVERRIDE = `
$rmd-theme-light: false;`;

const toCSSName = (name: string): string => name.replace("-", "_");

export default function ThemeUsage({
  primary,
  secondary,
  accent,
  theme,
}: ThemeUsageProps): ReactElement {
  const cssName = `dist/css/react-md.${toCSSName(primary)}-${toCSSName(
    secondary
  )}-${accent}-${theme}.min.css`;
  return (
    <GridCell desktop={{ colSpan: 2 }}>
      <Markdown>
        {`##### SCSS Usage<!-- no-margin-bottom -->

\`\`\`scss
@import '@react-md/theme/dist/color-palette';
${theme === "light" ? "" : DARK_OVERRIDE}
$rmd-theme-primary: $rmd-${primary}-500;
$rmd-theme-secondary: $rmd-${secondary}-a-${accent};
// other variable overrides

@import '~react-md/dist/react-md';
@include react-md-utils;
\`\`\`

##### CDN Usage ([jsDelivr](https://www.jsdelivr.com/))<!-- no-margin-bottom -->

\`\`\`diff
     <meta
       name="description"
       content="Web site created using create-react-app"
     />
     <link rel="apple-touch-icon" href="logo192.png" />
     <!--
       manifest.json provides metadata used when your web app is installed on a
       user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
     -->
     <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
+    <link
+      crossorigin
+      rel="stylesheet"
+      href="https://cdn.jsdelivr.net/gh/mlaursen/react-md@{{RMD_VERSION}}/${cssName}"
+    />
\`\`\`
        `}
      </Markdown>
    </GridCell>
  );
}
