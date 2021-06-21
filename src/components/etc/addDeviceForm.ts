import { IValidInformation } from "./FormValidator";

export interface IAddDeviceFormItem {
  deviceEui: string;
  vmsId: string;
  gisSync: boolean;
  latitude: string;
  longitude: string;
}

export const addDeviceFormItemValidInfo: IValidInformation = {
  deviceEui: {
    id: "wizard-device-eui",
    name: "deviceEui",
    isArray: false,
    required: true,
    regMatch:
      "^[ㄱ-ㅎ가-힣0-9a-zA-Z\\-\\_][ㄱ-ㅎ가-힣0-9a-zA-Z\\-\\_\\s]{1,15}$",
    compType: "input",
    placeholder: "DEVICE EUI 입력",
  },
  vmsId: {
    id: "wizard-vmsId",
    name: "vmsId",
    isArray: false,
    required: true,
    regMatch: "^[\\d]{1,6}$",
    compType: "input",
    placeholder: "VMS ID",
  },
  gisSync: {
    id: "wizard-gisSync",
    name: "gisSync",
    isArray: false,
    required: true,
    regMatch: undefined,
    compType: "radio",
    placeholder: "vms id",
  },
  latitude: {
    id: "wizard-latitude",
    name: "latitude",
    isArray: false,
    required: true,
    regMatch: "^[\\d .]+$",
    compType: "input",
    placeholder: "위도",
  },
  longitude: {
    id: "wizard-longitude",
    name: "longitude",
    isArray: false,
    required: true,
    regMatch: "^[\\d .]+$",
    compType: "input",
    placeholder: "경도",
  },
};

export const initAddDeviceFormItem: IAddDeviceFormItem = {
  deviceEui: "",
  vmsId: "",
  gisSync: true,
  latitude: "1",
  longitude: "1",
};
