import { RangeSlider, Slider, useRangeSlider, useSlider } from "@react-md/form";
import { useId } from "components/IdProvider";
import React, { ReactElement } from "react";
import SlidersContainer from "./SlidersContainer";

export default function DiscreteSliders(): ReactElement | null {
  const [, controls1] = useSlider();
  const [, controls2] = useRangeSlider();
  const [, controls3] = useSlider();
  const [, controls4] = useRangeSlider();
  return (
    <>
      <SlidersContainer>
        <Slider baseId={useId()} {...controls1} label="Horizontal" discrete />
        <RangeSlider
          baseId={useId()}
          {...controls2}
          label="Horizontal"
          thumb1Label="Min"
          thumb2Label="Max"
          discrete
        />
      </SlidersContainer>
      <SlidersContainer vertical>
        <Slider
          baseId={useId()}
          {...controls3}
          label="Vertical"
          discrete
          vertical
        />
        <RangeSlider
          baseId={useId()}
          {...controls4}
          label="Vertical"
          thumb1Label="Min"
          thumb2Label="Max"
          discrete
          vertical
        />
      </SlidersContainer>
    </>
  );
}
