'use strict';
module.exports = (sequelize, DataTypes) => {
	const MediaDownload = sequelize.define(
		'MediaDownload',
		{
			mediaId: {
				type: DataTypes.INTEGER,
				required: true
			}
		},
		{ tableName: 'media_downloads' }
	);
	MediaDownload.associate = (models) => {
		MediaDownload.belongsTo(models.Media, { foreignKey: 'mediaId' });
	};
	return MediaDownload;
};
