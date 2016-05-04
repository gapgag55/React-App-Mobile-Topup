export default function(minutes) {
    if(minutes < 10) {
      return "0" + minutes
    }
    return minutes
}
