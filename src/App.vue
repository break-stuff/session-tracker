<template>
  <div>
      <h5>Filters:</h5>
      <filter-controls :filter.sync="filters" :times="sessionTimes" :categories="categories" :rooms="rooms" :levels="levels"></filter-controls>
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
import { sessions } from "./data/sessions";
import FilterControls from "./components/FilterControls";

export default {
  name: "app",
  components: {
    "filter-controls": FilterControls
  },
  data() {
    return {
      sessions,
      filteredSessions : [],
      filters: {
        time: null,
        categories: null,
        level: null,
        room: null,
        favorites: false
      },
      levels : [
        {
          id: '100',
          name: 'Beginner'
        },
        {
          id: '200',
          name: 'Intermediate'
        },
        {
          id: '300',
          name: 'Advanced'
        }
      ]
    };
  },
  methods: {
    getSessionsByTime(time) {
      return this.filteredSessions.filter(x => x.time === time);
    },
    getExperienceLevel(level) {
      return this.levels.find(x=>x.id === level).name;
    },
    markFavorite(session) {
      let sessions = this.getSessions();
      sessions.find(x => x.title === session.title).favorite = !session.favorite;
      this.saveSessions(sessions);
      this.filteredSessions = this.getFilterSessions(this.filters);
    },
    saveSessions(sessions) {
      localStorage.setItem("session-tracker", JSON.stringify(sessions));
    },
    getSessions() {
      return JSON.parse(localStorage.getItem("session-tracker")) || sessions;
    },
    getFilterSessions(filters) {
        let sessions = this.getSessions();

        if (filters.time)
          sessions = sessions.filter(x => x.time === filters.time);

        if (filters.categories)
          sessions = sessions.filter(x => x.primaryCategory === filters.categories);

        if (filters.level)
          sessions = sessions.filter(x => x.level === filters.level);

        if (filters.rooms)
          sessions = sessions.filter(x => x.room === filters.rooms);

        if (filters.favorites)
          sessions = sessions.filter(x => x.favorite === filters.favorites);

        return sessions;
    }
  },
  computed: {
    sessionTimes() {
      return [...new Set(this.sessions.map(x => x.time))];
    },
    categories() {
      return [...new Set(this.sessions.map(x => x.primaryCategory).sort())];
    },
    rooms() {
      return [...new Set(this.sessions.map(x => x.room))];
    }
  },
  mounted() {
    this.filteredSessions = this.getSessions();
  },
  watch: {
    filters: {
      handler(newFilter) {
        this.filteredSessions = this.getFilterSessions(newFilter);
      },
      deep: true
    }
  }
};
</script>

<style>
button {
  border: 0;
}

table {
  margin-bottom: 3rem;
}
</style>
