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
    :component-data="{
      tag: 'div',
      type: 'transition-group',
    }"
    v-model="listsStore.currentBoardLists"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="id"
  >
    <template #item="{ element }">
      <list-item
        class="lists__item"
        :name="element.name"
        :id="element.id"
        @dit-list="editList"
        @delete-list="deleteList(element.id)"
      >
        <draggable-component
          :component-data="{
            tag: 'div',
            type: 'transition-group',
          }"
          :list="element.tasks"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
          :group="{ name: 'element' }"
        >
          <template #item="{ element }">
            <task-item
              class="lists__task"
              :name="element.name"
              :id="element.id"
              @show-modal="showModal"
              @add-task="addTask"
              @delete-task="listsStore.deleteTask(element.id)"
            />
          </template>
        </draggable-component>
      </list-item>
    </template>
    <template #footer>
      <list-item-creation
        v-model="listName"
        @add-list="addList"
        @cancel-input="cancelInput"
      />
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
  name: "ListAndTaskView",
  display: "Transitions",
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
      drag: false,
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  created() {
    this.listsStore.cutListsState(this.boardId);
  },
  beforeUnmount() {
    this.listsStore.concatListsState();
  },
  methods: {
    /**
     * Добавляет список в стейт currentBoardLists
     */
    addList(): void {
      if (this.listName.trim()) {
        this.listsStore.addListName(this.boardId!, Date.now(), this.listName);
        this.listName = "";
      }
    },
    /**
     * Изменяет имя выбранного списка
     * @param id - id выбранного списка
     * @param listName- имя выбранного списка
     */
    editList(id: number, listName: string): void {
      this.listsStore.editListName(id, listName);
    },
    /**
     * Отменяет ввод нового имени списка
     */
    cancelInput(): void {
      this.listName = "";
    },
    /**
     * Удаляет список из стейта currentBoardLists
     * @param id - id удаляемого списка
     */
    deleteList(id: number): void {
      this.listsStore.deleteList(id);
    },
    /**
     * Добавляет новую задачу в список
     */
    addTask(id: number): void {
      if (this.taskName.trim()) {
        this.listsStore.addTaskName(id, Date.now(), this.taskName);
        this.taskName = "";
      }
    },
    /**
     * Изменяет данные выбранной задачи
     */
    editTask(): void {
      this.listsStore.editTask(
        this.taskId,
        this.taskName,
        this.taskDescription
      );
      (this.$refs.modal as InstanceType<typeof ModalWindow>).show = false;
      this.$forceUpdate;
    },
    /**
     * Отвечат за отображение модального окна
     * @param id - id выбранной задачи
     */
    showModal(id: number): void {
      const taskData = this.listsStore.getCurrentTaskData(id);
      this.taskId = id;
      this.taskName = taskData.name;
      this.taskDescription = taskData.description;
      (this.$refs.modal as InstanceType<typeof ModalWindow>).show = true;
    },
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

.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
