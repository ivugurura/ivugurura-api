export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'languages',
    [
      {
        name: 'Kinyarwanda',
        short_name: 'kn',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'English',
        short_name: 'en',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'French',
        short_name: 'fr',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Kiswahili',
        short_name: 'sw',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('languages', null, {});
};
