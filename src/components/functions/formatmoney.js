export default function(money) {
  if(money.length > 3) {
    // ตัวแปรหาตำแหน่งเริ่มต้นของ comma
    let index

    // กำหนด J เท่ากับเงินที่เป็นสตริง
    // เพื่อจะได้แบ่งออกได้
    let j = money

    // กำหนดตัวแปร comma
    // เพื่อป้องกัน หลักแสน
    // ถ้าไม่ใส่มันจะแสดงแบบนี้ ,100,200 บาท
    // ก็เลยกำหนด if ให้มัน
    // ถ้ามันเป็นเลข 6 หลักให้ , เป็น " " ว่างเปล่า
    let comma = ""

    // หา index เริ่มต้น
    // เครื่องหมาย ,
    // เมื่อหาได้แล้วให้ตัวต่อไปครบทุกๆ 3 ตัวเป็น ,
    // ก็จะได้แล้วเงิน format
    index = j.length % 3;
    if(index != 0) {
      comma = ","
    }
    return j.substr(0, index) + comma + j.substr(index).replace(/(\d{3})(?=\d)/g, "$1,")
  } else {
    return money
  }
}
