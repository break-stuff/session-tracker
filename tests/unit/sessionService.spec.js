import sessions from '../../src/data/sessions';
import sessionService from '../../src/services/sessionService';
import chai from 'chai';

var should = chai.should();

describe('Session Services', function () {
  describe('getSessions()', function () {
    it('should get full list of sessions', function () {
      // arrange

      // act 
      let allSessions = sessionService.getSessions();

      //assert
      allSessions.should.have.lengthOf(52);
    });
  });

  describe('saveSessions()', function () {
    it('should save list to localStorage', function () {
      // arrange

      // act
      sessionService.saveSessions(sessions);
      let savedSessions = JSON.parse(localStorage.getItem("session-tracker"));

      //assert
      savedSessions.should.have.lengthOf(52);
    });
  });

  describe('updateSession()', function () {
    it('should update session and save all sessions', function () {
      // arrange
      let session = {
        time: '7:30 AM',
        room: 'Concourse',
        name: 'Stir Trek',
        primaryCategory: 'Other',
        level: '100',
        title: 'Breakfast',
        favorite: false
      };

      // act
      sessionService.updateSession(session);
      let savedSessions = JSON.parse(localStorage.getItem("session-tracker"));

      //assert
      savedSessions[0].favorite.should.equal(true);
    });
  });

  describe('getSearchResults()', function () {
    let runs = [{
      search: 'Blue',
      expectedResult: 6
    }, {
      search: 'SECURITY',
      expectedResult: 2
    }];

    runs.forEach(test => {
      it(`should return ${test.expectedResult} sessions based on search term "${test.search}"`, function () {
        // arrange

        // act
        let searchResults = sessionService.getSearchResults(sessions, test.search);

        //assert
        searchResults.should.have.lengthOf(test.expectedResult);
      });
    });
  });

  describe('getSessionsByTime()', function () {
    let runs = [{
      time: '7:30 AM',
      expectedResult: 1
    }, {
      time: '8:30 AM',
      expectedResult: 8
    }];

    runs.forEach(test => {
      it(`should return only ${test.expectedResult} session at "${test.time}"`, function () {
        // arrange

        // act
        let filteredSessions = sessionService.getSessionsByTime(sessions, test.time);

        //assert
        filteredSessions.should.have.lengthOf(test.expectedResult);
      });
    });
  });

  describe('getSessionsByCategories()', function () {
    it('should return 2 sessions with the category of "Security"', function () {
      // arrange
      let category = 'Security';

      // act
      let filteredSessions = sessionService.getSessionsByCategories(sessions, category);

      //assert
      filteredSessions.should.have.lengthOf(2);
    });
  });

  describe('getSessionsByExperienceLevel()', function () {
    it('should return 10 sessions with the experience level of "100"', function () {
      // arrange
      let experienceLevel = {
        id: '100',
        name: 'Beginner'
      };

      // act
      let filteredSessions = sessionService.getSessionsByExperienceLevel(sessions, experienceLevel);

      //assert
      filteredSessions.should.have.lengthOf(26);
    });
  });

  describe('getSessionsByFavorites()', function () {
    let runs = [{
      value: true,
      expectedResult: 3
    }, {
      value: false,
      expectedResult: 5
    }, {
      value: null,
      expectedResult: 5
    }];

    let mockSessions = [{
        time: '7:30 AM',
        room: 'Concourse',
        name: 'Stir Trek',
        primaryCategory: 'Other',
        level: '100',
        title: 'Breakfast',
        favorite: true
      },
      {
        time: '8:30 AM',
        room: 'Blue',
        name: 'Tim LeMaster',
        primaryCategory: 'Data / Storage / BI',
        level: '100',
        title: 'Introduction to Convolutional Neural Networks',
        favorite: false
      },
      {
        time: '8:30 AM',
        room: 'Gauntlet',
        name: 'Michael Dowden',
        primaryCategory: 'Architecture / Patterns',
        level: '200',
        title: 'Naming: The Art of Clarity',
        favorite: true
      },
      {
        time: '8:30 AM',
        room: 'Green',
        name: 'Craig Stuntz',
        primaryCategory: 'Security',
        level: '200',
        title: 'Secure Applications, By Design',
        favorite: false
      },
      {
        time: '8:30 AM',
        room: 'Orange',
        name: 'Justin James',
        primaryCategory: 'App Dev (Languages, Frameworks, etc.)',
        level: '200',
        title: 'Rapid REST API Development with Node and Sails',
        favorite: true
      }
    ];

    runs.forEach(test => {
      it(`should return ${test.expectedResult} sessions when favorites is ${test.value}`, function () {
        // arrange

        // act
        let filteredSessions = sessionService.getSessionsByFavorites(mockSessions, test.value);

        //assert
        filteredSessions.should.have.lengthOf(test.expectedResult);
      });
    });
  });

  describe('getSessionTimes()', function () {
    it('should return an array of 9 session times', function () {
      // arrange 

      // act
      let sessionTimes = sessionService.getSessionTimes();

      // assert
      sessionTimes.should.have.lengthOf(9);
    });
  });

  describe('getCategories()', function () {
    it('should return an array of 15 categories', function () {
      // arrange 

      // act
      let categories = sessionService.getCategories();

      // assert
      categories.should.have.lengthOf(15);
    });
  });

  describe('getCategories()', function () {
    it('should return an array of 10 rooms', function () {
      // arrange 

      // act
      let rooms = sessionService.getRooms();

      // assert
      rooms.should.have.lengthOf(10);
    });
  });
});
