'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn('media', 'slug', {
				type: Sequelize.STRING,
				allowNull: true
			})
		]);
	},

	down: (queryInterface, Sequelize) => {
		return Promise.all([queryInterface.removeColumn('media', 'slug')]);
	}
};
