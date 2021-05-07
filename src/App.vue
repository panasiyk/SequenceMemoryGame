<template>
  <div>
    <simple-modal v-model="isShow">
      <template slot="body">
        <div class="container">Game over</div>
      </template>
    </simple-modal>

    <div class="container">
      <div v-if="!gameLVLDuration">
        <input type="button" value="Easy" @click="setGameDuration(1500)">
        <input type="button" value="Medium" @click="setGameDuration(1000)">
        <input type="button" value="Hard" @click="setGameDuration(400)">
      </div>
      <div v-show="gameLVLDuration" class="grid">
        <ItemElement @select="itemSelected" v-for="item in items" :gameStatus="gameStatus" :itemData="item" :key="item.id"/>
      </div>
    </div>
  </div>
</template>

<script>

import ItemElement from "@/components/ItemElement";
import {GameStatus, shuffleArray} from "@/Service/Helper";
import Item from "@/Service/Item";
import SimpleModal from 'simple-modal-vue'

export default {
  name: 'App',
  components: {ItemElement, SimpleModal},
  data: () => ({
    isShow: false,
    itemsCount: 4,
    items: [],
    queue: [],
    gameLVLDuration: null,
    gameStatus: GameStatus.PreGame
  }),
  created() {
    this.createItems();
  },
  methods: {
    setGameDuration(duration) {
      this.gameLVLDuration = duration
      this.showExampleRound();
    },
    createItems() {
      this.items = [...Array(this.itemsCount).keys()].map(() => new Item());
      this.queue = shuffleArray(this.items);
    },
    async showExampleRound() {
      const animations = [];
      this.queue.forEach((item, i) => {
        const itemElement = this.$children.find((el) => el.$props.itemData?.id === item.id)
        animations.push(new Promise(resolve => {
          setTimeout(() => {
            itemElement.click();
            resolve();
          }, (i + 1) * this.gameLVLDuration);
        }))
      })
      await Promise.all(animations);
      this.gameStatus = GameStatus.GamePound;
    },
    itemSelected(itemName) {
      if (this.queue.shift().id !== itemName) {
        this.isShow = true;
        this.itemsCount = 4;
        this.createItems();
        this.gameLVLDuration = null;
        this.gameStatus = GameStatus.PreGame;
      }
      if (!this.queue.length) {
        this.gameStatus = GameStatus.PreGame;
        this.itemsCount++;
        this.createItems();
        this.$nextTick(() => this.showExampleRound())
      }
    }
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.grid {
  display: grid;
  grid-template-columns: 200px 200px 200px 200px;
}

input {
  margin-left: 10px;
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>
