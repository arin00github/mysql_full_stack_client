import React from "react";
import { useState } from "react";
import { Form, Modal, ModalBody } from "react-bootstrap";
import InputFieldItem from "../form/inputFieldItem";
import { PROGRESS_STEP } from "./data-types";
import { addDeviceFormItemValidInfo } from "../etc/addDeviceForm";
import {
  IAddDeviceFormItem,
  initAddDeviceFormItem,
} from "../etc/addDeviceForm";

export interface IInputItem {
  itemIsSet: boolean;
  duplicatedUserId: boolean;
  message?: string;
  userLevel?: string;
  progressStep?: PROGRESS_STEP;
  item: IAddDeviceFormItem;
}

export default function addModal(props: any) {
  const { item } = props;

  const [inputItem, setInputItem] = useState<IInputItem>({
    itemIsSet: false,
    duplicatedUserId: true,
    item: {
      ...initAddDeviceFormItem,
      ...item,
    },
    progressStep: "init",
  });
  //중복검사
  const inputCheck = async () => {};

  return (
    <Modal>
      <ModalBody>
        <Form>
          <InputFieldItem
            hasDupCheck
            item={addDeviceFormItemValidInfo.deviceEui}
            src={inputItem.item}
            onChange={(value: string) => {
              setInputItem({
                ...inputItem,
                item: {
                  ...inputItem.item,
                  deviceEui: value,
                },
              });
            }}
            onDupCheck={() => {
              inputCheck.then();
            }}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
}
