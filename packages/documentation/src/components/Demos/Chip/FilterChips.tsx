import React, { ReactElement, useState } from "react";
import { Chip } from "@react-md/chip";
import { Text } from "@react-md/typography";

import styles from "./FilterChips.module.scss";

const amenities = [
  "Elevator",
  "Washer / Dryer",
  "Fireplace",
  "Wheelchair Access",
  "Dogs ok",
  "Cats ok",
];

export default function FilterChips(): ReactElement {
  const [selectedAmenities, setSelected] = useState<string[]>([]);
  return (
    <>
      <Text type="headline-5" className={styles.header}>
        Choose amenities
      </Text>
      <div className={styles.container}>
        {amenities.map((amenity) => {
          const selected = selectedAmenities.includes(amenity);

          return (
            <Chip
              key={amenity}
              selected={selected}
              className={styles.chip}
              onClick={() =>
                setSelected((prevSelected) => {
                  if (prevSelected.includes(amenity)) {
                    return prevSelected.filter((am) => am !== amenity);
                  }

                  return [...prevSelected, amenity];
                })
              }
            >
              {amenity}
            </Chip>
          );
        })}
      </div>
    </>
  );
}
