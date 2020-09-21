export const up = (queryInterface, Sequelize) => {
  return queryInterface.bulkInsert(
    'media',
    [
      {
        title: 'Test image',
        mediaLink: 'test-image.jpg',
        type: 'image',
        albumId: 1,
        languageId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  );
};
export const down = (queryInterface, Sequelize) => {
  return queryInterface.bulkDelete('media', null, {});
};
