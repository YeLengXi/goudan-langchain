const ProgressBar = require('cli-progress');

class ProgressBar {
  constructor(options) {
    this.total = options.total || 100;
    this.width = options.width || 20;
    this.complete = options.complete || "█";
    this.incomplete = options.incomplete || " ";
    this.progress = 0;
    this.start_time = Date.now();
    this.end_time = null;
  }

  update(value) {
    this.progress = value;
    this.end_time = Date.now();
    this.render();
  }

  render() {
    const complete_length = Math.round(this.width * (this.progress / this.total));
    const incomplete_length = this.width - complete_length;
    const complete_str = this.complete.repeat(complete_length);
    const incomplete_str = this.incomplete.repeat(incomplete_length);
    const percentage = Math.round((this.progress / this.total) * 100);
    const elapsed_time = this.end_time - this.start_time;
    const eta = elapsed_time ? (elapsed_time / this.progress) * (this.total - this.progress) : 0;
    const speed = this.progress ? this.progress / (elapsed_time / 1000) : 0;
    console.log(
      
        "\nProcessing files...\n" +
        "[" + complete_str + incomplete_str + "] " + percentage + "% | ETA: " + Math.round(eta / 1000) + ":" + (eta % 1000).toString().padStart(2, '0') + " | " + this.progress + "/" + this.total + " files | " + speed.toFixed(1) + " files/s\n"
    );
  }
}

module.exports = ProgressBar;