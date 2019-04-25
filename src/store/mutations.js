export default {
  changeDetailShow (state, detailShow) {
    state.detailShow = detailShow
  },
  changeCurrentIndex (state, currentIndex) {
    state.currentIndex = currentIndex
  },
  changeClickMenuIndex (state, clickMenuIndex) {
    state.clickMenuIndex = clickMenuIndex
  },
  changeDropBalls (state, ball) {
    state.dropBalls.push(ball)
  },
  shiftDropBall (state) {
    state.shiftBall = state.dropBalls.shift()
  },
  shiftDropBallShow (state) {
    state.shiftBall.show = false
  }
}
