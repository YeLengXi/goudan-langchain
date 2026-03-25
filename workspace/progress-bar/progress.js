const ProgressBar = require('./progress.js');

// 创建一个新的进度条实例
function createProgressBar(total, width, complete, incomplete) {
  const bar = {
    total,
    width,
    complete,
    incomplete,
    current: 0,
    start: Date.now(),
    elapsed: 0,
    update: function(value) {
      this.current = value;
      this.elapsed = Date.now() - this.start;
      this.render();
    },
    render: function() {
      const percent = (this.current / this.total) * 100;
      const completeStr = this.complete.repeat(Math.round(percent / 100 * this.width));
      const incompleteStr = this.incomplete.repeat(this.width - completeStr.length);
      const eta = this.elapsed === 0 ? 'Unknown' : new Date(this.start + this.elapsed * (this.total - this.current) / this.current - this.elapsed).toISOString().substr(11, 8);
      console.log(`Processing files... [${completeStr}${incompleteStr}] ${percent.toFixed(0).toString()}% | ETA: ${eta} | ${this.current}/${this.total} files | ${this.current / this.elapsed} files/s`);
    }
  }
  return bar;
}

// 创建多个进度条
function createMultiProgressBar() {
  const multi = {
    bars: [],
    create: function(name, total) {
      const bar = createProgressBar(total, 40, '█', '░');
      this.bars.push({ name, bar });
      return bar;
    },
    render: function() {
      this.bars.forEach(bar => {
        bar.render();
      });
    }
  }
  return multi;
}

module.exports = { ProgressBar: createProgressBar, MultiProgressBar: createMultiProgressBar };