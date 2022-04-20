import React, { useState, useEffect, useRef } from "react";
import "./mainPage.css";
import { useViewRegion } from "./MainPageReducer/ViewRegionContext.js";

//Build Contaner content
function Container(props) {
  const { containerIndex, children } = props;
  const [scrollPercent, setScrollPercent] = useState(0);
  const [{ oldFasionImages, viewRegion }] = useViewRegion();
  const container = useRef(null);

  //Listen scroll event of window.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [viewRegion, container, oldFasionImages]);

  //Calculate proportion of ViewRegion and current container.
  //view region is always 100vh.
  const handleScroll = () => {
    if (!!container?.current && !!viewRegion) {
      const containerRect = container.current.getBoundingClientRect();
      const selfRect = viewRegion.getBoundingClientRect();
      const top = containerRect.y + selfRect.height / 2;
      const bottom =
        containerRect.y + containerRect.height - selfRect.height / 2;
      const selfRectOriginalY = selfRect.y + selfRect.height / 2;
      const result = (selfRectOriginalY - top) / (bottom - top);
      setScrollPercent(result);
    }
  };

  return (
    <section
      ref={container}
      className={`container container-${containerIndex}`}
    >
      {children(scrollPercent)}
    </section>
  );
}
export default Container;
