<template>
  <div>
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
              <td>{{ difficulty(session.level) }}</td>
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
import { sessions } from "./sessions";

export default {
  name: "app",
  components: {
  },
  data() {
    return {
      sessions
    };
  },
  methods: {
    getSessionsByTime(time) {
      return this.sessions.filter(x => x.time === time);
    },
    difficulty(level) {
      switch (level) {
        case "100":
          return "Beginner";
        case "200":
          return "Intermediate";
        case "300":
          return "Advanced";
        default:
          return "Beginner";
      }
    },
    markFavorite(session) {
      session.favorite = !session.favorite;
      localStorage.setItem("stirTrekSessions", JSON.stringify(this.sessions));
    }
  },
  computed: {
    sessionTimes() {
      return [...new Set(this.sessions.map(x => x.time))];
    },
    categories() {
      return [...new Set(this.sessions.map(x => x.primaryCategory))];
    }
  },
  mounted() {
    this.sessions =
      JSON.parse(localStorage.getItem("stirTrekSessions")) || sessions;
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
