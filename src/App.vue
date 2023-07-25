<template>
  <Theme></Theme>
  <Navigation></Navigation>
  <router-view></router-view>
</template>
<script setup>
import Navigation from '@/components/Navigation.vue';
import Theme from './components/Theme/Theme.vue';
</script>

<style lang="less" scoped></style>
