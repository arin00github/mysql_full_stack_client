import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useStore, useDispatch } from "react-redux";
import { fetchCurrentData, keepCurrent } from "../../redux/slices/chart-slice";
import Header from "../../src/components/layout/header";
import { IAuthInfo } from "../../src/interface/auth-interface";
import { CommonService } from "../api/services/common-service";

export default function Example01() {
  const dispatch = useDispatch();
  const [word, setWord] = useState({
    schema: "",
    table: "",
  });
  const [data, setData] = useState({
    schemaList: undefined,
    tableInfo: undefined,
  });
  const [count, setCount] = useState({
    cheonan: 0,
    gimcheon: 0,
    buyeo: 0,
    hadong: 0,
    mokpo: 0,
  });

  const [selectData, setSelectData] = useState({
    current: undefined,
    title: "",
  });

  const bringToken = useSelector((state: { auth: IAuthInfo }) => state.auth);

  const readData = async (region) => {
    const sending = {
      name: region,
    };
    const result = await CommonService.instance.schemaRead(
      sending,
      bringToken.token
    );
    //console.log("readData", result);
    setData({
      ...data,
      schemaList: result,
    });
  };

  const readTableData = async (table) => {
    const sending = {
      tableName: `${word.schema}01.${table}`,
    };
    const result = await CommonService.instance.tableInfoRead(
      sending,
      bringToken.token
    );
    console.log("readTableData", result);
    setData({
      ...data,
      tableInfo: result,
    });
    setSelectData({
      ...selectData,
      current: result.recordset,
      title: word.table,
    });
  };
  const keepReduxData = () => {
    if (data.tableInfo !== undefined) {
      dispatch(keepCurrent(selectData));
      setSelectData({
        ...selectData,
        current: undefined,
        title: "",
      });
    }
  };
  //console.log(word);

  useEffect(() => {
    if (word.schema !== "") {
      console.log("readschema");
      readData(word.schema);
    }
    if (word.schema !== "" && word.table !== "") {
      console.log("readtable");
      readTableData(word.table);
    }
  }, [word.schema, word.table]);

  useEffect(() => {}, []);

  return (
    <div id="mssql-page">
      <Header title="MSSQL Example" />
      <div className="pb-4 pt-3">
        {Object.keys(count).map((item) => {
          return (
            <Button
              style={{ marginRight: "10px" }}
              key={item}
              value={item}
              onClick={() => {
                setWord({
                  ...word,
                  schema: item,
                });
              }}
            >
              {item}
            </Button>
          );
        })}
        {selectData.current !== undefined && (
          <Button
            variant="danger"
            onClick={() => {
              keepReduxData();
            }}
          >
            keep Data
          </Button>
        )}
      </div>
      <div className="d-flex">
        <div className="schema-box">
          {data.schemaList !== undefined ? (
            <h4>{word.schema}01 schema가 가지고 있는 table 목록</h4>
          ) : (
            <h3>선택된 스키마가 없습니다.</h3>
          )}

          <ul>
            {data.schemaList !== undefined &&
              data.schemaList.recordset.map((item) => {
                return (
                  <li
                    key={item.TABLE_NAME}
                    onClick={() => {
                      setWord({
                        ...word,
                        table: item.TABLE_NAME,
                      });
                    }}
                  >
                    {item.TABLE_NAME}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="table-box">
          <table>
            <colgroup>
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
              <col width="20%" />
            </colgroup>
            <thead>
              {
                <tr>
                  {data.tableInfo !== undefined &&
                    Object.keys(data.tableInfo.recordset[0])
                      .slice(0, 5)
                      .map((item) => <th>{item}</th>)}
                </tr>
              }
            </thead>
            <tbody>
              {data.tableInfo !== undefined &&
                data.tableInfo.recordset.map((item, idx) => (
                  <tr key={idx + 110}>
                    {Object.values(item)
                      .slice(0, 5)
                      .map((item) => (
                        <td>{item}</td>
                      ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
