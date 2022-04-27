<template>
  <div class="list">
    <div class="list__name" v-if="!showInput">
      {{ listName }}
    </div>
    <input
      type="text"
      class="list__name-input"
      v-else
      v-model="listName"
      @keydown.enter="editList(id, listName)"
      @keydown.esc="cancelEditingList"
    />
    <slot></slot>
    <div class="list__icons">
      <input
        class="list__task-name-input"
        v-model="taskName"
        placeholder="Заголовок задачи"
        @keydown.enter="addTask"
      />
      <BootstrapIcon
        class="list__edit"
        @click.stop="addTask"
        icon="plus-square"
      />
      <BootstrapIcon
        class="list__edit"
        @click.stop="switchShowInput(id, listName)"
        icon="pencil"
      />
      <BootstrapIcon
        class="list__delete"
        @click.stop="$emit('deleteList', id)"
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
  },
  data() {
    return {
      listName: this.name,
      taskName: "",
      showInput: false,
    };
  },
  computed: {},
  methods: {
    switchShowInput(id: number, listName: string) {
      if (!this.showInput) {
        this.showInput = true;
      } else if (this.showInput && this.listName === this.name) {
        this.showInput = false;
      } else {
        this.editList(id, listName);
      }
    },
    editList(id: number, listName: string) {
      this.listsStore.editListName(id, listName);
      this.showInput = false;
    },
    cancelEditingList() {
      this.listName = this.name;
      this.showInput = false;
    },
    addTask() {
      if (this.taskName.trim()) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.listsStore.addTaskName(this.id!, Date.now(), this.taskName);
        this.taskName = "";
      }
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
    @include items-edit-btn(20px, 30px);
  }

  &__delete {
    @include items-edit-btn(20px, 20px);
  }
}
</style>
