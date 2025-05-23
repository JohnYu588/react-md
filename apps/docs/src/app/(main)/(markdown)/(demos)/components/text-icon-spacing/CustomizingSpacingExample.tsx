import { TextIconSpacing } from "@react-md/core/icon/TextIconSpacing";
import { Typography } from "@react-md/core/typography/Typography";
import FavoriteIcon from "@react-md/material-icons/FavoriteIcon";
import { type ReactElement } from "react";

import styles from "./CustomizingSpacingExample.module.scss";

export default function CustomizingSpacingExample(): ReactElement {
  return (
    <div className={styles.container}>
      <TextIconSpacing icon={<FavoriteIcon />}>
        <Typography margin="none">Text to display</Typography>
      </TextIconSpacing>
    </div>
  );
}
