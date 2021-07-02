import { useState } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useSelector, useStore } from "react-redux";
import { IAuthInfo } from "../../src/interface/auth-interface";
import { CommonService } from "../api/services/common-service";
export default function Example01() {
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
  const bringToken = useSelector((state: { auth: IAuthInfo }) => state.auth);

  const readData = async (region) => {
    const sending = {
      name: region,
    };
    const result = await CommonService.instance.schemaRead(
      sending,
      bringToken.token
    );
    console.log("readData", result);
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
  };
  console.log(word);

  useEffect(() => {
    if (word.schema !== "") {
      readData(word.schema);
    }
    if (word.schema !== "" && word.table !== "") {
      readTableData(word.table);
    }
  }, [word.schema, word.table]);

  useEffect(() => {}, []);

  return (
    <div id="mssql-page">
      <h2 style={{ fontWeight: "bold" }}>MSSQL Example</h2>
      <div className="pb-3 pt-3">
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
                data.tableInfo.recordset.map((item) => (
                  <tr>
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
