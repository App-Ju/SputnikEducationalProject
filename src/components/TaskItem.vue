<template>
  <div class="task" @click="$emit('showModal', id)">
    <div class="task__name" v-show="!showInput">
      {{ taskName }}
    </div>
    <input
      type="text"
      class="task__name-input"
      ref="input"
      v-show="showInput"
      v-model="taskName"
      @keydown.enter="switchShowInput()"
      @keydown.esc="cancelEditingTask"
      @click.stop
    />

    <div class="task__icons">
      <BootstrapIcon
        class="task__edit"
        @click.stop="
          switchShowInput();
          $emit('closeTaskInput', id);
        "
        icon="pencil"
      />
      <BootstrapIcon
        class="task__delete"
        @click.stop="
          $emit('deleteTask', id);
          $emit('closeTaskInput', id);
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
  name: "TaskItem",
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
    showInput: { type: Boolean, require: true },
  },
  emits: ["showModal", "editTask", "deleteTask", "closeTaskInput"],
  data() {
    return {
      taskName: this.name,
    };
  },
  methods: {
    /**
     * Отображает либо скрывает ввод для редактирования имени задачи
     */
    switchShowInput(): void {
      if (!this.showInput) {
        this.listsStore.showTaskInput(this.id!);
        this.$nextTick(() => (this.$refs.input as HTMLElement).focus());
      } else if (this.showInput && this.taskName === this.name) {
        this.listsStore.hideTaskInput(this.id!);
      } else {
        this.$emit("editTask", this.id, this.taskName, "");
        this.listsStore.hideTaskInput(this.id!);
      }
    },
    /**
     * отменяет редактирование имени задачи
     */
    cancelEditingTask(): void {
      this.taskName = this.name;
      this.listsStore.hideTaskInput(this.id!);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../assets/css/mixins";
@import "../assets/css/variables";

.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  background: #f5f2f1;
  padding: 6px;
  margin: 2% auto;

  &__name-input {
    @include items-input(80%);
    align-self: center;
    margin: 0 3px;
  }

  &__icons {
    display: flex;
    justify-content: flex-end;
  }

  &__task-name-input {
    @include items-input(65%);
  }

  &__edit {
    @include items-icon-btn(16px, 16px, $btn-edit-color);
  }

  &__delete {
    @include items-icon-btn(16px, 26px, $btn-delete-color);
  }
}
</style>
