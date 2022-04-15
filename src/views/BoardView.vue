<template>
  <div class="boards">
    <board-item
      class="boards__item"
      v-for="board in boards"
      :key="board.id"
      :name="board.name"
      :id="board.id"
    ></board-item>
    <board-item-creation></board-item-creation>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BoardItem from "@/components/BoardItem.vue"; // @ is an alias to /src
import { mapState } from "pinia";
import { useBoardsStore } from "@/store/boards";
import BoardItemCreation from "@/components/BoardItemCreation.vue";

export default defineComponent({
  name: "BoardsView",
  components: {
    BoardItemCreation,
    BoardItem,
  },
  computed: {
    ...mapState(useBoardsStore, ["boards"]),
  },
});
</script>

<style lang="scss" scoped>
.boards {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 1%;
  }
}
</style>
