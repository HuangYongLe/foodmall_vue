<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'MoveXAnimation'
}
</script>

<style lang="stylus" scoped>
  .v-enter, .v-leave-to
    opacity 0
    transform translate3d(100%, 0, 0)
  .v-enter-active, .v-leave-active
    transition all .4s linear
</style>
