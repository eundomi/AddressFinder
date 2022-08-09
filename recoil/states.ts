import {atom} from "recoil";

export interface IAddressTypes {
  id: number;
  name: string;
  zonecode: string;
  address: string;
}
export const isModalVisible = atom<boolean>({
  key: "isModalVisible",
  default: false,
})
export const nameState = atom<string>({
  key: "nameState",
  default: ""
})
export const addressState = atom<string>({
  key: "addressState",
  default: "",
});
export const zoneCodesState = atom<string>({
  key: "zoneCodeState",
  default: "",
});

export const contentsState = atom<IAddressTypes[]>({
  key: "contents",
  default: []
});
