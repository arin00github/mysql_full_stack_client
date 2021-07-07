import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import * as _ from "lodash";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Header from "../../../src/components/layout/header";

export default function EChartLine() {
  const [weatherData, setWeatherData] = useState<any>(undefined);
  const weatherAPI = `https://api.openweathermap.org/data/2.5/forecast?q=Seoul&units=metric&appid=8a722b85aca0471e5952cdf47161f37f`;

  const getDataAPI = async () => {
    axios
      .get(weatherAPI)
      .then((res) => {
        //console.log("weather", res.data.list);
        const dataArray = res.data.list;

        const result = dataArray.slice(0, 8).map((item) => {
          return {
            time: item.dt,
            timeText: item.dt_txt.substr(11, 2),
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            humidity: item.main.humidity,
          };
        });
        setWeatherData({
          ...weatherData,
          result,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("weatherData", weatherData);

  const options = {
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {},
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  const [lineOption, setLineOption] = useState({});

  //  Error :
  const renderChart = (source) => {
    console.log("source", source);
    const option2 = {
      title: {
        text: "일주기온변화",
        subtext: "온도,습도 체크",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["기온", "체감기온"],
      },
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: source.result.map((it) => {
          return it.timeText;
        }),
      },
      yAxis: {
        type: "value",
        axisLabel: {
          formatter: "{value} °C",
        },
      },
      series: [
        {
          name: "기온",
          type: "line",
          data: source.result.map((it) => {
            return it.temp;
          }),
          markPoint: {
            data: [
              { type: "max", name: "최대온도" },
              { type: "min", name: "최소온도" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "평적치" }],
          },
        },
        {
          name: "체감기온",
          type: "line",
          data: source.result.map((it) => {
            return it.feels_like;
          }),
          markPoint: {
            data: [{ name: "고저", value: -2, xAxis: 1, yAxis: -1.5 }],
          },
          markLine: {
            data: [
              { type: "average", name: "평균온도" },
              [
                {
                  symbol: "none",
                  x: "90%",
                  yAxis: "max",
                },
                {
                  symbol: "circle",
                  label: {
                    position: "start",
                    formatter: "최대치",
                  },
                  type: "max",
                  name: "최고점",
                },
              ],
            ],
          },
        },
      ],
    };

    setLineOption(option2);
  };

  const colors = ["#5470C6", "#EE6666"];
  const option3 = {
    color: colors,

    tooltip: {
      trigger: "none",
      axisPointer: {
        type: "cross",
      },
    },
    legend: {
      data: ["2015 강수량", "2016 강수량"],
    },
    grid: {
      top: 70,
      bottom: 50,
    },
    xAxis: [
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[1],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                "강수량  " +
                params.value +
                (params.seriesData.length
                  ? "：" + params.seriesData[0].data
                  : "")
              );
            },
          },
        },
        data: [
          "2016-1",
          "2016-2",
          "2016-3",
          "2016-4",
          "2016-5",
          "2016-6",
          "2016-7",
          "2016-8",
          "2016-9",
          "2016-10",
          "2016-11",
          "2016-12",
        ],
      },
      {
        type: "category",
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: colors[0],
          },
        },
        axisPointer: {
          label: {
            formatter: function (params) {
              return (
                "강수량  " +
                params.value +
                (params.seriesData.length
                  ? "：" + params.seriesData[0].data
                  : "")
              );
            },
          },
        },
        data: [
          "2015-1",
          "2015-2",
          "2015-3",
          "2015-4",
          "2015-5",
          "2015-6",
          "2015-7",
          "2015-8",
          "2015-9",
          "2015-10",
          "2015-11",
          "2015-12",
        ],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "2015 강수량",
        type: "line",
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
        ],
      },
      {
        name: "2016 강수량",
        type: "line",
        smooth: true,
        emphasis: {
          focus: "series",
        },
        data: [
          3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,
        ],
      },
    ],
  };
  console.log("lineOption", lineOption);

  useEffect(() => {
    if (weatherData !== undefined) {
      renderChart(weatherData);
    }
  }, [weatherData]);

  useEffect(() => {
    console.log("data download");
    getDataAPI();
  }, []);

  return (
    <div style={{ padding: "0 100px" }}>
      <Header title="EChart 01" />
      <div>
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <div className="chart-set">
              <ReactECharts option={options} />;
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <div className="chart-set">
              {weatherData !== {} && (
                <ReactECharts
                  option={lineOption}
                  style={{ height: "450px" }}
                  onChartReady={getDataAPI}
                />
              )}
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <div className="chart-set">
              <ReactECharts option={option3} style={{ height: "400px" }} />
            </div>
          </Col>
        </Row>
      </div>
      <div className="d-flex" style={{ width: "100%" }}></div>
    </div>
  );
}
