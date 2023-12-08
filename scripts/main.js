// main scripts file

// date, time element from HTML
const dateEl = document.getElementById('date')
const timeEl = document.getElementById('time')

const headerClock = new Clock(dateEl, timeEl)
headerClock.start()

