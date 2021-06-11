'use strict';
module.exports = (sequelize, DataTypes) => {
	const MediaDownload = sequelize.define(
		'MediaDownload',
		{},
		{ tableName: 'media_downloads' }
	);
	MediaDownload.associate = (models) => {
		MediaDownload.belongsTo(models.Media, {
			foreignKey: 'mediaId',
			as: 'media'
		});
	};
	return MediaDownload;
};
