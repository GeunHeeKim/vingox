<template>
  <div class="mt-50">
    <el-row>
      <el-col class="text-center">
        <el-button type="primary" @click="initGame()">
          {{clickable ? '게임 재시작' : '게임 시작'}}
        </el-button>
      </el-col>
      <el-col>
        <div class="info-text">오픈된 보드에서 번호를 선택해주세요.</div>
      </el-col>
    </el-row>
    <el-row :gutter="100" class="wrap-player">
      <!-- 1 player -->
      <el-col :span="12">
        <h3 class="text-center">1 PLAYER</h3>
        <div class="text-center"><b>{{pointPlayer1}} 줄</b>이 완성되었습니다.</div>
        <div class="wrap-board">
          <div class="block" v-show="player1 === false"></div>
          <button v-for="(number,i) in playerBoard1"
            class="clikable-number"
            :key="i"
            :id="`p1_${i+1}`"
            ref="number"
            @click="selectNumber($event,i,number)">
            {{playerBoard1[i]}}
          </button>
        </div>
      </el-col>
      <!-- 2 player -->
      <el-col :span="12">
        <h3 class="text-center">2 PLAYER</h3>
        <div class="text-center"><b>{{pointPlayer2}} 줄</b>이 완성되었습니다.</div>
        <div class="wrap-board">
          <div class="block" v-show="player2 === false"></div>
          <button v-for="(number,i) in playerBoard2"
            class="clikable-number"
            :key="i"
            ref="number"
            :id="`p2_${i+1}`"
            @click="selectNumber($event,i,number)">
            {{playerBoard2[i]}}
          </button>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="Result"
      :visible.sync="dialogVisible"
      width="30%">
      <span>{{resultText}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmResult()">확인</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapState([
      'playerBoard1',
      'playerBoard2',
      'resultText',
      'bingoPlayer1',
      'bingoPlayer2',
      'pointPlayer1',
      'pointPlayer2',
      'dialogVisible',
      'player',
      'otherPlayer',
      'otherId'
    ]),
    ...mapGetters([]),
  },
  data() {
    return {
      clickable : false,
      player1: false,
      player2: false,
    }
  },
  created() {
    this.$store.commit('initNumber')
  },
  methods: {
    ...mapMutations([
        'initNumber',
        'startGame',
        'shuffleBoard',
        'clearData',
        'markNumber',
        'addBingo',
        'player1Check',
        'player2Check',
        'result',
        'hideDialog'
      ]),
      initGame() {
        this.initNumber()
        console.log('ccc')
        this.startGame()
        this.shuffleBoard(this.playerBoard1)
        this.shuffleBoard(this.playerBoard2)
        this.player1 = true
        this.player2 = false
        this.clickable = true
        this.clearData()
      },
      selectNumber($event,i,n) {
        let payload = {
          $event,
          i,
          n
        }
        this.markNumber(payload)
        this.addBingo(payload)
        if(this.otherPlayer === '2') {
          this.player1Check(this.player)
          this.player2Check(this.otherPlayer)
          this.result()
        } else {
          this.player1Check(this.otherPlayer)
          this.player2Check(this.player)
          this.result()
        }
        this.changePlayer()
      },
      changePlayer() {
        this.player1 = !this.player1
        this.player2 = !this.player2
      },
      confirmResult(state) {
        this.hideDialog()
        this.initGame()
        this.clickable = false
      },
  }
}
</script>