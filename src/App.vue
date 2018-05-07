<template>
  <div>
      <h5>Filters:</h5>
      <div class="search form-control">
          <input class="search__input" type="search" name="" id="" v-model="search" placeholder="keyword search">
          <div class="search__controls">
            <i class="fas fa-times" v-show="search.length>0" @click="search=''"></i>
            <i class="fas fa-search"></i>
          </div>
      </div>
      <br>

      <filter-controls :filter.sync="filters" :times="sessionTimes" :categories="categories" :rooms="rooms" :experienceLevels="experienceLevels"></filter-controls>
      <br>
      <br>
      <table class="table">
        <thead class="thead-light">
          <th class="sticky-top">Title</th>
          <th class="sticky-top">Speaker</th>
          <th class="sticky-top">Category</th>
          <th class="sticky-top">Level</th>
          <th class="sticky-top">Room</th>
          <th class="sticky-top">Favorite</th>
        </thead>
        <tbody>
          <template v-for="(sessionTime, index) in sessionTimes">
            <tr class="bg-info" :key="index + 100">
              <td>
                <h4>{{ sessionTime }}</h4>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr v-for="session in getSessionsByTime(sessionTime)" :key="session.title">
              <td>{{ session.title }}</td>
              <td>{{ session.name }}</td>
              <td>{{ session.primaryCategory }}</td>
              <td>{{ getExperienceLevel(session.level) }}</td>
              <td>{{ session.room }}</td>
              <td>
                <button @click="markFavorite(session)">
                  <i v-if="session.favorite" class="fas fa-heart"></i>
                  <i v-else class="far fa-heart"></i>
                </button>
              </td>
            </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
import sessionService from "./services/sessionService";
import experienceLevels from "./data/experienceLevels";
import FilterControls from "./components/FilterControls";

export default {
  name: "app",
  components: {
    "filter-controls": FilterControls
  },
  data() {
    return {
      experienceLevels,
      filteredSessions: [],
      search: "",
      filters: {
        time: null,
        categories: null,
        experienceLevel: null,
        room: null,
        favorites: false
      }
    };
  },
  methods: {
    getSessionsByTime(time) {
      return sessionService.getSessionsByTime(this.filteredSessions, time);
    },
    getExperienceLevel(level) {
      return this.experienceLevels.find(x => x.id === level).name;
    },
    markFavorite(session) {
      sessionService.updateSession(session);
      this.filteredSessions = sessionService.getFilteredSessions(this.filters, this.search);
    }
  },
  computed: {
    sessionTimes() {
      return sessionService.getSessionTimes();
    },
    categories() {
      return sessionService.getCategories();
    },
    rooms() {
      return sessionService.getRooms();
    }
  },
  mounted() {
    this.filteredSessions = sessionService.getSessions();
  },
  watch: {
    filters: {
      handler(newFilter) {
        this.filteredSessions = sessionService.getFilteredSessions(newFilter, this.search);
      },
      deep: true
    },
    search() {
      this.filteredSessions = sessionService.getFilteredSessions(this.filters, this.search);
    }
  }
};
</script>

<style>
button {
  border: 0;
  background-color: white;
}

.search {
  max-width: 300px;
  padding-right: 0;
}

.search__input {
  width: 100%;
  max-width: 200px;
  border: 0;
}

.search__input:focus {
  outline: none;
}

.search__controls {
  float: right;
}

.search__controls .fas {
  width: 25px;
  color: #6c757d;
  cursor: pointer;
}

.table .thead-light th {
  border-top: 0;
}
</style>
