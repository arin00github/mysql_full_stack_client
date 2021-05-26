import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart01 = () => {
  return (
    <ComposableMap
      projection="geoAzimuthalEqualArea"
      projectionConfig={{
        rotate: [-20.0, -52.0, 0],
        scale: 400,
      }}
    >
      <Geographies
        geography={geoUrl} //이미지 주소를 넣음
        fill="#D6D6DA"
        stroke="#FFFFFF"
        strokeWidth={0.5}
      >
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      <Annotation
        subject={[2.3522, 48.8566]} // 위치
        dx={-70} //대각선 가로 길이
        dy={-30} //대각선 세로 길이
        connectorProps={{
          stroke: "#FF5533",
          strokeWidth: 3,
          strokeLinecap: "round",
        }}
      >
        <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53">
          {"Paris"}
        </text>
      </Annotation>
    </ComposableMap>
  );
};

export default MapChart01;
