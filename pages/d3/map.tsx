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

  const width = 800;
  const height = 600;

  const canvas = d3
    .select("#canvas")
    .attr("width", width)
    .attr("height", height);

  //console.log("canvas", canvas);

  const initialScale = 5500;
  const initialX = -11900;
  const initialY = 4050;

  const projection = d3
    .geoMercator()
    .scale(initialScale)
    .translate([initialX, initialY]);

  const mapBox = document.getElementById("mapBox");
  const chart = document.getElementById("chart");
  //전국지도 데이터 지도 드로잉
  const drawMap = () => {
    const map = canvas
      .selectAll("path")
      .data(geoData.data.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath().projection(projection))
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

  //새로운 데이터 들어올때마다 맵생성, 만약 기존에 맵이 있으면 삭제
  const drawSmMap = () => {
    const width2 = 800;
    const height2 = 600;
    const projection2 = d3
      .geoMercator()
      .center(smGeoData.data.geoinfo.center)
      .scale(smGeoData.data.geoinfo.scale)
      .translate([width2 / 2, height2 / 2]);

    const box = d3.select("#mapBox");
    console.log("create map!");
    //const element = d3.create('svg').attr('id','chart').attr("width", width).attr("height", height)
    const map = box
      .append("svg")
      .attr("id", "chart")
      .attr("width", width2)
      .attr("height", height2);
    map
      .selectAll("path")
      .data(smGeoData.data.features)
      .enter()
      .append("path")
      .attr("d", d3.geoPath().projection(projection2));

    //newDrawSmMap(smGeoData.data.features)
  };

  function translateTolabel(d) {
    var arr = d3.geoPath().projection(projection).centroid(d);
    return "translate(" + arr + ")";
  }

  //전국지도 데이터 다운로드
  const downloadSvg = async () => {
    const rlst = await CommonService.instance.downloadGeojsonFile(
      bringToken.token
    );

    const convert = JSON.parse(rlst[0].geojson);
    //console.log("download", rlst[0]);
    console.log("convert", convert);

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
    console.log("rlst_download", rlst);

    const convert = JSON.parse(rlst[0].geojson);
    console.log("download", rlst[0]);
    console.log("convert", convert);

    setSmGeoData({
      ...smGeoData,
      data: convert,
    });
  };
  console.log("smGeoData", smGeoData);

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
    <div>
      <div id="korea_map">
        <svg id="canvas"></svg>
      </div>
      <div id="mapBox"></div>
    </div>
  );
}
