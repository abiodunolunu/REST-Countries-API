<template>
  <div class="parent">
    <div class="container">
      <div class="container">
        <h1>Page Not Found</h1>
        <p>Redirecting you to the homepage in {{time}}...</p>

        <div class="outer">
          <div class="inner"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: 4,
    };
  },
  watch: {
    time() {
      if (this.time == 0) {
        this.time = 0;
        this.$router.replace("/");
      }
    },
  },
  mounted() {
    const self = this;
    setInterval(() => {
      self.time -= 1;
    }, 1000);
  },
};
</script>

<style lang="scss" scoped>
.parent {
    height: 100%;
}


.container {
    height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  color: var(--text-color);

  h1 {
    text-align: center;
    width: 100%;
  }

  p {
    text-align: center;
    width: 100%;
  }

  .outer {
    margin-top: 30px;
    height: 150px;
    width: 150px;
    border: 1px solid var(--text-color);
    position: relative;
    border-radius: 50%;
  }

  .inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50% -50%);
    background: var(--text-color);
    height: 5px;
    width: 70px;
    transform: rotate(-90deg);
    transform-origin: left;
    animation: clock 3s linear;
    animation-delay: 1s;
  }

  @keyframes clock {
    0% {
      transform: rotate(-90deg);
    }

    100% {
      transform: rotate(270deg);
    }
  }
}
</style>