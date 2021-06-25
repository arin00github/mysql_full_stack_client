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
  const [smGeoData, setSmGeoData] = useState({
    data: undefined,
  });

  const width = 600;
  const height = 600;

  const canvas = d3
    .select("#canvas")
    .attr("width", width)
    .attr("height", height);

  const initialScale = 5500;
  const initialX = 200;
  const initialY = 400;

  // const projection = d3
  //   .geoMercator()
  //   .center([126, 35.5])
  //   .scale(initialScale)
  //   .translate([initialX, initialY]);

  const projection = d3.geoMercator().scale(1).translate([0, 0]);
  const path = d3.geoPath().projection(projection);
  const bounds = path.bounds(geoData.data);
  console.log("bounds", bounds);
  const widthScale = (bounds[1][0] - bounds[0][0]) / width;
  const heightScale = (bounds[1][1] - bounds[0][1]) / height;
  const scale = 1 / Math.max(widthScale, heightScale);
  const xoffset = width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10;
  const yoffset = height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 80;
  projection.scale(scale).translate([xoffset, yoffset]);
  console.log("scale", scale);
  console.log("xoffset", xoffset);
  console.log("yoffset", yoffset);

  const mapBox = document.getElementById("mapBox");

  //전국지도 데이터 지도 드로잉
  const drawMap = () => {
    const g = canvas.append("g");
    const map = g
      .selectAll("path")
      .data(geoData.data.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "province");

    map
      .attr("data-fips", (elem) => {
        return elem.properties.CTP_ENG_NM;
      })
      .on("click", (e) => {
        const name = e.target.getAttribute("data-fips");
        //console.log(name);
        const sending = { name: name };
        if (mapBox.hasChildNodes()) {
          while (mapBox.hasChildNodes()) {
            mapBox.removeChild(mapBox.firstChild);
            //계속해서 첫번째 노드를 삭제(첫번째 노드가 없을 때까지 삭제)
          }
          console.log("delete chart!");
        }
        downloadSvgSm(sending).then();
      });

    g.selectAll("text")
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

  function translateTolabel(d) {
    var arr = d3.geoPath().projection(projection).centroid(d);
    return "translate(" + arr + ")";
  }

  //새로운 데이터 들어올때마다 맵생성, 만약 기존에 맵이 있으면 삭제
  const drawSmMap = () => {
    const width2 = 800;
    const height2 = 600;
    const projection2 = d3.geoMercator().scale(1).translate([0, 0]);
    const path = d3.geoPath().projection(projection2);

    const bounds = path.bounds(smGeoData.data);
    const widthScale = (bounds[1][0] - bounds[0][0]) / width2;
    const heightScale = (bounds[1][1] - bounds[0][1]) / height2;
    const scale = 1 / Math.max(widthScale, heightScale);
    const xoffset =
      width / 2 - (scale * (bounds[1][0] + bounds[0][0])) / 2 + 10;
    const yoffset =
      height / 2 - (scale * (bounds[1][1] + bounds[0][1])) / 2 + 80;

    projection2.scale(scale).translate([xoffset, yoffset]);

    console.log("xoffset_inmap", xoffset);
    console.log("yoffset_inmap", yoffset);

    // zoom 기능 설정
    const zoom = d3
      .zoom()
      .scaleExtent([0.5, 4])
      .on("zoom", function (event) {
        console.log("zoom event", event);
        svg.attr("transform", event.transform);
      });
    const box = d3.select("#mapBox");
    // svg 형성하기
    const svg = box
      .append("svg")
      .attr("id", "chart")
      .attr("width", width2)
      .attr("height", height2);

    const g = svg.append("g").call(zoom);

    // svg path 형성하기
    g.selectAll("path")
      .data(smGeoData.data.features)
      .enter()
      .append("path")
      .attr("d", path);

    // text로 지역이름 붙여놓기
    g.selectAll("text")
      .data(smGeoData.data.features)
      .enter()
      .append("text")
      .attr("transform", translateTolabel2)
      .attr("class", "reg_name")
      .attr("text-anchor", "middle")
      .text((d) => {
        return d.properties.SIG_KOR_NM;
      });

    //센터 좌표값이 나옴.
    function translateTolabel2(d) {
      var arr = d3.geoPath().projection(projection2).centroid(d);
      return "translate(" + arr + ")";
    }

    d3.select("#zoom-center").on("click", function () {
      zoom.translateTo(svg, width2 / 2, height2 / 2);
    });

    d3.select("#zoom-out").on("click", function () {
      zoom.scaleBy(svg, 1 / 1.3);
    });

    d3.select("#zoom-in").on("click", function () {
      //zoom.scaleBy(svg.transition().duration(750), 1.3);
      zoom.scaleBy(svg, 1.3);
    });
  };

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

  //세부지도 데이터 다운로드
  const downloadSvgSm = async (item) => {
    const rlst = await CommonService.instance.downloadSmGeojson(
      item,
      bringToken.token
    );
    const convert = JSON.parse(rlst[0].geojson);
    //console.log("download", rlst[0]);
    //console.log("convert", convert);

    setSmGeoData({
      ...smGeoData,
      data: convert,
    });
  };

  useEffect(() => {
    if (smGeoData.data !== undefined) {
      if (mapBox.hasChildNodes()) {
        while (mapBox.hasChildNodes()) {
          mapBox.removeChild(mapBox.firstChild);
          //계속해서 첫번째 노드를 삭제(첫번째 노드가 없을 때까지 삭제)
        }
      }

      drawSmMap();
    }
  }, [smGeoData.data]);

  useEffect(() => {
    if (geoData.data !== undefined) {
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
        <div id="korea_map">
          <svg id="canvas"></svg>
        </div>
      </div>
      <div>
        <div>도시이름</div>
        <div className="box-line overflow-hidden" id="mapBox"></div>
        <div>
          <button className="btn btn-primary" id="zoom-center">
            center
          </button>
          <button className="btn btn-primary" id="zoom-out">
            zoom-out
          </button>
          <button className="btn btn-primary" id="zoom-in">
            zoom-in
          </button>
        </div>
      </div>
    </div>
  );
}
