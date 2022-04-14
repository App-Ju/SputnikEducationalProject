<template>
  <main class="boards-wrapper">
    <h1>ВАШИ РАБОЧИЕ ПРОСТРАНСТВА</h1>
    <div>
      <ul class="board-list">
        <li class="board-list__item">{{ title }}</li>
        <li class="board-list__item">Создать доску</li>
      </ul>
    </div>
  </main>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { useBoardsStore } from "@/store/boards";

export default {
  name: "BoardsComponent",
  computed: {
    ...mapState(useBoardsStore, ["title"]),
  },
};
</script>

<style lang="scss" scoped>
.boards-wrapper {
  width: 80%;
  margin: 0 auto;
}

.board-list {
  display: flex;
  flex-wrap: wrap;
}

.board-list__item {
  display: block;
  background: beige;
  margin: 1%;
  padding: 1%;
  width: 23%;
  height: 150px;
}
</style>
