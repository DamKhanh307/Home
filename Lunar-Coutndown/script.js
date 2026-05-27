const fireworkContainer = document.querySelector('.fireworks-container')
const daysSpan = document.querySelector('#days')
const hoursSpan = document.querySelector('#hours')
const minutesSpan = document.querySelector('#minutes')
const secondsSpan = document.querySelector('#seconds')
const newYear = document.querySelector('#new-year')

// 1. Định dạng ngày Tết với múi giờ +07:00 chuẩn ISO
const tetDates = {
  2025: '2025-01-29T00:00:00+07:00',
  2026: '2026-02-17T00:00:00+07:00',
  2027: '2027-02-07T00:00:00+07:00',
  2028: '2028-01-26T00:00:00+07:00',
  2029: '2029-02-13T00:00:00+07:00',
  2030: '2030-02-03T00:00:00+07:00'
}

// Hàm lấy thời gian hiện tại theo mili-giây nhưng đã chuẩn hóa về GMT+7
const getVNNow = () => {
  const now = new Date()
  // Lấy thời gian UTC hiện tại và cộng thêm 7 tiếng (7 * 60 * 60 * 1000 ms)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000)
  return utc + (3600000 * 7)
}

// 2. Xác định năm Tết cần đếm ngược
const nowVN = new Date(getVNNow())
let year = nowVN.getFullYear()

let tetDate = new Date(tetDates[year])

// Nếu đã qua Tết của năm hiện tại, chuyển sang năm sau
if (!tetDates[year] || getVNNow() > tetDate.getTime()) {
  year++
  tetDate = new Date(tetDates[year])
}

const countToDate = tetDate.getTime()
newYear.innerText = year

// 3. Hàm đếm ngược
const countdown = () => {
  const now = getVNNow() // Luôn lấy giờ VN
  const distance = countToDate - now

  if (distance <= 0) {
    daysSpan.innerHTML = 0
    hoursSpan.innerHTML = 0
    minutesSpan.innerHTML = 0
    secondsSpan.innerHTML = 0
    clearInterval(countdownInterval)
    return
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  daysSpan.innerHTML = days
  hoursSpan.innerHTML = hours
  minutesSpan.innerHTML = minutes
  secondsSpan.innerHTML = seconds
}

countdown()
// Dùng let thay vì const để tránh lỗi hoisting khi clear interval
let countdownInterval = setInterval(countdown, 1000)

// 4. Khởi tạo Pháo hoa (Sửa lại theo chuẩn CDN tương thích bên dưới)
const fireworks = new FireworksJs.Fireworks(fireworkContainer, {
  speed: 4,
  acceleration: 1.05,
  friction: 1,
  gravity: 4,
  particles: 400,
  explosion: 10
})

fireworks.start()
