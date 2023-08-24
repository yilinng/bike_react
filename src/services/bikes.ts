import axios from "axios";
import newTaipei from "../data/newTaipei.json";
import taichung from "../data/taichung.json";

const taipeiUrl =
  "https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json";
//Taoyuan
const taoyuanUrl =
  "https://data.tycg.gov.tw/api/v1/rest/datastore/a1b4714b-3b75-4ff8-a8f2-cc377e4eaa0f?format=json";
//Kaohsiung
const kaohsiungUrl =
  "https://api.kcg.gov.tw/api/service/Get/b4dd9c40-9027-4125-8666-06bef1756092";
//Tainan
const tainanUrl =
  "https://data.tainan.gov.tw/dataset/7dc3e3a3-875c-4827-ba67-ec00a2d994c2/resource/d51b59a7-b428-4ac1-a871-6e197f8d972d/download/opendata.json";

const getAll = ({ data = "taipei" }) => {
  if (data === "taipei") {
    return axios.get(taipeiUrl);
  }
  if (data === "newTaipei") {
    return newTaipei;
  }
  if (data === "taoyuan") {
    return axios.get(taoyuanUrl);
  }
  if (data === "taichung") {
    return taichung;
  }
  /*
  if (data === "tainan") {
    return axios.get(tainanUrl);
  }
  
  if (data === "kaohsiung") {
    return axios.get(kaohsiungUrl);
  }
  */
};

const options = [
  { value: "taipei", label: "台北市" },
  { value: "newTaipei", label: "新北市" },
  { value: "taoyuan", label: "桃園市" },
  { value: "taichung", label: "台中市" },
  // { value: "tainan", label: "台南市" },
  // { value: "kaohsiung", label: "高雄市" },
];

export default {
  getAll: getAll,
  options,
};
