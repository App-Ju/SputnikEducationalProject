<template>
  <modal-window ref="modal">
    <template v-slot:name>
      <input type="text" class="modal__name" v-model="taskName" />
    </template>
    <template v-slot:description>
      <textarea class="modal__description" v-model="taskDescription" />
    </template>
    <template v-slot:footer>
      <button class="modal__footer-button" @click="editTask">Ok</button>
    </template>
  </modal-window>
  <draggable-component
    class="lists"
    v-model="listsStore.currentBoardLists"
    item-key="id"
  >
    <template #item="{ element }">
      <list-item
        class="lists__item"
        :name="element.name"
        :id="element.id"
        @delete-list="deleteList(element.id)"
      >
        <draggable-component
          :list="element.tasks"
          item-key="id"
          :group="{ name: 'element' }"
        >
          <template #item="{ element }">
            <task-item
              class="lists__task"
              :name="element.name"
              :id="element.id"
              @click.self="showModal(element.id)"
              @delete-task="listsStore.deleteTask(element.id)"
            />
          </template>
        </draggable-component>
      </list-item>
    </template>
    <template #footer>
      <list-item-creation v-model="listName" @add-list="addList" />
    </template>
  </draggable-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useListsStore } from "@/store/lists";
import ListItem from "@/components/ListItem.vue";
import ListItemCreation from "@/components/ListItemCreation.vue";
import TaskItem from "@/components/TaskItem.vue";
import ModalWindow from "@/components/ModalWindow.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "TasksView",
  components: {
    ListItem,
    ListItemCreation,
    TaskItem,
    ModalWindow,
    draggableComponent,
  },
  setup() {
    const listsStore = useListsStore();
    return { listsStore };
  },
  props: {},
  data() {
    return {
      boardId: Number(this.$route.params.id),
      listName: "",
      taskId: NaN,
      taskName: "",
      taskDescription: "",
    };
  },
  computed: {},
  methods: {
    addList() {
      if (this.listName.trim()) {
        this.listsStore.addListName(this.boardId!, Date.now(), this.listName);
        this.listName = "";
        this.listsStore.showCurrentBoardStore(this.boardId);
      }
    },
    deleteList(id: number) {
      this.listsStore.deleteList(id);
      this.listsStore.showCurrentBoardStore(this.boardId);
    },
    showModal(id: number) {
      const taskData = this.listsStore.openTask(id);
      this.taskId = id;
      this.taskName = taskData[0];
      this.taskDescription = taskData[1];
      (this.$refs.modal as InstanceType<typeof ModalWindow>).show = true;
    },
    editTask() {
      this.listsStore.editTask(
        this.taskId,
        this.taskName,
        this.taskDescription
      );
      (this.$refs.modal as InstanceType<typeof ModalWindow>).show = false;
      this.$forceUpdate;
    },
  },
  created() {
    this.listsStore.showCurrentBoardStore(this.boardId);
  },
});
</script>

<style lang="scss" scoped>
.lists {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;

  &__item {
    padding: 1%;
  }
}

.modal__name {
  width: 80%;
  padding: 3px 6px;
  border: 1px solid rgba(44, 62, 80, 0.38);
  border-radius: 3px;
  align-self: center;
  margin-bottom: 20px;
  outline: none;
}

.modal__description {
  width: 80%;
  padding: 3px 6px;
  border: 1px solid rgba(44, 62, 80, 0.38);
  border-radius: 3px;
  align-self: center;
  margin-bottom: 20px;
  outline: none;
  height: 200px;
  resize: none;
}

.modal__footer-button {
  align-self: center;
  width: 30%;
  height: 20px;
  border: 1px solid rgba(44, 62, 80, 0.38);
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background: #e8e5e1;
  }
}
</style>
