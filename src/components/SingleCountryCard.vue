<template>
  <div class="country-card" @click="goToCountryDetail(country.name)">
    <img :src="country.flag" :alt="`${country.name}'s flag`" />
    <div class="country-card__details">
      <h3>{{ country.name }}</h3>
      <p>
        Population: <span>{{ country.population }}</span>
      </p>
      <p>
        Region: <span>{{ country.region }}</span>
      </p>
      <p>
        Capital: <span>{{ country.region }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
export default {
  name: "SingleCountryCard",
  props: {
    country: {
      type: Object,
    },
  },
  setup() {
    const router = useRouter();
    const goToCountryDetail = (country) =>
      router.replace({
        name: "country-detail",
        params: { countryName: country },
        force: true,
      });

    return { goToCountryDetail };
  },
};
</script>

<style lang="scss" scoped>
.country-card {
  transition: all 500ms linear;
  background: var(--elements-color);
  box-shadow: var(--box-shadow);
  border-radius: 6px;
  overflow: hidden;

  img {
    // height: 250px;
    width: 100%;
    object-fit: cover;
    object-position: center;
    box-shadow: var(--box-shadow);
  }

  &__details {
    padding: 20px 20px 40px 20px;

    h3 {
      margin-bottom: 15px;

      span.highlight {
        background: rebeccapurple;
      }
    }

    p {
      margin-bottom: 2px;
      font-weight: 600;

      span {
        font-weight: 300;
      }
    }
  }
}
</style>