<template>
  <div class="board" @click="openList(id)">
    <div class="board__name" v-if="!showInput">
      {{ boardName }}
    </div>
    <input
      type="text"
      class="board__name-input"
      v-else
      v-model="boardName"
      @keydown.enter="editBoard(id, boardName)"
      @keydown.esc="cancelEditingBoard"
      onclick="event.stopPropagation()"
    />

    <div class="board__icons">
      <BootstrapIcon
        v-if="!isFavorite"
        class="board__favorite"
        @click.stop="boardsStore.addFavoriteBoard(id)"
        icon="star"
      />
      <BootstrapIcon
        v-else
        class="board__favorite"
        @click.stop="boardsStore.addFavoriteBoard(id)"
        icon="star-fill"
      />
      <BootstrapIcon
        class="board__edit"
        @click.stop="switchShowInput(id, boardName)"
        icon="pencil"
      />
      <BootstrapIcon
        class="board__delete"
        @click.stop="$emit('deleteBoard', id)"
        icon="trash3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBoardsStore } from "@/store/boards";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

export default defineComponent({
  name: "BoardItem",
  components: {
    BootstrapIcon,
  },
  setup() {
    const boardsStore = useBoardsStore();
    return { boardsStore };
  },
  props: {
    name: { type: String, require: true },
    id: { type: Number, require: true },
    isFavorite: { type: Boolean, require: true },
  },
  emits: ["deleteBoard"],
  data() {
    return {
      boardName: this.name,
      showInput: false,
    };
  },
  methods: {
    switchShowInput(id: number, boardName: string): void {
      if (!this.showInput) {
        this.showInput = true;
      } else if (this.showInput && this.boardName === this.name) {
        this.showInput = false;
      } else {
        this.editBoard(id, boardName);
      }
    },
    editBoard(id: number, boardName: string): void {
      this.boardsStore.editBoardName(id, boardName);
      this.showInput = false;
    },
    cancelEditingBoard(): void {
      this.boardName = this.name;
      this.showInput = false;
    },
    openList(id: number): void {
      this.$router.push(`/tasks/${id}`);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/mixins";

.board {
  @include items-wrapper(150px);

  &__name-input {
    @include items-input(80%);
    align-self: center;
    margin: 0 3px;
  }

  &__icons {
    display: flex;
    justify-content: flex-end;
  }

  &__favorite {
    height: 20px;
    width: 30px;
    fill: #000;

    &:hover {
      fill: #e5aa2a;
    }
  }

  &__edit {
    @include items-edit-btn(20px, 30px);
  }

  &__delete {
    @include items-edit-btn(20px, 20px);
  }
}
</style>
