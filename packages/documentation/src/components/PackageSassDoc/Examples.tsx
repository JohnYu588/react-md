import React, { ReactElement } from "react";
import { Text } from "@react-md/typography";

import { CompiledExample } from "utils/sassdoc";

import Example from "./Example";

export interface ExamplesProps {
  baseId: string;
  examples: CompiledExample[] | undefined;
}

export default function Examples({
  baseId,
  examples,
}: ExamplesProps): ReactElement | null {
  if (!examples) {
    return null;
  }

  return (
    <>
      <Text type="headline-4" margin="top">
        Examples
      </Text>
      {examples.map((example, i) => (
        <Example
          key={`${example.type}-${example.description}`}
          {...example}
          id={`${baseId}-example-${i + 1}-compiled`}
        />
      ))}
    </>
  );
}
