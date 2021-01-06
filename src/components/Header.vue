<template>
  <header>
    <div class="container">
      <h1>Where in the world?</h1>
      <transition name="toggle" :appear="true" mode="out-in">
        <button @click="switchMode" v-if="darkMode">
          <i class="fas fa-sun"></i> Light Mode
        </button>
        <button @click="switchMode" v-else>
          <i class="fas fa-moon"></i> Dark Mode
        </button>
      </transition>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Header",
  setup() {
    let darkMode = ref(Boolean);
    darkMode.value = localStorage.getItem("darkMode") === "true";
    const switchMode = () => {
      const appWrapper = document.querySelector("#app");
      if (appWrapper.classList.contains("dark")) {
        appWrapper.classList.remove("dark");
        darkMode.value = false;
        localStorage.setItem("darkMode", "false");
      } else {
        appWrapper.classList.add("dark");
        darkMode.value = true;
        localStorage.setItem("darkMode", "true");
      }
    };

    return { switchMode, darkMode };
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 62px;
  transition: all 500ms linear;
  position: relative;
  box-shadow: var(--box-shadow);
  background-color: var(--elements-color);
  color: var(--text-color);
  div {
    color: inherit;
    padding-top: 15px;
    padding-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      font-size: 24px;
    }

    button {
      cursor: pointer;
      outline: 0;
      border: 0;
      font-weight: 600;
      background-color: transparent;

      i {
        margin-right: 5px;
      }
    }
  }
}

@media (max-width: 430px) {
  header {
    div {
      h1 {
        font-size: 20px;
      }
    }
  }
}

.toggle-enter-active {
  animation: come 400ms linear;
}

.toggle-leave-active {
  animation: go 400ms linear;
}

@keyframes come {
  0% {
    transform: translateY(-50px);
  }

  100% {
    transform: translateY(0px);
  }
}

@keyframes go {
  0% {
    transform: translateY(0px);
  }

  100% {
    transform: translateY(-50px);
  }
}
</style>