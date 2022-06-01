const SI_SYMBOL = ["", "k", "m", "b", "t", "p", "e"];
export const numberToMillionOrBillionFormate=(number :any )=>{
  if(!number || number===undefined || number===""){
      return 0;
  }
  // what tier? (determines SI symbol)
  const tier = Math.log10(Math.abs(number)) / 3;

  // if zero, we don't need a suffix
  if(tier === 0) return number.toFixed(2);

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier]??'';
  const scale = 10** tier * 3;

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return scaled.toFixed(2) + suffix;
}