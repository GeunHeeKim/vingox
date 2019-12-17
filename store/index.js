export const state = () => ({
  resultText: '',
  dialogVisible: false,
  playerBoard1 : [],
  playerBoard2 : [],
  bingoPlayer1: [],
  bingoPlayer2: [],
  pointPlayer1 : 0,
  pointPlayer2: 0,
  player : 1,
  otherPlayer : 2,
  otherId : 0,
  bingoArray : [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [5, 10, 15, 20, 25],
    [1, 7, 13, 19, 25],
    [5, 9, 13, 17, 21]
  ]
});

export const getters = {
};

export const mutations = {
  initNumber(state) {
    for(let i=0; i<25; i++) {
      state.playerBoard1[i]= i + 1
      state.playerBoard2[i]= i + 1
    }
  },
  startGame(state) {
    state.bingoPlayer1 = []
    state.bingoPlayer2 = []
    // state.player1 = false
    // state.player2 = false
  },
  shuffleBoard(state,a) {
    let j, x, i
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i)
        x = a[i - 1]
        a[i - 1] = a[j]
        a[j] = x
      }
    },
  clearData(state) {
    state.playerBoard2.forEach(e => {
      let itemId = `p2_${e}`
      let itemEl = document.getElementById(itemId)
      itemEl.disabled = false
    })
    state.playerBoard1.forEach(e => {
      let itemId = `p1_${e}`
      let itemEl = document.getElementById(itemId)
      itemEl.disabled = false
    })
    state.bingoPlayer1 = []
    state.bingoPlayer2 = []
    state.pointPlayer1 = 0
    state.pointPlayer2 = 0
  },
  //선택한 번호를 화면에서 녹색으로 표시
  markNumber(state,payload) {
    payload.$event.target.disabled = true
    state.player = '1'
    state.otherPlayer = '2'
    state.otherId = (state.playerBoard2.findIndex((el) => el === payload.n)) + 1
    if(payload.$event.target.id.includes('p2')) {
      state.player = '2'
      state.otherPlayer = '1'
      state.otherId = (state.playerBoard1.findIndex((el) => el === payload.n)) + 1
    }
    //다른 플레이어 숫자판의 number,id ,아이디값의 요소찾기
    let otherEl = `p${state.otherPlayer}_${state.otherId}`
    let otherResult = document.getElementById(otherEl)
    otherResult.disabled = true
  },
  //각 플레이어의 정답 배열에 숫자 추가하기
  addBingo(state, payload) {
    let locationNo = payload.i + 1
    if(state.otherPlayer === '2') {
      state.bingoPlayer1.push(locationNo)
      state.bingoPlayer2.push(state.otherId)
    } else {
      state.bingoPlayer2.push(locationNo)
      state.bingoPlayer1.push(state.otherId)
    }
  },
  player1Check(state,player) {
    state.pointPlayer1 = 0
    for (let i = 0; i < state.bingoArray.length; i++) {
        if (
          state.bingoArray[i].every(
                j => state.bingoPlayer1.includes(j)
            )
        ) {
          state.pointPlayer1 += 1
        }
    }
  },
  player2Check(state,otherPlayer) {
    state.pointPlayer2 = 0
    for (let i = 0; i < state.bingoArray.length; i++) {
        if (
          state.bingoArray[i].every(
                j => state.bingoPlayer2.includes(j)
            )
        ) {
          state.pointPlayer2 += 1
        }
    }
  },
  hideDialog(state) {
    state.dialogVisible = false
  },
  result(state) {
    if(state.pointPlayer2 >= 5 && state.pointPlayer1 >= 5) {
      state.resultText = '무승부입니다.'
      state.dialogVisible = true
    } else if(state.pointPlayer1 >= 5) {
      state.resultText = 'PLAYER 1 Win!'
      state.dialogVisible = true
    } else if(state.pointPlayer2 >= 5) {
      state.resultText = 'PLAYER 2 Win!'
      state.dialogVisible = true
    }
  },
}