import { ReactElement } from "react";
import { Divider } from "@react-md/divider";
import { TextContainer, Text } from "@react-md/typography";
import {
  MobileOnly,
  PhoneOnly,
  TabletOnly,
  DesktopOnly,
} from "@react-md/utils";

import styles from "./MediaQueryComponents.module.scss";

export default function MediaQueryComponents(): ReactElement {
  return (
    <>
      <TextContainer>
        <MobileOnly>
          <Text>This will only appear on phone and tablet screen sizes.</Text>
        </MobileOnly>
        <PhoneOnly>
          <Text>This will only appear on phone screen sizes.</Text>
        </PhoneOnly>
        <TabletOnly>
          <Text>This will only appear on tablet screen sizes.</Text>
        </TabletOnly>
        <DesktopOnly>
          <Text>This will only appear on desktop screen sizes.</Text>
        </DesktopOnly>
      </TextContainer>
      <Divider />
      <div className={styles.container}>
        <Text margin="none">
          This section will gain different styles as the viewport increases. I
          highly recommend opening the dev tools and seeing how the different
          styles get applied and when some are completely removed to get a
          better undertanding of the media queries.
        </Text>
      </div>
    </>
  );
}
