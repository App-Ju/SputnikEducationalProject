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
    switchShowInput(id: number, taskName: string) {
      if (!this.showInput) {
        this.showInput = true;
      } else if (this.showInput && this.taskName === this.name) {
        this.showInput = false;
      } else {
        this.editTask(id, taskName);
      }
    },
    editTask(id: number, taskName: string) {
      this.showInput = true;
      this.listsStore.editTaskName(id, taskName);
      this.showInput = false;
    },
    cancelEditingTask() {
      this.taskName = this.name;
      this.showInput = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  background: #f5f2f1;
  padding: 6px;
  margin: 2% auto;

  &__name {
    //margin-bottom: 10px;
  }
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

  &__task-name-input {
    width: 65%;
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

  &__edit {
    height: 16px;
    width: 16px;
    fill: #000;

    &:hover {
      fill: #155de3;
    }
  }

  &__delete {
    height: 16px;
    width: 26px;
    fill: #000;

    &:hover {
      fill: #e31515;
    }
  }
}
</style>
