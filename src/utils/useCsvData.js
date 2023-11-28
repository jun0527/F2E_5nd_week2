import _ from "lodash";
import { useVoteDataStore } from "@/stores/voteData";
export default function useCsvData() {
  const store = useVoteDataStore();
  const getCsvData = async (year, name) => {
    let csvData = "";
    const csvUrl = `./csvData/${year}/${name}.csv`;
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
  const getBaseData = async (year) => {
    const elbase = await getCsvData(year, "elbase");
    const citySort = ["基隆市", "臺北市", "新北市", "桃園市", "新竹市", "新竹縣", "苗栗縣", "臺中市", "彰化縣", "南投縣", "雲林縣", "嘉義市", "嘉義縣", "臺南市", "高雄市", "屏東縣", "臺東縣", "花蓮縣", "宜蘭縣", "澎湖縣", "金門縣", "連江縣"]
    const voteDefault = {
      vote1: {
        num: 0,
        color: "#DFA175"
      },
      vote2: {
        num: 0,
        color: "#8894D8"
      },
      vote3: {
        num: 0,
        color: "#84CB98"
      },
    }
    const baseData = {};
    baseData.cityList = [];
    baseData.vote = _.cloneDeep(voteDefault);
    const dataList = _.map(elbase.split(/\n|\r\n/), (item) =>
      item.split(/","|"/).join(" ").trim().split(" ")
    );
    _.forEach(dataList, (data) => {
      const cityNum = data[0] + data[1];
      const districtNum = data[3];
      const villageNum = data[4];
      if (cityNum === "00000" || cityNum === "10000" || cityNum === "09000" ||  data.length !== 6) return;
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
        city.vote = _.cloneDeep(voteDefault);
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
        district.vote = _.cloneDeep(voteDefault);
      } else {
        const obj = {};
        obj.num = villageNum;
        obj.name = data[5];
        obj.vote = _.cloneDeep(voteDefault)
        district.villages.push(obj);
      }
    });
    const newCityData = _.map(citySort, (cityName) => {
      const index = _.findIndex(baseData.cityList, (data) => data.name === cityName);
      return baseData.cityList[index];
    });
    baseData.cityList = newCityData;
    return baseData
  };
  const getVoteData = async (year) => {
    const voteData = await getBaseData(year);
    const voteCsvData = await getCsvData(year, "elctks");
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
        voteData.vote[`vote${data[6]}`].num += voteNum;
        return;
      }
      const cityIndex = getIndex(voteData.cityList, cityNum);
      const city = voteData.cityList[cityIndex];
      if (districtNum === "000") {
        city.vote[`vote${data[6]}`].num += voteNum;
        return;
      }
      const districtIndex = getIndex(city.districts, districtNum);
      const district = city.districts[districtIndex];
      if (villageNum === "0000") {
        district.vote[`vote${data[6]}`].num += voteNum;
        return;
      }
      const villageIndex = getIndex(district.villages, villageNum);
      const village = district.villages[villageIndex];
      if (data[5] === "0000") {
        village.vote[`vote${data[6]}`].num += voteNum;
      }
    });
    store.voteData = voteData;
  };
  const getBallotData = async (year) => {
    const ballotCsvData = await getCsvData(year, "elprof");
    const dataList = _.map(ballotCsvData.split(/\n|\r\n/), (item) =>
      item.split(/","|"/).join(" ").trim().split(" ")
    );
    const totalBallot = _.find(dataList, (data) => data[0] + data[1] === "00000")
    store.ballotData = {
      valid: totalBallot[6],
      invalid: totalBallot[7],
      total: totalBallot[8],
      voterTurnout: totalBallot[18],
    }
  }
  const getPartyData = async (year) => {
    const elpatyData = await getCsvData(year, "elpaty");
    const dataList = _.map(elpatyData.split(/\n|\r\n/), (item) =>
      item.split(/","|"/).join(" ").trim().split(" ")
    );
    const partData = {};
    _.forEach(dataList, (data) => {
      if (data.length !== 2) return;
      partData[data[0]] = data[1];
    })
    return partData;
  }
  const getCandidateData = async (year) => {
    const partData = await getPartyData(year);
    const elcandData = await getCsvData(year, "elcand");
    const dataList = _.map(elcandData.split(/\n|\r\n/), (item) =>
      item.split(/","|"/).join(" ").trim().split(" ")
    );
    const candidateData = {};
    _.forEach(dataList, (data) => {
      if (data.length < 14) return;
      const keys = Object.keys(candidateData);
      if (!keys.includes(`vote${data[5]}`)) {
        candidateData[`vote${data[5]}`] = {};
      }
      const candidate = candidateData[`vote${data[5]}`];
      if (data[16] === "Y") {
        candidate.deputy = data[6];
        return;
      }
      candidate.partId = data[7];
      candidate.partName = partData[data[7]]; 
      candidate.name = data[6];
    })
    store.candidateData = candidateData;
  }
  const getAllVoteData = async (year) => {
    await getVoteData(year);
    await getBallotData(year);
    await getCandidateData(year);
  }
  return {
    getAllVoteData,
    getCsvData
  };
}
