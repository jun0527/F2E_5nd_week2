import _ from "lodash";
import { useVoteDataStore } from "@/stores/voteData";
export default function useCsvData() {
  const store = useVoteDataStore();
  const urlList = {
    elbase: "../assets/csvData/elbase.csv",
    president: "../assets/csvData/president.csv"
  };
  const getCsvData = async (name) => {
    let csvData = "";
    const csvUrl = new URL(urlList[name], import.meta.url).href;
    await new Promise((resolve) => {
      fetch(csvUrl)
        .then((res) => {
          return res.text();
        })
        .then((data) => {
          csvData = data;
          resolve();
        });
    });
    return csvData;
    // resolve(csvData);
  };
  // const csvToArray
  const getIndex = (array, num) => {
    return _.findIndex(array, (item) => item.num === num);
  };
  const getBaseData = async () => {
    const elbase = await getCsvData("elbase");
    const baseData = {};
    baseData.cityList = [];
    baseData.vote = {
      vote1: 0,
      vote2: 0,
      vote3: 0
    };
    const dataList = _.map(elbase.split(/\n|\r\n/), (item) =>
      item.split(/","|"/).join(" ").trim().split(" ")
    );
    _.forEach(dataList, (data) => {
      const cityNum = data[0] + data[1];
      const districtNum = data[3];
      const villageNum = data[4];
      if (cityNum === "00000" || cityNum === "10000" || data.length !== 6) return;
      if (getIndex(baseData.cityList, cityNum) === -1) {
        const obj = {};
        obj.num = cityNum;
        obj.districts = [];
        baseData.cityList.push(obj);
      }
      const cityIndex = getIndex(baseData.cityList, cityNum);
      const city = baseData.cityList[cityIndex];
      if (districtNum === "000") {
        city.name = data[5];
        city.vote = {
          vote1: 0,
          vote2: 0,
          vote3: 0
        };
        return;
      }
      if (getIndex(city.districts, districtNum) === -1) {
        const obj = {};
        obj.num = districtNum;
        obj.villages = [];
        city.districts.push(obj);
      }
      const districtIndex = getIndex(city.districts, districtNum);
      const district = city.districts[districtIndex];
      if (villageNum === "0000") {
        district.name = data[5];
        district.vote = {
          vote1: 0,
          vote2: 0,
          vote3: 0
        };
      } else {
        const obj = {};
        obj.num = villageNum;
        obj.name = data[5];
        obj.vote = {
          vote1: 0,
          vote2: 0,
          vote3: 0
        };
        district.villages.push(obj);
      }
    });
    store.voteBase = baseData;
  };
  const getVoteData = async (name) => {
    const voteCsvData = await getCsvData(name);
    const voteData = _.cloneDeep(store.voteBase);
    const dataList = _.map(voteCsvData.split(/\n|\r\n/), (item) =>
      item.split(/","|"/).join(" ").trim().split(" ")
    );
    _.forEach(dataList, (data) => {
      const cityNum = data[0] + data[1];
      if (cityNum === "10000" || data[5] !== "0000" || data.length < 9) return;
      const districtNum = data[3];
      const villageNum = data[4];
      const voteNum = parseInt(data[7]);
      if (cityNum === "00000") {
        voteData.vote[`vote${data[6]}`] += voteNum;
        return;
      }
      const cityIndex = getIndex(voteData.cityList, cityNum);
      const city = voteData.cityList[cityIndex];
      if (districtNum === "000") {
        city.vote[`vote${data[6]}`] += voteNum;
        return;
      }
      const districtIndex = getIndex(city.districts, districtNum);
      const district = city.districts[districtIndex];
      if (villageNum === "0000") {
        district.vote[`vote${data[6]}`] += voteNum;
        return;
      }
      const villageIndex = getIndex(district.villages, villageNum);
      const village = district.villages[villageIndex];
      if (data[5] === "0000") {
        village.vote[`vote${data[6]}`] += voteNum;
      }
    });
    store.voteData = voteData;
  };
  return {
    getBaseData,
    getVoteData,
    getCsvData
  };
}
