'use strict';
export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {}
  );
  Category.associate = models => {
    Category.belongsTo(models.Language, {
      foreignKey: 'languageId',
      as: 'language',
      onDelete: 'CASCADE'
    });
    Category.hasOne(models.Category, {
      foreignKey: 'categoryId',
      as: 'children'
    });
    Category.hasMany(models.Category, {
      foreignKey: 'categoryId',
      as: 'parent'
    });
  };
  return Category;
};
