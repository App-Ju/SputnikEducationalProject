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
    />

    <div class="board__icons">
      <BootstrapIcon
        class="board__favorite"
        @click.stop="changeFavoriteBoard(id)"
        icon="star"
      />
      <BootstrapIcon
        class="board__edit"
        @click.stop="switchShowInput(id, boardName)"
        icon="pencil"
      />
      <BootstrapIcon
        class="board__delete"
        @click.stop="deleteBoard(id)"
        icon="trash3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "pinia";
import { useBoardsStore } from "@/store/boards";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

export default defineComponent({
  name: "BoardItem",
  components: {
    BootstrapIcon,
  },
  props: {
    name: { type: String, require: true },
    id: { type: Number, require: true },
    isFavorite: { type: Boolean, require: true },
  },
  data() {
    return {
      boardName: this.name,
      showInput: false,
    };
  },
  methods: {
    ...mapActions(useBoardsStore, [
      "deleteBoard",
      "editBoardName",
      "changeFavoriteBoard",
    ]),
    switchShowInput(id: number, boardName: string) {
      if (!this.showInput) {
        this.showInput = true;
      } else if (this.showInput && this.boardName === this.name) {
        this.showInput = false;
      } else {
        this.editBoard(id, boardName);
        this.showInput = false;
      }
    },
    editBoard(id: number, boardName: string) {
      this.editBoardName(id, boardName);
      this.showInput = false;
    },
    cancelEditingBoard() {
      this.boardName = this.name;
      this.showInput = false;
    },
    openList(id: number) {
      this.$router.push(`/tasks/${id}`);
    },
  },
});
</script>

<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  width: 23%;
  background: #e3ded9;
  margin: 1%;

  &__name-input {
    align-self: center;
    width: 80%;
    margin: 0 3px;
    padding: 3px 6px;
    border: 1px solid rgba(44, 62, 80, 0.38);
    border-radius: 3px;

    &:hover {
      border: 1px solid #e31515;
    }

    &:focus {
      outline: none;
      border: 1px solid #154fe3;
    }
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
    height: 20px;
    width: 30px;
    fill: #000;

    &:hover {
      fill: #155de3;
    }
  }

  &__delete {
    height: 20px;
    width: 20px;
    fill: #000;

    &:hover {
      fill: #e31515;
    }
  }
}
</style>
