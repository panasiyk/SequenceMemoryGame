<template>
  <div :class="style" class="item" @click="click"></div>
</template>

<script>
import Sound from "@/Service/Sound";
import {GameStatus} from "@/Service/Helper";

let timeId = -1;
export default {
  name: "ItemElement",
  props: {
    itemData: {
      require: true,
      type: Object
    },
    gameStatus: {
      require: true,
      type: String
    },
  },
  data: () => ({
    needHighlighted: false,
  }),
  computed: {
    isGameRound() {
      return this.gameStatus === GameStatus.GamePound
    },
    style() {
      return {
        "disabled": !this.isGameRound,
        "highlight": this.needHighlighted,
      }
    }
  },
  methods: {
    click() {
      Sound.playSound(this.itemData.soundType, this.itemData.soundValue);
      this.needHighlighted = true;
      clearTimeout(timeId);
      timeId = setTimeout(() => this.needHighlighted = false, 50)
      if (this.isGameRound)
        this.$emit("select", this.itemData.id)
    }
  }
}
</script>

<style scoped>
.item {
  margin: 10px;
  width: 150px;
  height: 150px;
  background: #5fbce2;
  cursor: pointer;
}

.disabled {
  pointer-events: none;
}

.highlight {
  background: #e55c5c;
}
</style>
