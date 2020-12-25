<template>
  <div ref="container" class="score-container">
    <div class="dots-absolute">
      <div v-for="row in numDotsY" :key="row" class="dot-row">
        <div v-for="col in numDotsX" :key="col" class="dot" :class="{hidden: !shouldShowDot(row, col), activated: shouldActivateDot(row, col)}" />
      </div>
    </div>
    <div class="score">
      {{ display }}
    </div>
  </div>
</template>
<script>
export default {
  mounted: function() {
    this.numDotsX = Math.floor(this.$refs.container.clientWidth / 10);
    this.numDotsY = Math.floor(this.$refs.container.clientHeight / 10);
    if (this.activated) {
      this.lightUpNextDot();
    }
  },
  props: {
    score: Number,
    zero: Boolean,
    activated: Boolean,
  },
  data: function() {
    return {
      numDotsX: 0,
      numDotsY: 0,
      curX: 1,
      curY: 1,
    }
  },
  methods: {
    shouldShowDot: function(row, col) {
      return row == 1 || row == this.numDotsY || col == 1 || col == this.numDotsX;
    },
    shouldActivateDot: function(row, col) {
      return this.activated && row == this.curY && col == this.curX;
    },
    nextDot: function() {
      // no idea if this massive thing will work
      if (this.curX == 1) {
        if (this.curY == 1) {
          this.curX++;
        } else {
          this.curY--;
        }
      } else if (this.curY == 1) {
        if (this.curX == this.numDotsX) {
          this.curY++;
        } else {
          this.curX++;
        }
      } else if (this.curX == this.numDotsX) {
        if (this.curY == this.numDotsY) {
          this.curX--;
        } else {
          this.curY++;
        }
      } else if (this.curY == this.numDotsY) {
        if (this.curX == 1) {
          this.curY--;
        } else {
          this.curX--;
        }
      }
    },
    lightUpNextDot: function() {
      this.nextDot();
      setTimeout(() => {
        if (this.activated) {
          this.lightUpNextDot();
        }
      }, 20);
    },
    beginLightUp: function() {
      this.curX = 1;
      this.curY = 1;
      this.lightUpNextDot();
    }
  },
  watch: {
    activated: function(newVal) {
      if (newVal) {
        this.lightUpNextDot();
      } else {
        this.curX = 0;
        this.curY = 0;
      }
    }
  },
  computed: {
    display: function() {
      return this.zero ? 0 : this.score;
    }
  }
}
</script>
<style lang="scss" scoped>
.score-container {
  position: relative;
  margin: 0 auto;
  height: 80px;
  width: 120px;
  border-radius: 3px;
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 2em;
  box-shadow:
    inset 0px 0px 0px 4px rgb(233, 229, 217),
    inset 0px 0px 0px 8px rgb(85, 85, 85),
    inset 0px 0px 2px 10px rgb(126, 126, 126);
  background-color: rgb(24, 87, 235);

  .score {
    padding: 15px 25px;
  }
}
.dots-absolute {
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;

  .dot-row {
    position: relative;
    display: flex;
    justify-content: space-between;
  }

  .dot {
    height: 8px;
    width: 8px;
    border-radius: 4px;
    margin: 1px;
    background-color: rgb(74, 75, 43);

    transition: background-color 0.4s;

    &.activated {
      transition: background-color 0s;
      background-color: rgb(247, 255, 28);
    }
    &.hidden {
      visibility: hidden;
    }
  }
}
</style>