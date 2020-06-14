export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'media',
    [
      {
        title: 'English',
        mediaLink: 'en',
        type: 'image',
        albumId: 1,
        languageId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('media', null, {});
};
