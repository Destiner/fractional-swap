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
  gap: 32px;
  top: 50vh;
  left: 50vw;
  flex-direction: column;
  min-width: 360px;
  max-width: 100%;
  max-height: 80%;
  padding: 16px;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #ffffffd0;
  -webkit-backdrop-filter: blur(4px);
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 32px 0 #1f26875f;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.icon {
  width: 18px;
  height: 18px;
}
</style>
