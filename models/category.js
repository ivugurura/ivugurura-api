'use strict';
export default (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        unique: true
      },
      languageId: {
        type: DataTypes.INTEGER,
        required: true
      },
      parentId: {
        type: DataTypes.INTEGER,
        required: true
      }
    },
    {}
  );
  Category.associate = models => {
    Category.belongsTo(models.Language);
    Category.belongsTo(models.Category, { as: 'parent' });
    Category.hasMany(models.Topic, { foreignKey: 'categoryId' });
    Category.hasMany(models.Category, { as: 'categories' });
  };
  return Category;
};
