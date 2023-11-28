import _ from "lodash"
export default function useNumberData () {
  const getNumberComma = (num) => {
    let content = num;
    if (_.isNumber(num)) {
      content = JSON.stringify(num);
    }
    return content.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return {
    getNumberComma,
  }
}