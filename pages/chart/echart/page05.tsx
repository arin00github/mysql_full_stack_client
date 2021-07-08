import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import * as _ from "lodash";
import Header from "../../../src/components/layout/header";
import { Row, Col } from "react-bootstrap";
import { IAuthInfo } from "../../../src/interface/auth-interface";
import { useSelector } from "react-redux";
import { CommonService } from "../../api/services/common-service";

export default function EChartMap() {
  const bringToken = useSelector((state: { auth: IAuthInfo }) => state.auth);

  const [mapJson, setMapJson] = useState({
    data: undefined,
  });
  //const [mapOption, setMapOption] = useState<any>();

  const chartDom = document.getElementById("main");
  let myChart;
  let mapOption;
  let dataMake;
  const drawMap = () => {
    myChart = echarts.init(chartDom);
    echarts.registerMap("SOUTH KOREA", mapJson.data);

    dataMake = mapJson.data.features.map((it) => {
      return {
        name: it.properties.CTP_ENG_NM,
        value: Math.floor(Math.random() * 10000) + 1,
      };
    });
    console.log("dataMake", dataMake);
    mapOption = {
      title: {
        text: "South Korea Nation Map",
        subtext: "Data from www.census.gov",
        left: "right",
      },
      tooltip: {
        trigger: "item",
      },
      visualMap: {
        left: "right",
        min: 1000,
        max: 10000,
        inRange: {
          color: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#e0f3f8"],
        },
        text: ["High", "Low"], // 文本，默认为数值文本
        calculable: true,
      },
      toolbox: {
        show: true,
        //orient: 'vertical',
        left: "left",
        top: "top",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      // geo: [
      //   {
      //     map: "SOUTH KOREA",
      //     roam: true,
      //     layoutCenter: ["50%", "50%"],
      //     layoutSize: "100%",
      //     selectedMode: "multiple",
      //   },
      // ],
      series: [
        {
          name: "SOUTH KOREA",
          type: "map",
          roam: true,
          map: "SOUTH KOREA",
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          nameProperty: "CTP_ENG_NM",
          data: dataMake,
        },
      ],
    };

    myChart.setOption(mapOption);

    // myChart.on('selectChange', function(params){
    //   if(!params.selected.lenght){
    //     myChart.dispatchAction({
    //       type: 'hideTip'
    //     });
    //   }
    // })
  };
  console.log(mapJson.data);

  const downloadSvg = async () => {
    const rlst = await CommonService.instance.getNationWideMap(
      bringToken.token
    );

    const convert = JSON.parse(rlst[0].geojson);

    setMapJson({
      ...mapJson,
      data: convert,
    });
  };

  useEffect(() => {
    if (mapJson.data !== undefined) {
      drawMap();
    }
  }, [mapJson.data]);

  useEffect(() => {
    downloadSvg();

    return () => {
      downloadSvg();
    };
  }, []);

  return (
    <div style={{ padding: "0 100px" }}>
      <Header title="EChart Map" />
      <div>
        <Row>
          <Col>
            <div className="chart-set">
              <div id="main"></div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
