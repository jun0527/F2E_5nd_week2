export default function useNumberData () {
  const getNumberComma = (num) => {
    return JSON.stringify(num).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }
  return {
    getNumberComma,
  }
}