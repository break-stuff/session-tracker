import sessions from '../data/sessions';

export default {
  getSessions() {
    return JSON.parse(localStorage.getItem("session-tracker")) || sessions;
  },

  saveSessions(sessions) {
    localStorage.setItem("session-tracker", JSON.stringify(sessions));
  },

  updateSession(session) {
    let allSessions = this.getSessions();
    allSessions.find(x => x.title === session.title).favorite = !session.favorite;
    this.saveSessions(allSessions);
  },

  getFilteredSessions(filters, search) {
    let filteredSessions = this.getSessions();

    filteredSessions = this.getSearchResults(filteredSessions, search);
    filteredSessions = this.getSessionsByTime(filteredSessions, filters.time);
    filteredSessions = this.getSessionsByCategories(filteredSessions, filters.categories);
    filteredSessions = this.getSessionsByExperienceLevel(filteredSessions, filters.experienceLevel);
    filteredSessions = this.getSessionsByRoom(filteredSessions, filters.room);
    filteredSessions = this.getSessionsByFavorites(filteredSessions, filters.favorites);

    return filteredSessions;
  },

  getSearchResults(filteredSessions, search) {

    if (search) {
      search = search.toLowerCase();
      filteredSessions = filteredSessions.filter(x => x.primaryCategory.toLowerCase().includes(search) ||
                                                      x.room.toLowerCase().includes(search) ||
                                                      x.name.toLowerCase().includes(search) ||
                                                      x.title.toLowerCase().includes(search));
    }

    return filteredSessions;
  },

  getSessionsByCategories(filteredSessions, category) {
    if (category)
      filteredSessions = filteredSessions.filter(x => x.primaryCategory === category);

    return filteredSessions;
  },

  getSessionsByExperienceLevel(filteredSessions, experienceLevel) {
    if (experienceLevel)
      filteredSessions = filteredSessions.filter(x => x.level === experienceLevel.id);

    return filteredSessions;
  },

  getSessionsByRoom(filteredSessions, room) {
    if (room)
      filteredSessions = filteredSessions.filter(x => x.room === room);

    return filteredSessions;
  },

  getSessionsByFavorites(filteredSessions, favorites) {
    if (favorites)
      filteredSessions = filteredSessions.filter(x => x.favorite === favorites);

    return filteredSessions;
  },

  getSessionsByTime(filteredSessions, time) {
    if(time)
       filteredSessions = filteredSessions.filter(x => x.time === time);

    return filteredSessions;
  },

  getSessionTimes() {
    return [...new Set(this.getSessions().map(x => x.time))];
  },

  getCategories() {
    return [...new Set(this.getSessions().map(x => x.primaryCategory).sort())];
  },

  getRooms() {
    return [...new Set(this.getSessions().map(x => x.room))];
  }
}
