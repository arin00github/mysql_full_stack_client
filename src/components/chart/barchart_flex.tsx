import * as d3 from "d3";
import { useRef } from "react";
import { useEffect } from "react";

export interface IbarChartProps {
  data: any;
  div: {
    divWidth: number;
    divHeight: number;
  };
  margin: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  maxYvalue: number;
  name: string;
  color?: string;
  domain?: string[];
  barLabel?: boolean;
}

interface chartValue {
  key: string;
  value: number;
}

/**
 * 그래프 종류는 X축에는 문자값이, Y축에는 숫자값이 있는 데이터를 넣을 수 있는 차트
 * @param data 그래프에 들어가야 할 데이터
 * @param div 그래프가 들어갈 div 가로세로 size가 들어있다. object형식
 * @param margin 그래프 안에 padding 처럼 남겨야할 값 (top, bottom, left, rigth) object형식
 * @param color  그래프 색상
 * @returns component 반환 기본 태그는 div
 */

export default function BarChartFlex({
  div,
  data,
  margin,
  maxYvalue,
  name,
  barLabel,
}: IbarChartProps) {
  const { top, bottom, left, right } = margin;
  let divWidth, divHeight, width, height;

  const thisRef = useRef(null);
  console.log("divWidth", divWidth);

  const drawMap = () => {
    const svg = d3
      .select(`#${name}`)
      .append("svg")
      .attr("width", width + left + right)
      .attr("height", height + top + bottom)
      .append("g")
      .attr("transform", `translate(${left}, ${top})`);

    const y = d3.scaleLinear().domain([0, maxYvalue]).range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    const x = d3
      .scaleBand()
      .domain(
        data.map((d) => {
          return d.key;
        })
      )
      .range([width, 0])
      .padding(0.2);

    //X축 설정
    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10, 0)rotate(-45)")
      .style("text-anchor", "end");

    //그래프 막대 그리기
    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      // .attr("transform", (d: chartValue) => {
      //   return `translate(0, 0 )`;
      // })
      .attr("x", (d: chartValue) => {
        return x(d.key);
      })
      .attr("y", (d: chartValue) => {
        return y(0);
      })
      .attr("width", x.bandwidth())
      .attr("height", (d: chartValue) => {
        return height - y(0);
      })
      .attr("fill", "#0c9bb4");

    if (barLabel === true) {
      svg
        .selectAll(".label")
        .data(data.splice(0, 8))
        .enter()
        .append("text")
        .classed("label", true)
        .attr("x", (d: chartValue) => {
          return x(d.key) + x.bandwidth() / 2;
        })
        .attr("dx", 0)
        .attr("y", (d: chartValue) => {
          return y(d.value) - 15;
        })
        .attr("text-anchor", "middle")
        .text((d: chartValue) => {
          return d.value;
        })
        .attr("font-size", "14px");
    }

    //Animation
    svg
      .selectAll("rect")
      .transition()
      .duration(700)
      .attr("y", (d: chartValue) => {
        return y(d.value);
      })
      .attr("height", (d: chartValue) => {
        return height - y(d.value);
      });
    //낱개씩 애니메이션 작동
    // .delay((d, i) => {
    //   return i * 700;
    // });
  };

  const changeColor = (color) => {
    d3.selectAll("rect").transition().duration(1000).style("fill", color);
  };

  useEffect(() => {
    if (data !== undefined) {
      if (thisRef.current) {
        divWidth = thisRef.current.offsetWidth;
        divHeight = thisRef.current.offsetHeight;
        console.log("useEffect divWidth", divWidth);
        width = divWidth - left - right;
        height = divHeight - top - bottom;
      }
      //console.log("bar-drawChart");
      drawMap();
    }
  }, [data, thisRef]);

  return <div className="chart" id={name} ref={thisRef}></div>;
}
