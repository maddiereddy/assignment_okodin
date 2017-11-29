'use strict';
var faker = require('faker');

module.exports = {
  up: (queryInterface, Sequelize) => {

    var profiles = [];
    var maritalStatus = [
      'Single',
      'Engaged',
      'Married',
      'In a civil union',
      'In a relationship',
      `It's complicated`,
      'Separated',
      'Divorced',
      'Widowed'
    ];
    var bodyType = [
      'Slender',
      'Average',
      'Curvy',
      'Chubby',
      'Toned',
      'Heavyset',
      'Tall',
      'Petite'
    ];

    var education = [
      'High School',
      'Bachelors',
      'Graduate',
      'Post Graduate',
      'PhD',
      'Medicine',
      'Law',
      'Engineering'
    ];

    var pets = [
      'None',
      'Dogs',
      'Cats',
      'Horses',
      'Other'
    ];

    var petNum = Math.floor(Math.random() * 5);

    for (let i = 1; i <= 50; i++) {

      profiles.push({
        age: Math.floor(Math.random() * 60) + 20,
        gender: ((i % 2) === 0) ? 'Male': 'Female',
        maritalStatus: maritalStatus[Math.floor(Math.random() * maritalStatus.length)],
        height: Math.floor(Math.random() * 24) + 60,
        bodyType: bodyType[Math.floor(Math.random() * bodyType.length)],
        kids: faker.random.boolean(),
        pets: [pets[Math.floor(Math.random() * pets.length)]],
        occupation: faker.name.jobTitle(),
        education: education[Math.floor(Math.random() * education.length)],
        aboutMe: faker.lorem.paragraph(),
        talents: [
          faker.company.catchPhrase(),
          faker.company.catchPhrase(),
          faker.hacker.phrase()
        ],
        favorites: [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence()
        ],
        hobbies: [
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence(),
          faker.lorem.sentence()
        ],
        whyMe: faker.company.bs(),
        picture: ((i % 2) === 0) ? 'viking_guy.jpg' : 'viking_girl.jpg',
        lastLogin: faker.date.past(1, '2016/11/30'),
        likes: [50],
        views: [50],
        viewedBy: [49],
        locationId: Math.floor(Math.random() * 100) + 1,
        userId: i
      });
    }
    return queryInterface.bulkInsert('Profiles', profiles);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Profiles', null, {}, models.Profile);
  }
};
