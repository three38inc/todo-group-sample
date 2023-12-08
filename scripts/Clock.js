// Date and Time Formatting Options
const dateFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const timeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true,
};

// Formats
const timeFormat = new Intl.DateTimeFormat("en-GB", timeFormatOptions);
const dateFormat = new Intl.DateTimeFormat("en-GB", dateFormatOptions);


class Clock {
  constructor(dateEl, timeEl) {
    // initialize
    this.today = new Date();
    this.dateEl = dateEl;
    this.timeEl = timeEl;
    this.interval = null;
  }

  // method to start the clock
  start() {
    // interval to keep updating time in the UI
    this.interval = setInterval(() => {
      this.today = new Date();
      this.dateEl.innerHTML = dateFormat.format(this.today);
      this.timeEl.innerHTML = timeFormat.format(this.today);
    }, 1000);
  }

  // method to stop the clock
  stop() {
    clearInterval(this.interval);
  }
}
