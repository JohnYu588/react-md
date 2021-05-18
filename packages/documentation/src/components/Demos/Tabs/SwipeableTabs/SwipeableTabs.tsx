import React, { ReactElement } from "react";
import { TabPanels, Tabs, TabsManager } from "@react-md/tabs";

import SwipeablePanel from "./SwipeablePanel";
import useSwipeableIndexes from "./useSwipeableIndexes";

const tabs = ["Tab One", "Tab Two", "Tab Three", "Tab Four"];

export default function SwipeableTabs(): ReactElement {
  const { activeIndex, distance, handlers, swiping, onActiveIndexChange } =
    useSwipeableIndexes(tabs.length - 1);

  return (
    <TabsManager
      tabs={tabs}
      tabsId="swipeable-tabs"
      activeIndex={activeIndex}
      onActiveIndexChange={onActiveIndexChange}
    >
      <Tabs />
      <TabPanels persistent {...handlers} disableTransition={swiping}>
        {tabs.map((_, i) => (
          <SwipeablePanel
            key={i}
            index={i}
            distance={distance}
            activeIndex={activeIndex}
            swiping={swiping}
          />
        ))}
      </TabPanels>
    </TabsManager>
  );
}
