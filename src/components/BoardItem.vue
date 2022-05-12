<template>
  <div class="board" @click="$emit('openList', id)" v-click-away="onClickAway">
    <div class="board__name" v-show="!showInput">
      {{ boardName }}
    </div>
    <input
      type="text"
      class="board__name-input"
      ref="input"
      v-show="showInput"
      v-model="boardName"
      @keydown.enter="switchShowInput"
      @keydown.esc="cancelEditingBoard"
      @click.stop
    />
    <div class="board__icons" @click.stop>
      <BootstrapIcon
        class="board__favorite"
        @click.stop="
          $emit('addFavorite', id);
          $emit('closeInput', id);
        "
        :icon="favoriteIcon"
      />
      <BootstrapIcon
        class="board__edit"
        @click.stop="
          switchShowInput();
          $emit('closeInput', id);
        "
        icon="pencil"
      />
      <BootstrapIcon
        class="board__delete"
        @click.stop="
          $emit('deleteBoard', id);
          $emit('closeInput', id);
        "
        icon="trash3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useBoardsStore } from "@/store/boards";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { directive } from "vue3-click-away";

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
    // showInput: { type: Boolean, require: true },
  },
  emits: ["deleteBoard", "addFavorite", "openList", "editBoard", "closeInput"],
  data() {
    return {
      boardName: this.name,
      showInput: false,
    };
  },
  computed: {
    favoriteIcon() {
      return this.isFavorite ? "star-fill" : "star";
    },
  },
  methods: {
    /**
     * Отображает либо скрывает ввод для редактирования имени доски
     */
    switchShowInput(): void {
      if (!this.showInput) {
        this.showInput = true;
        this.$nextTick(() => (this.$refs.input as HTMLElement).focus());
      } else if (this.showInput && this.boardName === this.name) {
        this.showInput = false;
      } else {
        this.$emit("editBoard", this.id, this.boardName);
        this.showInput = false;
      }
    },
    /**
     * Отменяет редактирование доски
     */
    cancelEditingBoard(): void {
      this.boardName = this.name;
      this.showInput = false;
    },
    onClickAway(event) {
      this.showInput = false;
    },
  },
  directives: {
    ClickAway: directive,
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
    @include items-icon-btn(20px, 30px, #e5aa2a);
  }

  &__edit {
    @include items-icon-btn(20px, 30px, $btn-edit-color);
  }

  &__delete {
    @include items-icon-btn(20px, 20px, $btn-delete-color);
  }
}
</style>
