const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seed');
const seedComments = require('./comment-seed');


const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n--------------\n');

  await seedUsers();
  console.log('\n--------------\n');

  await seedPosts();
  console.log('\n--------------\n');

  await seedComments();
  console.log('\n--------------\n');

  

  process.exit(0);
};

seedAll();