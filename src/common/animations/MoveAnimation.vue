<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'MoveAnimation'
}
</script>

<style lang="stylus" scoped>
  .v-enter, .v-leave-to
    opacity 0
    transform translate3d(24px, 0, 0) rotate(180deg)
  .v-enter-active, .v-leave-active
    transition all .4s linear
</style>
