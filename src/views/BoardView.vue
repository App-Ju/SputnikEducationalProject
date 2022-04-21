<template>
  <draggable-component
    class="boards"
    v-show="isFavoriteBoards.length"
    v-model="isFavoriteBoards"
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
        @delete-board="deleteBoard"
      ></board-item>
    </template>
  </draggable-component>
  <draggable-component class="boards" v-model="boards" item-key="id">
    <template #header>
      <h1 class="boards__title">My Boards</h1>
    </template>
    <template #item="{ element }">
      <board-item
        class="boards__item"
        :name="element.name"
        :id="element.id"
        @delete-board="deleteBoard"
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
import { mapWritableState, mapActions } from "pinia";
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
    return {
      boardName: "",
    };
  },
  computed: {
    ...mapWritableState(useBoardsStore, ["boards", "isFavoriteBoards"]),
  },
  methods: {
    ...mapActions(useBoardsStore, ["deleteBoard", "addBoardName"]),
    addBoard() {
      if (this.boardName.trim()) {
        this.addBoardName(Date.now(), this.boardName);
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
