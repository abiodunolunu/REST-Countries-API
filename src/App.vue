<template>
  <div class="__page">
    <AppHeader></AppHeader>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>

    <p class="det">
    This is a
    <a href="https://www.frontendmentor.io/solutions"
      >Front-End Mentor Challenge</a
    >
    and it was built by <a href="https://twitter.com/findByUsername">Abeydev</a>
  </p>
  </div>

  
  
</template>

<script>
import AppHeader from "@/components/Header.vue";
export default {
  components: { AppHeader },
  setup() {
    const darkModeEnabled = localStorage.getItem("darkMode");
    if (darkModeEnabled === "true") {
      document.querySelector("#app").classList.add("dark");
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  --bg-color: hsl(0, 0%, 98%);
  --text-color: hsl(200, 15%, 8%);
  --elements-color: hsl(0, 0%, 100%);
  --shadow-clr: hsl(0, 0%, 52%);
  --box-shadow: 0px 0px 5px #b8b8b8;
  --big-box-shadow: 0px 0px 10px 10px #bbb;
  font-family: "Nunito Sans", sans-serif;
  font-size: 14px;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all 400ms linear;
  min-height: 100vh;

  background: var(--bg-color);
}

#app.dark {
  --text-color: hsl(0, 0%, 100%);
  --elements-color: hsl(209, 23%, 22%);
  --bg-color: hsl(207, 26%, 17%);
  --shadow-clr: hsl(209, 23%, 22%);
  --box-shadow: 0px 0px 5px hsl(200, 15%, 8%);
  --big-box-shadow: 0px 0px 10px 10px hsl(200, 14%, 21%);
}

input,
button {
  font-family: inherit;
  color: inherit;
}

.__page {
  display: grid;
  height: 100vh;
  grid-template-rows: auto 1fr;
}

.container {
  max-width: 1440px;
  margin: auto;
  padding: 0 2rem;
}

.change-enter-active {
  // transform-origin: center;
  animation: routein 0.5s linear forwards;
}
.change-leave-active {
  // transform-origin: center;
  animation: routeout 0.5s linear forwards;
}

@keyframes routein {
  from {
    // opacity: 0;
    transform: rotateX(90deg);
  }

  to {
    // opacity: 1;
    transform: rotateX(0deg);
  }
}

@keyframes routeout {
  from {
    // opacity: 1;
    // transform: scale(1);
    transform: rotateX(0deg);
  }

  to {
    // opacity: 0;
    // transform: scale(0);
    transform: rotateX(90deg);
  }
}

.det {
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        padding: 5px 5px;
        font-size: 14px;
        color: var(--text-color);
        background-color: var(--bg-color);
      }

      .det a {
        color: #2e5090;
        text-decoration: none;
        font-weight: 700;
      }
</style>
