import { Badge } from "@react-md/core/badge/Badge";
import { Button } from "@react-md/core/button/Button";
import { type ReactElement } from "react";

import styles from "./BadgePositionExample.module.scss";

export default function BadgePositionExample(): ReactElement {
  return (
    <>
      <Button className={styles.offset} themeType="outline">
        <Badge>99+</Badge>
        Offset
      </Button>
      <Button className={styles.offsetTop} themeType="outline">
        <Badge>99+</Badge>
        Offset Top
      </Button>
      <Button className={styles.offsetRight} themeType="outline">
        <Badge>99+</Badge>
        Offset Right
      </Button>
    </>
  );
}
