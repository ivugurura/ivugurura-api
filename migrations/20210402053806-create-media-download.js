'use strict';
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('media_downloads', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			mediaId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				onDelete: 'CASCADE',
				references: {
					model: 'media',
					key: 'id',
					as: 'mediaId'
				}
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable('media_downloads');
	}
};
