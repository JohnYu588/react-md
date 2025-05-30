import { type Metadata } from "next";

import { BASE_URL } from "./env.js";

export const DEFAULT_TITLE =
  "An accessible React component library styled with Sass/SCSS";

const title = `react-md: ${DEFAULT_TITLE}`;
const description = `${DEFAULT_TITLE} built to the the foundation for web applications. The default styles are based on material design.`;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title,
  description,
  keywords: [
    "react",
    "component",
    "library",
    "Sass",
    "SCSS",
    "material design",
  ],
  openGraph: {
    type: "website",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};
