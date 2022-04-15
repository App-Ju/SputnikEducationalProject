<template>
  <div class="board">
    {{ name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardItem",
  props: {
    name: { type: String, require: true },
  },
});
</script>

<style lang="scss" scoped>
.board {
  height: 150px;
  width: 23%;
  background: #e3ded9;
  margin: 1%;
}
</style>
