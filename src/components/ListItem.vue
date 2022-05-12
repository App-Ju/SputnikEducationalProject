<template>
  <div class="list">
    <div class="list__name" v-show="!showInput">
      {{ listName }}
    </div>
    <input
      type="text"
      class="list__name-input"
      ref="input"
      v-show="showInput"
      v-model="listName"
      @click.stop
      @keydown.enter="switchShowInput"
      @keydown.esc="cancelEditingList"
    />
    <slot />
    <div class="list__icons">
      <input
        class="list__task-name-input"
        ref="addTaskInput"
        v-show="addTaskInput"
        v-model="taskName"
        placeholder="Заголовок задачи"
        @keydown.enter="addTask"
        @keydown.esc="cancelInput"
      />
      <BootstrapIcon
        class="list__edit"
        @click.stop="
          addTask();
          $emit('closeListInput', id);
        "
        icon="plus-square"
      />
      <BootstrapIcon
        class="list__edit"
        @click.stop="
          switchShowInput();
          $emit('closeListInput', id);
        "
        icon="pencil"
      />
      <BootstrapIcon
        class="list__delete"
        @click.stop="
          $emit('deleteList', id);
          $emit('closeListInput', id);
        "
        icon="trash3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useListsStore } from "@/store/lists";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

export default defineComponent({
  name: "ListItem",
  components: {
    BootstrapIcon,
  },
  setup() {
    const listsStore = useListsStore();
    return { listsStore };
  },
  props: {
    name: { type: String, require: true },
    id: { type: Number, require: true },
    boardId: { type: Number, require: true },
    showInput: { type: Boolean, require: true },
  },
  emits: ["editList", "deleteList", "closeListInput"],
  data() {
    return {
      listName: this.name,
      taskName: "",
      addTaskInput: false,
    };
  },
  methods: {
    /**
     * Отображает либо скрывает ввод для редактирования имени списка
     */
    switchShowInput(): void {
      if (!this.showInput) {
        this.listsStore.showListInput(this.id!);
        this.$nextTick(() => (this.$refs.input as HTMLElement).focus());
      } else if (this.showInput && this.listName === this.name) {
        this.listsStore.hideListInput(this.id!);
      } else {
        this.$emit("editList", this.id, this.listName);
        this.listsStore.hideListInput(this.id!);
      }
    },
    /**
     * Отменяет редактирование списка
     */
    cancelEditingList(): void {
      this.listName = this.name;
      this.listsStore.hideListInput(this.id!);
    },
    /**
     * Добавляет новую задачу в список
     */
    addTask(): void {
      if (!this.addTaskInput) {
        this.addTaskInput = true;
        this.$nextTick(() => (this.$refs.addTaskInput as HTMLElement).focus());
      } else if (this.taskName.trim()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.listsStore.addTaskName(this.id!, Date.now(), this.taskName);
        this.taskName = "";
        this.addTaskInput = false;
      } else {
        this.addTaskInput = false;
      }
    },
    /**
     * Отменяет ввод нового имени для задачи
     */
    cancelInput(): void {
      this.taskName = "";
      this.addTaskInput = false;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/mixins";

.list {
  @include items-wrapper(min-content);

  &__name {
    margin-bottom: 10px;
  }

  &__name-input {
    @include items-input(80%);
    align-self: center;
    margin: 0 3px;
  }

  &__icons {
    display: flex;
    justify-content: flex-end;
    margin-top: 6px;
  }

  &__task-name-input {
    @include items-input(65%);
  }

  &__edit {
    @include items-icon-btn(20px, 30px, $btn-edit-color);
  }

  &__delete {
    @include items-icon-btn(20px, 20px, $btn-delete-color);
  }
}
</style>
