import * as d3 from "d3";
import { useEffect } from "react";
import koreaMap from "../../src/data/korea_map.json";
import koreainfo from "../../src/data/korea_info.json";

export default function Map01() {
  const width = 800;
  const height = 600;

  const canvas = d3
    .select("#canvas")
    .attr("width", width)
    .attr("height", height);

  console.log("canvas", canvas);

  const initialScale = 5500;
  const initialX = -11900;
  const initialY = 4050;

  const projection = d3
    .geoMercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

  const drawMap = async () => {
    canvas
      .selectAll("path")
      .data(koreaMap.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath().projection(projection))
      .attr("class", "province");

    canvas
      .selectAll("text")
      .data(koreaMap.features)
      .enter()
      .append("text")
      .attr("transform", translateTolabel)
      .attr("class", "reg_name")
      .attr("text-anchor", "middle")
      .text((d) => {
        return d.properties.CTP_ENG_NM;
      });
  };

  function translateTolabel(d) {
    var arr = d3.geoPath().projection(projection).centroid(d);
    return "translate(" + arr + ")";
  }

  useEffect(() => {
    setTimeout(() => {
      drawMap();
    }, 2000);

    // console.log(koreaMap.features);
    // return () => {
    //   clearTimeout(result);
    // };
  }, []);

  return (
    <div id="korea_map">
      <svg id="canvas"></svg>
    </div>
  );
}
