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
  let minZoom, maxZoom, center;

  const canvasW = 900;
  const canvasH = 800;

  let divBox, svgBox;
  const width = 900;
  const height = 800;

  const zoom = d3.zoom().on("zoom", zoomed);

  const svg = d3
    .select("#canvas")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

  const projection = d3.geoMercator().scale(1).translate([0, 0]);
  const path = d3.geoPath().projection(projection);
  const bounds = path.bounds(geoData.data);
  //console.log("bounds", bounds);
  const widthScale = (bounds[1][0] - bounds[0][0]) / width;
  const heightScale = (bounds[1][1] - bounds[0][1]) / height;
  const scale = 1 / Math.max(widthScale, heightScale);
  const xoffset = width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2;
  const yoffset = height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2;

  projection.scale(scale).translate([xoffset, yoffset]);

  const wrap = svg.append("g").attr("id", "wrap-map");
  //전국지도 데이터 지도 드로잉
  const drawMap = () => {
    center = {
      minZoom: Math.max(divBox.width / canvasW, divBox.height / canvasH),
      midX: (divBox.width - minZoom * canvasW) / 2,
      midY: (divBox.height - minZoom * canvasH) / 2,
    };

    wrap
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", canvasW)
      .attr("height", canvasH)
      .attr("fill", "white");

    const unit = wrap
      .selectAll("path")
      .data(geoData.data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "province");

    unit
      .attr("data-fips", (elem) => {
        return elem.properties.CTP_ENG_NM;
      })
      .on("click", (e) => {
        const name = e.target.getAttribute("data-fips");
        const target = geoData.data.features.filter((item) => {
          return name === item.properties.CTP_ENG_NM;
        });
        //console.log(target[0]);

        boxZoom(path.bounds(target[0]));
      });

    wrap
      .selectAll("text")
      .data(geoData.data.features)
      .enter()
      .append("text")
      .attr("transform", translateTolabel)
      .attr("text-anchor", "middle")
      .attr("class", "reg_name")
      .text((d) => {
        return d.properties.CTP_KOR_NM;
      });
  };

  function initZoom() {
    let minZoom = Math.max(divBox.width / canvasW, divBox.height / canvasH);
    const maxZoom = 5 * minZoom;

    const midX = (divBox.width - minZoom * canvasW) / 2;
    const midY = (divBox.height - minZoom * canvasH) / 2;

    zoom.scaleExtent([minZoom, maxZoom]).translateExtent([
      [0, 0],
      [canvasW, canvasH],
    ]);

    svg.call(
      zoom.transform,
      d3.zoomIdentity.translate(midX, midY).scale(minZoom)
    );
  }

  function zoomed(event) {
    let t = event.transform;
    wrap.attr("transform", "translate(" + [t.x, t.y] + ")scale(" + t.k + ")");
  }

  function boxZoom(box) {
    const [[x0, y0], [x1, y1]] = box;
    console.log("box", box);

    console.log("variable", Math.max((x1 - x0) / width));
    console.log("variable", -(x0 + x1) / 2);
    console.log("variable", -(y0 + y1) / 2);

    svg
      .transition()
      .duration(750)
      .call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(
            Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height))
          )
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
      );
  }

  function translateTolabel(d) {
    var arr = d3.geoPath().projection(projection).centroid(d);
    return "translate(" + arr + ")";
  }

  //새로운 데이터 들어올때마다 맵생성, 만약 기존에 맵이 있으면 삭제

  //전국지도 데이터 다운로드
  const downloadSvg = async () => {
    const rlst = await CommonService.instance.downloadGeojsonFile(
      bringToken.token
    );
    const convert = JSON.parse(rlst[0].geojson);

    setGeoData({
      ...geoData,
      data: convert,
    });
  };

  useEffect(() => {
    if (geoData.data !== undefined) {
      divBox = document.getElementById("korea_map").getBoundingClientRect();
      svgBox = document.getElementById("canvas").getBoundingClientRect();
      initZoom();
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
    <div className="d-flex flex-column">
      <div>
        <h3>전국지도</h3>
        <div id="korea_map" style={{ width: "900px", height: "800px" }}>
          <svg id="canvas"></svg>
        </div>
      </div>
      <div></div>
    </div>
  );
}
