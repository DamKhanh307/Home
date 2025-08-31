const fireworkContainer = document.querySelector('.fireworks-container')
const daysSpan = document.querySelector('#days')
const hoursSpan = document.querySelector('#hours')
const minutesSpan = document.querySelector('#minutes')
const secondsSpan = document.querySelector('#seconds')
const newYear = document.querySelector('#new-year')

// Danh sách ngày mùng 1 Tết âm lịch (dương lịch)
const tetDates = {
  2025: '2025-01-29',
  2026: '2026-02-17',
  2027: '2027-02-07',
  2028: '2028-01-26',
  2029: '2029-02-13',
  2030: '2030-02-03'
}

// Lấy năm hiện tại
const now = new Date()
let year = now.getFullYear()

let tetDate = new Date(tetDates[year])
if (!tetDate || now > tetDate) {
  year++
  tetDate = new Date(tetDates[year])
}

// Biến countToDate để countdown
const countToDate = tetDate.getTime()

// Hiển thị năm mới
newYear.innerText = year

const countdown = () => {
  const now = new Date().getTime()
  const distance = countToDate - now

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  daysSpan.innerHTML = days
  hoursSpan.innerHTML = hours
  minutesSpan.innerHTML = minutes
  secondsSpan.innerHTML = seconds

  if (distance < 0) {
    clearInterval(countdownInterval)
  }
}

countdown()

const countdownInterval = setInterval(countdown, 1000)

const fireworks = new Fireworks(fireworkContainer, {
  speed: 4,
  acceleration: 1.05,
  friction: 1,
  gravity: 4,
  particles: 400,
  explosion: 10
})

fireworks.start()
