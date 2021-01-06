<template>
  <div class="loader">
    <div class="bar1"></div>
    <div class="bar2"></div>
    <div class="bar3"></div>
    <div class="bar4"></div>
    <div class="bar5"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
};
</script>

<style lang="scss" scoped>
.loader {
  display: flex;

  div {
    margin: 0px 2px;
    height: 40px;
    width: 8px;
    background-color: var(--bg-color);
    transition: all 0.5s;
    animation: scale 1.6s ease-in-out infinite;

    &.bar5 {
      animation-delay: 1.4s;
    }

    &.bar4 {
      animation-delay: 1.2s;
    }

    &.bar3 {
      animation-delay: 1s;
    }

    &.bar2 {
      animation-delay: 0.8s;
    }

    &.bar1 {
      animation-delay: 0.6s;
    }
  }
}

@keyframes scale {
  0%,
  40%,
  60%,
  100% {
    transform: scaleY(1);
  }

  20% {
    transform: scaleY(2);
    background-color: var(--text-color);
  }
}
</style>