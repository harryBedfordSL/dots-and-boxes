<script setup lang="ts">
import type { Grid } from '@/types';
import SettingsModal from './modals/SettingsModal.vue';

const grid: Grid = {
  x: 5,
  y: 5
};
</script>

<template>
  <SettingsModal />
  <table class="table">
    <tr v-for="y in grid.y" :key="y">
      <td v-for="x in grid.x" :key="x">
        <div class="dot">+</div>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.table {
  width: 75%;
  height: 100%;
  text-align: center;
}
</style>
