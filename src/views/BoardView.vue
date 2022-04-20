<template>
  <div class="boards" v-show="favoriteBoards.length">
    <h1 class="boards__title">Favorite</h1>
    <board-item
      class="boards__item"
      v-for="board in favoriteBoards"
      :key="board.id"
      :name="board.name"
      :id="board.id"
      :isFavorite="board.isFavorite"
    ></board-item>
  </div>
  <draggable-component class="boards" v-model="boards" item-key="id">
    <template #header>
      <h1 class="boards__title">My Boards</h1>
    </template>
    <template #item="{ element }">
      <board-item
        class="boards__item"
        :name="element.name"
        :id="element.id"
        :isFavorite="element.isFavorite"
      ></board-item>
    </template>
    <template #footer>
      <board-item-creation></board-item-creation>
    </template>
  </draggable-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useBoardsStore } from "@/store/boards";
import BoardItem from "@/components/BoardItem.vue"; // @ is an alias to /src
import BoardItemCreation from "@/components/BoardItemCreation.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "BoardsView",
  components: {
    BoardItem,
    BoardItemCreation,
    draggableComponent,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(useBoardsStore, ["boards", "isFavoriteBoards"]),
    favoriteBoards: (store) => store.isFavoriteBoards,
  },
  methods: {
    dragEnd() {
      console.log(this.boards);
    },
  },
});
</script>

<style lang="scss" scoped>
.boards {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  &__title {
    font-size: 2rem;
    width: 100%;
  }

  &__item {
    padding: 1%;
  }
}
</style>
