<template>
  <div class="form">
    <h2 class="form__title">Создать доску</h2>
    <input
      class="form__input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Заголовок доски"
      @keydown.enter="$emit('addBoard')"
    />
    <button class="form__button" @click="$emit('addBoard')">Создать</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BoardItemCreation",
  props: ["modelValue"],
  emits: ["update:modelValue", "addBoard"],
});
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 150px;
  width: 23%;
  background: #e3ded9;
  margin: 1%;

  &__input {
    width: 80%;
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
