<template>
    <div class="filters">
        <h5>Filters:</h5>
        <div class="search form-control">
            <input class="search__input" type="search" name="" id="" v-model="filters.search" placeholder="keyword search">
            <div class="search__controls">
                <i class="fas fa-times" v-show="filters.search.length>0" @click="filters.search=''"></i>
                <i class="fas fa-search"></i>
            </div>
        </div>
        <br>

        <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <div class="btn-group" role="group">
                <button id="times" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ filters.time || 'All Sessions Times' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="times">
                    <a class="dropdown-item" @click="filters.time=null" href="#">All Session Times</a>
                    <a class="dropdown-item" v-for="time in times" @click="filters.time=time" href="#" :key="time" v-once>{{time}}</a>
                </div>
            </div>
            <div class="btn-group" role="group">
                <button id="categories" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ filters.categories || 'All Categories' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="categories">
                    <a class="dropdown-item" @click="filters.categories=null" href="#">All Categories</a>
                    <a class="dropdown-item" v-for="category in categories" @click="filters.categories=category" href="#" :key="category" v-once>{{category}}</a>
                </div>
            </div>
            <div class="btn-group" role="group">
                <button id="levels" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ filters.experienceLevel ? filters.experienceLevel.name : 'All Experience Levels' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="levels">
                    <a class="dropdown-item" @click="filters.experienceLevel=null" href="#">All Levels</a>
                    <a class="dropdown-item" v-for="level in experienceLevels" @click="filters.experienceLevel=level" :key="level.id" href="#" v-once>{{ level.name }}</a>
                </div>
            </div>
            <div class="btn-group" role="group">
                <button id="rooms" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{ filters.room || 'All Rooms' }}
                </button>
                <div class="dropdown-menu" aria-labelledby="room">
                    <a class="dropdown-item" @click="filters.room=null" href="#">All Rooms</a>
                    <a class="dropdown-item" v-for="room in rooms" @click="filters.room=room" href="#" :key="room" v-once>{{room}}</a>
                </div>
            </div>
            <button type="button" class="btn btn-secondary" @click="filters.favorites = !filters.favorites">
                <i v-if="filters.favorites" class="fas fa-heart"></i>
                <i v-else class="far fa-heart"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
  name: "filter-controls",
  props: [
      "filters", 
      "times", 
      "rooms", 
      "categories", 
      "experienceLevels"],
  data() {
    return {
    };
  },
  mounted() {},
  watch: {
    // $props: {
    //   handler: function(val) {
    //     console.log("watch", val);
    //   },
    //   deep: true
    // }
    // localSearch() {
    //     this.search = this.localSearch;
    // }
  }
};
</script>

<style>
.dropdown-menu {
  z-index: 1200;
}
</style>