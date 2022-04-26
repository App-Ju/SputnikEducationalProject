<template>
  <div class="form">
    <input
      class="form__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Заголовок списка"
      @keydown.enter="$emit('addList')"
    />
    <button class="form__button" @click="$emit('addList')">Создать</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ListItemCreation",
  props: ["modelValue"],
  emits: ["update:modelValue", "addList"],
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 23%;
  height: min-content;
  background: #e3ded9;
  margin: 1%;
  padding: 11px;

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
