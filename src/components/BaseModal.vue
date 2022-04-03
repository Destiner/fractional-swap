<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="wrapper"
    >
      <div
        class="blocker"
        @click="close"
      />
      <div class="view">
        <div class="header">
          {{ title }}
          <IconClose
            class="icon"
            @click="close"
          />
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script
  setup
  lang="ts"
>
import IconClose from './icons/IconClose.vue';

defineProps({
  open: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['close']);

function close() {
  emit('close');
}
</script>

<style scoped>
.blocker {
  content: ' ';
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: #00000080;
}

.view {
  display: flex;
  position: fixed;
  top: 50vh;
  left: 50vw;
  flex-direction: column;
  min-width: 360px;
  max-width: 100%;
  height: 520px;
  max-height: 80%;
  padding: 8px;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding: 0 8px;
  font-size: 24px;
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
