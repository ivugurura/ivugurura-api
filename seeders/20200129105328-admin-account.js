'use strict';

import { hashPassword } from '../helpers/util';
export const up = (queryInterface, Sequelize) => {
	return queryInterface.bulkInsert(
		'users',
		[
			{
				names: 'Ivugurura Admin',
				username: 'Ivugurura',
				email: 'ubugorozinfo@gmail.com',
				password: hashPassword('MaraikaWundi@3'),
				role: 2,
				isActive: true,
				createdAt: new Date(),
				updatedAt: new Date()
			}
		],
		{}
	);
};
export const down = (queryInterface, Sequelize) => {
	return queryInterface.bulkDelete('users', null, {});
};
