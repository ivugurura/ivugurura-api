export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'categories',
    [
      {
        name: 'Ukuri mvajuru',
        slug: 'ukuri-mvajuru-sdsehj7',
        languageId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('categories', null, {});
};
