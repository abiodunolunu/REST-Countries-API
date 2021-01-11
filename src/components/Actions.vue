<template>
  <div class="actions">
    <form>
      <i class="fas fa-search"></i>
      <input
        name="Search for country"
        aria-label="Search for country"
        type="text"
        placeholder="Search for a country ..."
        v-model="countryName"
        @input="$emit('name', countryName)"
      />
    </form>

    <div class="dropdown">
      <button @click="toggleDropDown">
        Filter by Region <i class="fas fa-angle-down"></i>
      </button>
      <ul v-if="showDropDown">
        <li><button @click="selectRegion('')">All</button></li>
        <li><button @click="selectRegion('Africa')">Africa</button></li>
        <li><button @click="selectRegion('Americas')">Americas</button></li>
        <li><button @click="selectRegion('Asia')">Asia</button></li>
        <li><button @click="selectRegion('Europe')">Europe</button></li>
        <li><button @click="selectRegion('Oceania')">Oceania</button></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
export default {
  name: "Actions",
  setup() {
    let showDropDown = ref(false);
    let countryName = ref("");
    const { emit } = getCurrentInstance();
    const toggleDropDown = () => (showDropDown.value = !showDropDown.value);

    const selectRegion = (region) => {
      setTimeout(() => {
        emit("region", region);
      }, 700);

      setTimeout(() => {
        toggleDropDown();
      }, 500);
    };

    return { showDropDown, toggleDropDown, countryName, selectRegion };
  },
};
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

form {
  min-width: 300px;
  background-color: var(--elements-color);
  height: 42px;
  padding: 0 15px;
  box-shadow: var(--box-shadow);
  border-radius: 4px;
  color: var(--text-color);
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;

  input {
    padding: 10px 10px;
    outline: 0;
    border: 0;
    background: transparent;

    &:focus,
    &:active {
      background: transparent;
    }

    &::placeholder {
      font-weight: 600;
      color: var(--text-color);
    }
  }
}

.dropdown {
  border-radius: 4px;
  background: var(--elements-color);
  box-shadow: var(--box-shadow);
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  button {
    height: 100%;
    width: 100%;
    padding: 0 15px;
    cursor: pointer;
    color: var(--text-color);
    font-weight: 600;
    background-color: transparent;
    border: 0;
    outline: 0;

    i {
      margin-left: 25px;
    }
  }

  ul {
    background: var(--elements-color);
    box-shadow: var(--box-shadow);
    position: absolute;
    top: calc(100% + 5px);
    width: 100%;
    z-index: 3;
    list-style: none;
    border-radius: 4px;
    box-shadow: var(--box-shadow);

    li {
      &:hover {
        background: var(--bg-color);
        cursor: pointer;
      }

      button {
        padding: 8px 15px;
        text-align: left;
      }
    }
  }
}

@media (max-width: 580px) {
  .actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    form {
      margin-bottom: 20px;
      width: 100%;
    }
  }
}
</style>