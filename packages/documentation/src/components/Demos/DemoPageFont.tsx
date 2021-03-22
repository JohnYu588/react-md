import React, { ReactElement } from "react";
import Head from "next/head";

import GoogleFont from "components/GoogleFont";

export interface DemoPageFontProps {
  font: string;
}

export default function DemoPageFont({
  font,
}: DemoPageFontProps): ReactElement {
  if (font === "Font Awesome") {
    return (
      <Head>
        <link
          key="font-awesome"
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css"
        />
      </Head>
    );
  }

  return <GoogleFont font={font} />;
}
