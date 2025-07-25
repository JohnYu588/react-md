"use client";

import { Autocomplete } from "@react-md/core/autocomplete/Autocomplete";
import { AutocompleteChip } from "@react-md/core/autocomplete/AutocompleteChip";
import { Box } from "@react-md/core/box/Box";
import { type ReactElement, useState } from "react";

import { type Dessert, desserts } from "@/constants/desserts.js";

export default function DisableInlineChipsExample(): ReactElement {
  const [value, setValue] = useState<readonly Dessert[]>([
    desserts[1],
    desserts[2],
  ]);

  return (
    <>
      <Box
        role="status"
        aria-live="polite"
        aria-label="Selected Desserts"
        align="start"
        fullWidth
        disablePadding
      >
        {value.map((dessert) => (
          <AutocompleteChip
            key={dessert.name}
            theme="outline"
            onClick={() => {
              setValue((prevValue) => prevValue.filter((d) => d !== dessert));
            }}
          >
            {dessert.name}
          </AutocompleteChip>
        ))}
      </Box>
      <Autocomplete
        label="Dessert"
        placeholder="Ice cream"
        value={value}
        setValue={setValue}
        listboxLabel="Desserts"
        options={desserts}
        disableInlineChips
      />
    </>
  );
}
