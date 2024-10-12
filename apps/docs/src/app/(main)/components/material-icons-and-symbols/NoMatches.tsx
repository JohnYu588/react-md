import { RandomEmoji } from "@/components/RandomEmoji.jsx";
import { Button } from "@react-md/core/button/Button";
import { Typography } from "@react-md/core/typography/Typography";
import type { ReactElement } from "react";
import { useMaterialIconsAndSymbols } from "./MaterialIconsAndSymbolsProvider.jsx";

export function NoMatches(): ReactElement {
  const { search, resetFilters } = useMaterialIconsAndSymbols();
  return (
    <div>
      <RandomEmoji />
      <Typography type="headline-5">
        {`No icons found for '${search}'`}
      </Typography>
      <Button
        themeType="outline"
        onClick={() => {
          resetFilters();
        }}
      >
        Clear your filters and try again
      </Button>
    </div>
  );
}
