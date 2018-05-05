<template>
    <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
        <div class="btn-group" role="group">
            <button id="times" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ filter.time || 'All Sessions Times' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="times">
                <a class="dropdown-item" @click="filter.time=null" href="#">All Session Times</a>
                <a class="dropdown-item" v-for="time in times" @click="filter.time=time" href="#" :key="time" v-once>{{time}}</a>
            </div>
        </div>
        <div class="btn-group" role="group">
            <button id="categories" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ filter.categories || 'All Categories' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="categories">
                <a class="dropdown-item" @click="filter.categories=null" href="#">All Categories</a>
                <a class="dropdown-item" v-for="category in categories" @click="filter.categories=category" href="#" :key="category" v-once>{{category}}</a>
            </div>
        </div>
        <div class="btn-group" role="group">
            <button id="levels" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ filter.level ? filter.level.name : 'All Experience Levels' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="levels">
                <a class="dropdown-item" @click="filter.level=null" href="#">All Levels</a>
                <a class="dropdown-item" v-for="level in levels" @click="filter.level=level" :key="level.id" href="#" v-once>{{ level.name }}</a>
            </div>
        </div>
        <div class="btn-group" role="group">
            <button id="rooms" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{ filter.room || 'All Rooms' }}
            </button>
            <div class="dropdown-menu" aria-labelledby="room">
                <a class="dropdown-item" @click="filter.room=null" href="#">All Rooms</a>
                <a class="dropdown-item" v-for="room in rooms" @click="filter.room=room" href="#" :key="room" v-once>{{room}}</a>
            </div>
        </div>
        <button type="button" class="btn btn-secondary" @click="filter.favorites = !filter.favorites">
            <i v-if="filter.favorites" class="fas fa-heart"></i>
            <i v-else class="far fa-heart"></i>
        </button>
    </div>
</template>

<script>
export default {
  name: "filter-controls",
  props: [
      "filter", 
      "times", 
      "rooms", 
      "categories",
      "levels"
      ],
  data() {
    return {};
  },
  mounted() {},
  watch: {
    $props: {
      handler: function(val) {
        console.log("watch", val);
      },
      deep: true
    }
  }
};
</script>

<style>
.dropdown-menu {
  z-index: 1200;
}
</style>