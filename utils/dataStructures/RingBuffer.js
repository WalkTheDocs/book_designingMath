/**
 * 座標を保存するためのリングバッファ
 *
 * @see https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%90%E3%83%83%E3%83%95%E3%82%A1
 */
class RingBuffer {
  end = 0;
  start = 0;

  constructor(size = 3) {
    this.size = size;
    this.buffer = Array(size).fill(null);
  }

  put(item) {
    this.buffer[this.end++] = item;
    this.end %= this.size;
  }

  get() {
    const item = this.buffer[this.start++];
    this.start %= this.size;
    return item;
  }

  /**
   * 反復処理プロトコル
   *
   * https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Iteration_protocols
   */
  [Symbol.iterator]() {
    let index = this.start;
    let endIndex = this.start + this.size;

    return {
      next: () => {
        return {
          value: this.buffer[index++ % this.size],
          done: this.buffer[index] === null || index > endIndex,
        };
      },
    };
  }
}
