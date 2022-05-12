<template>
  <div class="wrapper" @click="closeAllInput" :key="componentKey">
    <draggable-component
      class="boards"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
        appear: true,
      }"
      v-show="boardsStore.isFavoriteBoards.length"
      v-model="boardsStore.isFavoriteBoards"
      :="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :group="{ name: 'favorite' }"
    >
      <template #header>
        <h1 class="boards__title">Favorite</h1>
      </template>
      <template #item="{ element }">
        <board-item
          class="boards__item"
          :name="element.name"
          :id="element.id"
          :is-favorite="element.isFavorite"
          :show-input="element.isShowInput"
          @edit-board="editBoard"
          @delete-board="boardsStore.deleteBoard"
          @add-favorite="boardsStore.addFavoriteBoard"
          @open-list="openList"
          @close-input="closeAllInput"
        />
      </template>
    </draggable-component>
    <draggable-component
      class="boards"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
        appear: true,
      }"
      v-model="boardsStore.boards"
      :="dragOptions"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      :group="{ name: 'main' }"
    >
      <template #header>
        <h1 class="boards__title">My Boards</h1>
      </template>
      <template #item="{ element }">
        <board-item
          class="boards__item"
          :name="element.name"
          :id="element.id"
          :is-favorite="element.isFavorite"
          :show-input="element.isShowInput"
          @edit-board="editBoard"
          @delete-board="boardsStore.deleteBoard"
          @add-favorite="boardsStore.addFavoriteBoard"
          @open-list="openList"
          @close-input="closeAllInput"
        />
      </template>
      <template #footer>
        <board-item-creation
          v-model="boardName"
          @add-board="addBoard"
          @cancel-input="cancelInput"
        />
      </template>
    </draggable-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBoardsStore } from "@/store/boards";
import BoardItem from "@/components/BoardItem.vue";
import BoardItemCreation from "@/components/BoardItemCreation.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "BoardsView",
  display: "Transitions",
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
      drag: false,
      componentKey: 0,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  methods: {
    /**
     * Добавляет новую доску в стейт boards
     */
    addBoard(): void {
      if (this.boardName.trim()) {
        this.boardsStore.addBoardName(Date.now(), this.boardName);
        this.boardName = "";
      }
    },
    /**
     * Отменяет ввод имени для новой доски
     */
    cancelInput(): void {
      this.boardName = "";
    },
    /**
     * Изменяет имя выбранной доски
     * @param id - id выбранной доски
     * @param boardName - имя выбранной доски
     */
    editBoard(id: number, boardName: string): void {
      this.boardsStore.editBoardName(id, boardName);
      this.forceRerender();
    },
    /**
     * Открывает страницу со списками задач для выбранной доски
     * @param id - id выбранной доски
     */
    openList(id: number): void {
      this.$router.push(`/tasks/${id}`);
    },
    /**
     * Скрывает все инпуты для изменения имени доски, кроме быбранного
     * @param id - id выбранной доски
     */
    closeAllInput(id: number) {
      this.boardsStore.boards.forEach((el) =>
        el.id !== id ? (el.isShowInput = false) : ""
      );
    },
    /**
     * Отрисовывает компонент заново, используется при изменении имени доски
     */
    forceRerender() {
      this.componentKey += 1;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/variables";

.wrapper {
  width: 100vw;
  height: calc(100vh - 74px);
}

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

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: $background-color-page;
}
</style>
