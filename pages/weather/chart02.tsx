import axios from "axios";
import * as d3 from "d3";
import { useEffect, useState } from "react";

interface chartValue {
  Country: string;
  Value: number;
}

interface chartValue2 {
  group: string;
  value: number;
}

export default function Chart02() {
  const dataUrl =
    "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv";
  const [barData, setBarData] = useState({
    data: undefined,
  });
  const [groupData, setGroupData] = useState({
    data: undefined,
  });
  const weatherAPI =
    "https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&appid=8a722b85aca0471e5952cdf47161f37f";
  const getDataAPI = async () => {
    axios
      .get(weatherAPI)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  const dataAPI = () => {
    d3.csv(dataUrl).then((res) => {
      console.log(res);
      setBarData({
        ...barData,
        data: res,
      });
    });
  };
  const margin = { top: 30, right: 30, bottom: 70, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
  svg.append("g").call(d3.axisLeft(y));

  const drawMap = () => {
    console.log("draw Map");

    if (barData.data !== undefined) {
      const x = d3
        .scaleBand()
        .domain(
          barData.data.map((d) => {
            return d.Country;
          })
        )
        .range([width, 0])
        .padding(0.2);

      svg
        .append("g")
        .attr("transform", `translate(0, 300)`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10, 0)rotate(-45)")
        .style("text-anchor", "end");
      svg
        .selectAll("rect")
        .data(barData.data.splice(0, 9))
        .enter()
        .append("rect")
        .attr("transform", (d: chartValue) => {
          return `translate(0, 0 )`;
        })
        .attr("x", (d: chartValue) => {
          return x(d.Country);
        })
        .attr("y", (d: chartValue) => {
          return y(0);
        })
        .attr("width", x.bandwidth())
        .attr("height", (d: chartValue) => {
          return height - y(0);
        })
        .attr("fill", "#ff0000");

      //Animation
      svg
        .selectAll("rect")
        .transition()
        .duration(700)
        .attr("y", (d: chartValue) => {
          return y(d.Value);
        })
        .attr("height", (d: chartValue) => {
          return height - y(d.Value);
        });
      //낱개씩 애니메이션 작동
      // .delay((d, i) => {
      //   return i * 700;
      // });
    }
  };

  const changeColor = (color) => {
    d3.selectAll("rect").transition().duration(1000).style("fill", color);
  };

  /*********************   data change chart  ******************************/

  const dataGroup1 = [
    { group: "A", value: 12 },
    { group: "B", value: 19 },
    { group: "C", value: 7 },
  ];
  const dataGroup2 = [
    { group: "A", value: 6 },
    { group: "B", value: 10 },
    { group: "C", value: 14 },
  ];

  const svg2 = d3
    .select("#chart2")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + height + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x2 = d3
    .scaleBand()
    .range([0, width])
    .domain(
      dataGroup1.map((d) => {
        return d.group;
      })
    )
    .padding(0.2);
  svg2
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x2));

  const y2 = d3.scaleLinear().domain([0, 20]).range([height, 0]);
  svg2.append("g").attr("class", "myYaxis").call(d3.axisLeft(y2));

  const initChangeData = () => {
    svg2
      .selectAll("rect")
      .data(dataGroup1)
      .enter()
      .append("rect")
      .attr("transform", (d: chartValue2) => {
        return `translate(0, 0 )`;
      })
      .attr("x", (d: chartValue2) => x2(d.group))
      .attr("y", (d: chartValue2) => y2(d.value))
      .attr("width", x2.bandwidth())
      .attr("height", (d: chartValue2) => {
        return height - y2(d.value);
      })
      .style("fill", "#69b3a2");
  };

  const changeData = (data) => {
    svg2.selectAll().data(data);
  };

  useEffect(() => {
    if (barData.data !== undefined) {
      console.log("data is not undefined");
      drawMap();
      initChangeData();
    }
  }, [barData.data]);

  useEffect(() => {
    getDataAPI();
    dataAPI();
    console.log("download");
  }, []);

  return (
    <div>
      <h2>Weather Chart</h2>
      <div>
        <button
          onClick={() => {
            changeColor("blue");
          }}
        >
          blue
        </button>
        <button
          onClick={() => {
            changeColor("green");
          }}
        >
          green
        </button>
      </div>
      <div id="chart"></div>
      <div>
        <button
          onClick={() => {
            changeData(dataGroup1);
          }}
        >
          Data1
        </button>
        <button
          onClick={() => {
            changeData(dataGroup2);
          }}
        >
          Data2
        </button>
      </div>
      <div id="chart2"></div>
      <div id="chart3"></div>
      <div id="chart4"></div>
    </div>
  );
}
