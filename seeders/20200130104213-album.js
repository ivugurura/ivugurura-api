export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'albums',
    [
      {
        name: 'Sample',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('albums', null, {});
};
