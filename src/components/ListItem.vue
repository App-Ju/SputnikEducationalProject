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

    <div class="list__icons">
      <input
        class="list__task-name-input"
        v-model="taskName"
        placeholder="Заголовок задачи"
        @keydown.enter="addTask"
      />
      <BootstrapIcon class="list__edit" icon="plus-square" />
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
      console.log("add");
    },
  },
});
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 23%;
  background: #e3ded9;
  margin: 1%;

  &__name {
    margin-bottom: 10px;
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
    height: 20px;
    width: 30px;
    fill: #000;

    &:hover {
      fill: #155de3;
    }
  }

  &__delete {
    height: 20px;
    width: 20px;
    fill: #000;

    &:hover {
      fill: #e31515;
    }
  }
}
</style>
