<template>
  <Theme></Theme>
  <Navigation></Navigation>
  <router-view></router-view>
</template>
<script setup name="app">
import Navigation from '@/components/Navigation.vue';
import Theme from './components/Theme/Theme.vue';
</script>

<style lang="scss" src="../src/assets/css/index.scss" scoped>

</style>
