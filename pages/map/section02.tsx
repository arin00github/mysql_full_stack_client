import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart02 from "./mapChart02";

export default function Section02() {
  const [content, setContent] = useState("");
  const setTooltipContent = (value: string) => {
    setContent(value);
  };
  return (
    <div className="map">
      <MapChart02 setTooltipContent={setTooltipContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}
