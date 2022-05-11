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
      @keydown.enter="switchShowInput"
      @keydown.esc="cancelEditingTask"
      @click.stop
    />

    <div class="task__icons">
      <BootstrapIcon
        class="task__edit"
        @click.stop="switchShowInput"
        icon="pencil"
      />
      <BootstrapIcon
        class="task__delete"
        @click.stop="$emit('deleteTask', id)"
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
  },
  emits: ["showModal", "editTask", "deleteTask"],
  data() {
    return {
      taskName: this.name,
      showInput: false,
    };
  },
  mounted() {
    document.body.addEventListener("click", () => {
      this.showInput = false;
    });
  },
  methods: {
    /**
     * Отображает либо скрывает ввод для редактирования имени задачи
     * @param id - id выбранной задачи
     * @param taskName - имя выбранной задачи
     */
    switchShowInput(id: number, taskName: string): void {
      if (!this.showInput) {
        this.showInput = true;
        this.$nextTick(() => (this.$refs.input as HTMLElement).focus());
      } else if (this.showInput && this.taskName === this.name) {
        this.showInput = false;
      } else {
        this.$emit("editTask", this.id, this.taskName, "");
        this.showInput = false;
      }
    },
    /**
     * отменяет редактирование имени задачи
     */
    cancelEditingTask(): void {
      this.taskName = this.name;
      this.showInput = false;
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
