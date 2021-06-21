import React from "react";
import { Badge } from "react-bootstrap";
import { IValidItem } from "../form/inputFieldItem";

export interface IValidInformation {
  [name: string]: IValidItem;
}

export class FormValidator {
  /**
   * 주어진 구조체 값 중에서 IValidItem.name에 해당하는 필드값이 제대로 입력
   * 되었는지 확인 한다.
   * @param validator IValidItem 형식으로 validation정보를 담고 있다.
   * @param data 입력을 받는 구조체
   * @returns 문제가 있을 경우 true를 리턴
   */
  public static checkInvalid(
    validator: IValidItem,
    data: { [id: string]: any }
  ): boolean | undefined {
    let isInvalid: boolean | undefined;

    if (validator.required) {
      isInvalid = true;

      let org = "";

      if (data[validator.name] === undefined || data[validator.name] === null) {
        return true;
      }

      if (typeof data[validator.name] === "boolean") {
        org = String(data[validator.name]);
      } else if (Array.isArray(data[validator.name])) {
        return data[validator.name].length === 0;
      } else {
        org = String(data[validator.name]);
      }

      if (validator.regMatch) {
        // regular expression matching
        const regExp = new RegExp(validator.regMatch);
        isInvalid = !regExp.test(org);
      } else {
        // text matching
        isInvalid = org.length === 0;
      }
    }

    return isInvalid;
  }

  /**
   * 주어진 validator 가 가르키는 html 항목(validator.id)에 대하여 점검하는
   * 함수
   * @param validator IValidItem 형식으로 validation정보
   * @returns 문제가 있을 경우 true를 리턴
   */
  public static checkIsInvalid(validator: IValidItem): boolean | undefined {
    let isInvalid: boolean | undefined;

    if (validator.required) {
      isInvalid = true;

      let org = "";
      const val = FormValidator.getElementValue(validator);
      if (typeof val === "string") org = val;
      else org = String(val);

      if (validator.regMatch) {
        // regular expression matching
        const regExp = new RegExp(validator.regMatch);
        isInvalid = !regExp.test(org);
      } else {
        // text matching
        isInvalid = org.length === 0;
      }
    }
    return isInvalid;
  }

  /**
   * 주어진 항목을 검사하고, 입력이 제대로 되지 않았을 경우, 화면에 표시
   * @param info IValidItem 항목으로 validation항목
   * @param data 점검할 값을 가진 구조체
   * @param message 입력이 제대로 되지 않았을때 표시할 메세지로 값이 없으면
   *                기본값인 '***'를 표시한다
   * @returns 입력값에 문제가 있음을 알리는 JSX.Element 또는 undefined
   */
  public static makeRequireBadge(
    info: IValidItem,
    data: { [id: string]: any },
    message?: string | JSX.Element
  ): JSX.Element | undefined {
    const isInvalid = FormValidator.checkInvalid(info, data);
    if (isInvalid) {
      // need more data
      return (
        <Badge className="px-2 py-1 mx-1 required-fill">
          {message || (
            <span className="svg-icon icon-required ml-n1">
              <div
                style={{ width: "16px", height: "16px", background: "red" }}
              ></div>
            </span>
          )}
        </Badge>
      );
    }
    return undefined;
  }

  /**
   * 전체 항목을 검사하고, 문제 있는 항목의 이름(IValidItem.name)을 리턴하고
   * 문제가 없는 경우는 undefined를 리턴한다.
   * @param info IValidInformation항목으로 검사할 전체 데이터를 가진 구조체
   * @param data 점검할 값을 가진 구조체
   * @returns 문제발생한 항목 이름(IValidItem.name) 또는 undefined
   */
  public static checkFormInvalid(
    info: IValidInformation,
    data: { [id: string]: any }
  ): string | undefined {
    const members = Object.keys(info);

    let member = "";

    return members.some((m) => {
      if (FormValidator.checkInvalid(info[m], data)) {
        member = m;
        return true;
      }
      return false;
    })
      ? member
      : undefined;
  }

  /**
   * item에서 지정하는 입력항목의 값을 리턴한다
   * 입력처리가 가능한 html element로는 input, textarea, slect 등이 있다
   * @param item IValidItem으로 validaton정보를 가지고 있음
   * @returns 입력된 값을 리턴
   */
  public static getElementValue(item: IValidItem): string {
    const comp = document.getElementById(item.id);
    if (!comp) {
      throw new Error(`element ${item.name} not found`);
    }

    let value = "";

    if (item.compType === "button") {
      const src = comp as HTMLButtonElement;
      if (!src) {
        throw new Error(`element ${item.name} not be button`);
      }
      value = src.value;
    } else if (
      item.compType === "input" ||
      item.compType === "password" ||
      item.compType === "email" ||
      item.compType === "date"
    ) {
      const src = comp as HTMLInputElement;
      if (!src) {
        throw new Error(`element ${item.name} not be input`);
      }
      // if (item.compType === 'date') console.log(`date: ${src.value}`)
      value = src.value;
    } else if (item.compType === "textarea") {
      const src = comp as HTMLTextAreaElement;
      if (!src) {
        throw new Error(`element ${item.name} not be input`);
      }
      value = src.value;
    } else if (item.compType === "select") {
      const src = comp as HTMLSelectElement;
      if (!src) {
        throw new Error(`element ${item.name} not be input`);
      } else if (src.selectedIndex >= 0) {
        value = src.options[src.selectedIndex].value;
      }
    }

    return value;
  }
}
