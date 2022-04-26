<template>
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
              :list-name="listName"
            ></task-item>
          </template>
        </draggable-component>
      </list-item>
    </template>
    <template #footer>
      <list-item-creation
        v-model="listName"
        @add-list="addList"
      ></list-item-creation>
    </template>
  </draggable-component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useListsStore } from "@/store/lists";
import ListItem from "@/components/ListItem.vue";
import ListItemCreation from "@/components/ListItemCreation.vue";
import TaskItem from "@/components/TaskItem.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "TasksView",
  components: {
    ListItem,
    ListItemCreation,
    TaskItem,
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
</style>
