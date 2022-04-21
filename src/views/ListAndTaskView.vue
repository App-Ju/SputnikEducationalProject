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
        @delete-list="listsStore.deleteList"
      >
        <div class="lists__tasks">1</div>
        <div class="lists__tasks-creation">2</div>
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
import listItemCreation from "@/components/ListItemCreation.vue";
import draggableComponent from "vuedraggable";

export default defineComponent({
  name: "TasksView",
  components: {
    ListItem,
    listItemCreation,
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
      }
    },
  },
  created() {
    this.listsStore.changeCurrentBoardStore(this.boardId);
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
