<template>
  <section class="country-detail">
    <div class="container navigation">
      <router-link to="/"><i class="fas fa-arrow-left"></i> Back </router-link>
    </div>
    <div class="container country" v-if="countryInfo !== null">
      <div class="image">
        <img :src="countryInfo.flag" alt="" />
      </div>
      <div class="info">
        <h2>{{ countryInfo.name }}</h2>

        <div class="info__text">
          <div class="set">
            <p>
              Native Name: <span>{{ countryInfo.nativeName }}</span>
            </p>
            <p>
              Population: <span>{{ countryInfo.population }}</span>
            </p>
            <p>
              Region: <span>{{ countryInfo.region }}</span>
            </p>
            <p>
              Sub Region: <span>{{ countryInfo.subregion }}e</span>
            </p>
            <p>
              Capital: <span>{{ countryInfo.capital }}</span>
            </p>
          </div>

          <div class="set">
            <p>
              Top Level Domain: <span>{{ countryInfo.topLevelDomain }}</span>
            </p>
            <p>
              Currencies: <span>{{ countryInfo.currencies.join(", ") }}</span>
            </p>
            <p>
              Languages: <span>{{ countryInfo.languages.join(", ") }}</span>
            </p>
          </div>
        </div>

        <div class="info__border">
          Border Countries:
          <button
            v-for="country in countryInfo.borders"
            :key="country"
            @click="goToCountryDetail(country)"
          >
            {{ country }}
          </button>
        </div>
      </div>
    </div>

    <div class="container null" v-else>
      <h3>{{ $route.params.countryName }} <loading /></h3>
    </div>
  </section>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Loading from "../components/Loading.vue";
export default {
  components: { Loading },
  name: "countryDetail",
  setup() {
    const router = useRouter();
    let countryName = ref("");
    countryName.value = router.currentRoute.value.params.countryName;
    let countryInfo = ref(null);
    const URL = "https://restcountries.eu/rest/v2/";
    const fetchCountryDetails = (country = countryName) => {
      fetch(`${URL}name/${country}?fullText=true`)
        .then((res) => res.json())
        .then((countryData) => {
          if (!Array.isArray(countryData)) {
            return (countryInfo.value = null);
          }
          let data = countryData[0];
          countryInfo.value = {
            flag: data.flag,
            name: data.name,
            nativeName: data.nativeName,
            population: data.population.toLocaleString(),
            region: data.region,
            subregion: data.subregion,
            capital: data.capital,
            topLevelDomain: data.topLevelDomain[0],
            currencies: data.currencies.map((currency) => currency.name),
            languages: data.languages.map((lang) => lang.name),
          };

          if (data.borders.length == 0) {
            return;
          }
          const borderString = data.borders.join(";");
          fetch(`${URL}alpha?codes=${borderString};`)
            .then((res) => res.json())
            .then((countries) => {
              countryInfo.value["borders"] = countries.map(
                (country) => country.name
              );
            });
        });
    };

    const goToCountryDetail = (country) =>
      router.replace({
        name: "country-detail",
        params: { countryName: country },
        force: true,
      });

    watchEffect(() => {
      fetchCountryDetails(router.currentRoute.value.params.countryName);
    });

    return { countryInfo, goToCountryDetail, countryName };
  },
};
</script>

<style lang="scss" scoped>
.country-detail {
  transition: all 500ms linear;

  height: 100%;
  color: var(--text-color);
  padding: 30px 0;

  .container.country {
    background: var(--bg-color);
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-content: center;
    align-items: center;
    gap: 60px;
    font-size: 16px;
  }

  .container.null {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 32px;
      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;

      .loader {
        margin-top: 30px;
      }
    }
  }
}

.navigation {
  position: relative;
  top: 0px;
  a {
    border-radius: 4px;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    outline: 0;
    border: 0;
    background: var(--elements-color);
    height: 32px;
    width: 120px;
    box-shadow: var(--box-shadow);

    margin: 4px;
    color: var(--text-color);
    font-family: inherit;
    text-decoration: none;

    i {
      margin-right: 10px;
    }
  }
}

.country-detail .image {
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 100%;
    box-shadow: var(--big-box-shadow);
  }
}

.country-detail .info {
  width: 100%;

  h2 {
    margin-bottom: 10px;
  }

  .info__text {
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    flex-wrap: wrap;

    .set {
      &:first-of-type {
        margin-right: 8px;
      }
    }

    p {
      font-weight: 600;
      line-height: 1;
      margin: 12px 0;
      span {
        font-weight: 300;
      }
    }
  }

  .info__border {
    font-weight: 600;
    margin-top: 40px;

    button {
      cursor: pointer;
      outline: 0;
      border: 0;
      background: var(--elements-color);
      min-height: 24px;
      padding: 2px 15px;
      box-shadow: var(--box-shadow);

      margin: 4px;
    }
  }
}

@media (max-width: 900px) {
  .navigation {
    grid-column: 1;
    top: 0;
  }
  .country-detail {
    .container.country {
      grid-template-columns: 1fr;
    }
  }
}
</style>