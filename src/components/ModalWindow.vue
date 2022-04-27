<template>
  <div v-show="show" class="modal__cloak" @click.self="closeModal">
    <div class="modal">
      <div class="modal__close" @click="closeModal">&#10006;</div>
      <slot name="name" />
      <slot name="description" />
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalWindow",
  components: {},
  props: {},
  data() {
    return {
      show: false,
    };
  },
  computed: {},
  methods: {
    /**
     * Закрывает модальное окно
     */
    closeModal(): void {
      this.show = false;
    },
  },
});
</script>

<style lang="scss" scoped>
.modal__cloak {
  position: absolute;
  top: 0;
  left: 0;
  min-height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.39);
}

.modal {
  display: flex;
  flex-direction: column;
  background: #e3ded9;
  border-radius: 8px;
  padding: 30px 15px;
  min-width: 420px;
  max-width: 480px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  &__close {
    border-radius: 50%;
    border: 1px solid rgba(44, 62, 80, 0.38);
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;

    &:hover {
      border: 1px solid #e31515;
      color: #e31515;
    }
  }
}
</style>
