import * as d3 from "d3";
import { useEffect } from "react";
import koreaMap from "../../src/data/korea_map.json";
import koreainfo from "../../src/data/korea_info.json";
import { CommonService } from "../api/services/common-service";
import { useSelector } from "react-redux";
import { IAuthInfo } from "../../src/interface/auth-interface";
import { useState } from "react";

export default function Map01() {
  const bringToken = useSelector((state: { auth: IAuthInfo }) => state.auth);

  const [geoData, setGeoData] = useState({
    data: undefined,
  });

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

  const drawMap = () => {
    canvas
      .selectAll("path")
      .data(geoData.data.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath().projection(projection))
      .attr("class", "province");

    canvas
      .selectAll("text")
      .data(geoData.data.features)
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

  const downloadSvg = async () => {
    const rlst = await CommonService.instance.downloadGeojsonFile(
      bringToken.token
    );

    const convert = JSON.parse(rlst[0].geojson);
    console.log("download", rlst[0]);
    console.log("convert", convert);

    setGeoData({
      ...geoData,
      data: convert,
    });
  };

  useEffect(() => {
    if (geoData.data !== undefined) {
      console.log("check data");
      drawMap();
    }
  }, [geoData.data]);

  useEffect(() => {
    downloadSvg();

    return () => {
      downloadSvg();
    };
  }, []);

  return (
    <div id="korea_map">
      <svg id="canvas"></svg>
    </div>
  );
}
