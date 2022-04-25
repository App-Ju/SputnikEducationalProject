<template>
  <draggable-component
    class="boards"
    v-show="boardsStore.isFavoriteBoards.length"
    v-model="boardsStore.isFavoriteBoards"
    item-key="id"
  >
    <template #header>
      <h1 class="boards__title">Favorite</h1>
    </template>
    <template #item="{ element }">
      <board-item
        class="boards__item"
        :name="element.name"
        :id="element.id"
        @delete-board="boardsStore.deleteBoard"
      ></board-item>
    </template>
  </draggable-component>
  <draggable-component
    class="boards"
    v-model="boardsStore.boards"
    item-key="id"
  >
    <template #header>
      <h1 class="boards__title">My Boards</h1>
    </template>
    <template #item="{ element }">
      <board-item
        class="boards__item"
        :name="element.name"
        :id="element.id"
        @delete-board="boardsStore.deleteBoard"
      ></board-item>
    </template>
    <template #footer>
      <board-item-creation
        v-model="boardName"
        @add-board="addBoard"
      ></board-item-creation>
    </template>
  </draggable-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBoardsStore } from "@/store/boards";
import BoardItem from "@/components/BoardItem.vue";
import BoardItemCreation from "@/components/BoardItemCreation.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "BoardsView",
  components: {
    BoardItem,
    BoardItemCreation,
    draggableComponent,
  },
  setup() {
    const boardsStore = useBoardsStore();
    return { boardsStore };
  },
  data() {
    return {
      boardName: "",
    };
  },
  methods: {
    addBoard() {
      if (this.boardName.trim()) {
        this.boardsStore.addBoardName(Date.now(), this.boardName);
        this.boardName = "";
      }
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
