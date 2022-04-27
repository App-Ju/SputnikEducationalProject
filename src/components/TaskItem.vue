<template>
  <div class="task">
    <div class="task__name" v-if="!showInput">
      {{ taskName }}
    </div>
    <input
      type="text"
      class="task__name-input"
      v-else
      v-model="taskName"
      @keydown.esc="cancelEditingTask"
    />

    <div class="task__icons">
      <BootstrapIcon
        class="task__edit"
        @click.stop="switchShowInput(id, taskName)"
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
  data() {
    return {
      taskName: this.name,
      showInput: false,
    };
  },
  computed: {},
  methods: {
    /**
     * Отображает либо скрывает ввод для редактирования имени задачи
     * @param id - id выбранной задачи
     * @param taskName - имя выбранной задачи
     */
    switchShowInput(id: number, taskName: string): void {
      if (!this.showInput) {
        this.showInput = true;
      } else if (this.showInput && this.taskName === this.name) {
        this.showInput = false;
      } else {
        this.editTask(id, taskName);
      }
    },
    /**
     * Изменяет имя выбранной задачи
     * @param id - id выбранной задачи
     * @param taskName - имя выбранной задачи
     */
    editTask(id: number, taskName: string): void {
      this.showInput = true;
      this.listsStore.editTaskName(id, taskName);
      this.showInput = false;
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
    @include items-edit-btn(16px, 16px);
  }

  &__delete {
    @include items-edit-btn(16px, 26px);
  }
}
</style>
