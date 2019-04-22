<template>
  <div id="app">
    <app-header></app-header>
    <app-tab></app-tab>
    <router-view/>
  </div>
</template>

<script>
import AppHeader from './common/header/AppHeader'
import AppTab from './common/tab/AppTab'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppTab
  }
}
</script>

<style>
</style>
