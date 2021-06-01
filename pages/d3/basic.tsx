import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import { geoNaturalEarth1, geoPath } from "d3";
import { useStore } from "react-redux";

export interface IProps {
  dataArray: any;
}

export interface ICountyProps {
  fips: number;
  state: string;
  area_name: string;
  bachelorsOrHigher: number;
}

export default function BasicD3() {
  const [countyArray, setCountyArray] = useState({
    dataArray: [],
  });
  const [infoArray, setInfoArray] = useState({
    dataArray2: [],
  });
  const [countyUnit, setCountyUnit] = useState<ICountyProps>({
    fips: 0,
    state: "",
    area_name: "",
    bachelorsOrHigher: 0,
  });

  const width = 900;
  const height = 500;
  const projection = geoNaturalEarth1();
  const pathGenerator = geoPath().projection(projection);

  const drawMap = (target) => {
    const canvas = d3
      .select(target)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const g = canvas.append("g");

    const tooltip = d3
      .select("#tooltip")
      .append("div")
      .attr("class", "tooltip")
      .style("padding", "8px")
      .style("opacity", 1)
      .style("background", "white")
      .style("border-radius", "4px");

    canvas.call(
      d3.zoom().on("zoom", ({ transform }) => {
        g.attr("transform", transform);
      })
    );

    g.selectAll("path")
      .data(countyArray.dataArray)
      .enter()
      .append("path")
      .attr("d", geoPath())
      .attr("class", "county")
      .attr("fill", "#e0a2a2")
      .attr("data-fips", (countyItem) => {
        return countyItem["id"];
      })
      .attr("data-education", (countyItem) => {
        let id = countyItem["id"];
        let county = infoArray.dataArray2.find((item) => {
          return item["fips"] === id;
        });

        let percentage = county["bachelorsOrHigher"];
        return percentage;
      })
      .on("click", (e) => {
        let fips = e.target.getAttribute("data-fips");
        let county = infoArray.dataArray2.find((item) => {
          return item["fips"] == fips;
        });

        setCountyUnit({
          ...countyUnit,
          fips: county.fips,
          state: county.state,
          area_name: county.area_name,
          bachelorsOrHigher: county.bachelorsOrHigher,
        });
      })
      .on("mouseover", (e) => {
        let fips = e.target.getAttribute("data-fips");
        e.target.setAttribute("fill", "#a85050");
        //console.log("e.target-fips", fips);
        tooltip.style("opacity", 1);
      })
      .on("mousemove", (e, item) => {
        let fips = e.target.getAttribute("data-fips");
        let county = infoArray.dataArray2.find((item) => {
          return item["fips"] == fips;
        });
        let unit = e.target.getBoundingClientRect();
        //console.log(unit);
        tooltip
          .style("left", `${unit.x - 300}px`)
          .style("top", `${unit.y}px`)
          .html(`state: ${county.state} <br/> area_name:${county.area_name}`);
      })
      .on("mouseout", (e) => {
        e.target.setAttribute("fill", "#e0a2a2");
        tooltip.style("opacity", 0);
      });
  };

  function getData(value: any) {
    setCountyArray({
      ...countyArray,
      dataArray: value,
    });
  }
  function getData2(value: any) {
    setInfoArray({
      ...infoArray,
      dataArray2: value,
    });
  }

  const makeMap = () => {
    let countyURL =
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";
    let educationURL =
      "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

    d3.json(countyURL).then((data, err) => {
      const results = topojson.feature(data, data.objects.counties).features;
      getData(results);

      d3.json(educationURL).then((data) => {
        //console.log("second", data);
        getData2(data);
      });
    });
    console.log("countyArray.length", countyArray);
  };

  //변수가 바뀌면 계속 업데이트 되어야 하는 식은 useEffect를 분리해서 따로 코드를 작성한다.
  useEffect(() => {
    if (countyArray.dataArray.length > 0) {
      if (infoArray.dataArray2.length > 0) {
        drawMap("#canvas");
      }
    }
  }, [countyArray.dataArray, infoArray.dataArray2]);

  //API는 함수 호출하고 return 으로 바로 끈다.
  useEffect(() => {
    makeMap();

    return () => {
      makeMap();
    };
  }, []);
  //console.log(countyArray);

  return (
    <div>
      <h3>Basic</h3>

      <div id="canvas">
        <div id="tooltip"></div>
      </div>
      <div className="mb-5">
        <p>state: {countyUnit.state}</p>
        <p>area_name: {countyUnit.area_name}</p>
        <p>bachelorsOrHeigher: {countyUnit.bachelorsOrHigher}</p>
      </div>
    </div>
  );
}
