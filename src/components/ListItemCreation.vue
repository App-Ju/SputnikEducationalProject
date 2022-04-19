<template>
  <div class="form">
    <input
      class="form__input"
      v-model="listName"
      placeholder="Заголовок списка"
      @keydown.enter="addList"
    />
    <button class="form__button" @click="addList">Создать</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useListsStore } from "@/store/lists";
import { mapActions } from "pinia";

export default defineComponent({
  name: "ListItemCreation",
  components: {},
  props: {
    boardId: { type: Number, require: true },
  },
  data() {
    return {
      listName: "",
    };
  },
  computed: {},
  methods: {
    ...mapActions(useListsStore, ["addListName"]),
    addList() {
      if (this.listName.trim()) {
        this.addListName(this.boardId!, Date.now(), this.listName);
        this.listName = "";
      }
    },
  },
  mounted() {
    console.log(this.boardId);
  },
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 23%;
  background: #e3ded9;
  margin: 1%;
  padding: 10px;

  &__input {
    width: 80%;
    margin-bottom: 10px;
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

  &__button {
    width: 50%;
    height: 20px;
    border: 1px solid rgba(44, 62, 80, 0.38);
    border-radius: 3px;

    &:hover {
      background: #e8e5e1;
    }
  }
}
</style>
