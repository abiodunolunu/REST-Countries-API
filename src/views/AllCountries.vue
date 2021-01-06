<template>
  <section class="countries">
    <div class="container">
      <Actions
        @region="filterCountriesByRegion"
        @name="filterCountriesByName"
      />

      <div class="all-countries" v-if="countriesToDisplay.length > 0">
        <single-country-card
          v-for="country in countriesToDisplay"
          :key="country.name"
          :country="country"
        />
      </div>

      <div class="all-countries empty" v-else>
        <Loading />
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import Actions from "../components/Actions.vue";
import SingleCountryCard from "../components/SingleCountryCard.vue";
import Loading from "../components/Loading.vue";
export default {
  components: { Actions, SingleCountryCard, Loading },
  name: "AllCountries",
  setup() {
    let countriesToDisplay = ref([]);
    let allCountriesList = ref([]);
    const URL = "https://restcountries.eu/rest/v2/";

    const filterFunction = (countries) => {
      return countries.map((country) => {
        return {
          name: country.name,
          population: country.population.toLocaleString(),
          region: country.region,
          capital: country.capital,
          flag: country.flag,
        };
      });
    };
    setTimeout(() => {
      fetch(`${URL}all`)
        .then((res) => res.json())
        .then((countries) => {
          allCountriesList.value = filterFunction(countries);
          countriesToDisplay.value = allCountriesList.value;
        });
    }, 2500);

    const filterCountriesByRegion = (region) => {
      if (region === "") {
        return (countriesToDisplay.value = allCountriesList.value);
      }
      fetch(`${URL}region/${region}`)
        .then((res) => res.json())
        .then((countries) => {
          countriesToDisplay.value = filterFunction(countries);
        });
    };

    const filterCountriesByName = (countryName) => {
      if (countryName === "") {
        return;
      }
      fetch(`${URL}name/${countryName}`)
        .then((res) => res.json())
        .then((countries) => {
          if (!Array.isArray(countries)) {
            return (countriesToDisplay.value = []);
          }
          countriesToDisplay.value = filterFunction(countries);
        });
    };

    return {
      countriesToDisplay,
      filterCountriesByRegion,
      filterCountriesByName,
    };
  },
};
</script>

<style lang="scss" scoped>
.countries {
  background: var(--bg-color);
  color: var(--text-color);
  transition: all 500ms linear;
}

.countries {
  .container {
    padding: 20px;
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr;
  }
}

.all-countries {
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  justify-content: center;
  gap: 40px 1em;

  &.empty {
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 35px;
    }
  }
}
</style>