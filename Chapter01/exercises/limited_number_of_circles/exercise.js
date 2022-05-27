/**
 * 座標を保存するためのリングバッファ
 *
 * @see https://ja.wikipedia.org/wiki/%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%90%E3%83%83%E3%83%95%E3%82%A1
 */
class CoordinatesRingBuffer {
  end = 0;
  start = 0;

  constructor(size = 3) {
    this.size = size;
    this.buffer = Array(size).fill(null);
  }

  put(coordinates) {
    this.buffer[this.end++] = coordinates;
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
          done: index > endIndex,
        };
      },
    };
  }
}

const buffer = new CoordinatesRingBuffer();

//❶ 最初に一度実行される
function setup() {
  buffer.put({ x: 0, y: 0 });
  buffer.put({ x: 100, y: 100 });
  buffer.put({ x: 200, y: 200 });
}
//❷ setup実行後に常時繰り返して実行される
function loop() {
  //常時実行される
  clear();
  for (const coordinates of buffer) {
    ctx.beginPath();
    ctx.arc(coordinates.x, coordinates.y, 200, 0, Math.PI * 2);
    ctx.stroke();
  }
}
//❸ タッチ（マウスダウン）で一度実行される
function touchStart() {
  buffer.put({ x: curYubiX, y: curYubiY });
}
//❹ 指（マウス）が動くたびに実行される
function touchMove() {
  //指が動いたら(マウスが動いたら)
}
//❺ 指が離れる（マウスアップ）で一度実行される
function touchEnd() {
  //指が離されたら(マウスアップ)
}

function clear() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
}
