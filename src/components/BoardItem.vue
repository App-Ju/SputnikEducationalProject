<template>
  <div class="board">
    {{ name }}
    <svg
      class="board__delete"
      @click="deleteBoard(id)"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path
        d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useBoardsStore } from "@/store/boards";

export default defineComponent({
  name: "BoardItem",
  props: {
    name: { type: String, require: true },
    id: { type: Number, require: true },
  },
  methods: {
    ...mapActions(useBoardsStore, ["deleteBoard"]),
  },
});
</script>

<style lang="scss" scoped>
.board {
  position: relative;
  height: 150px;
  width: 23%;
  background: #e3ded9;
  margin: 1%;

  &__delete {
    height: 24px;
    width: 24px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    fill: #000;

    &:hover {
      fill: #e31515;
    }
  }
}
</style>
