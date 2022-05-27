const buffer = new RingBuffer(100);

//❶ 最初に一度実行される
function setup() {}
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
function touchStart() {}
//❹ 指（マウス）が動くたびに実行される
function touchMove() {
  //指が動いたら(マウスが動いたら)
  buffer.put({ x: curYubiX, y: curYubiY });
}
//❺ 指が離れる（マウスアップ）で一度実行される
function touchEnd() {
  //指が離されたら(マウスアップ)
}

function clear() {
  ctx.clearRect(0, 0, screenWidth, screenHeight);
}
