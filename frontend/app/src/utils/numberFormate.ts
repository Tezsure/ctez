const SI_SYMBOL = ["", "k", "m", "b", "t", "p", "e"];
// export const numberToMillionOrBillionFormate=(number :any )=>{
//   if(!number || number===undefined || number===""){
//       return 0;
//   }
//   // what tier? (determines SI symbol)
//   const tier = Math.log10(Math.abs(number)) / 3;

//   // if zero, we don't need a suffix
//   if(tier === 0) return number.toFixed(2);

//   // get suffix and determine scale
//   const suffix = SI_SYMBOL[tier]??'';
//   const scale = 10 ** (tier * 3);

//   // scale the number
//   const scaled = number / scale;

//   // format number and add suffix
//   return scaled.toFixed(2) + suffix;
// }
export const numberToMillionOrBillionFormate=(num :any,digits=2,isDecimal=false, )=>{
  if(isDecimal){
    return num.toFixed(digits)
  }
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "m" },
    { value: 1e9, symbol: "g" },
    { value: 1e12, symbol: "t" },
    { value: 1e15, symbol: "p" },
    { value: 1e18, symbol: "e" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup.slice().reverse().find(function(itemE) {
    return num >= itemE.value;
  });
  return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}