/**  
  * Converts hours to minutes and sums up the result to the remaining minutes
  * Example: "8:30" -> (8*60) + 30 = 480 + 30 = 510 minutes
  @param time The time in hh:mm format to be converted
*/
export default function convertHourToMinutes(time: string) {
    return time.split(":")
    .reduce((acc, el) => (parseInt(String(acc)) * 60) + parseInt(el), 0)
}