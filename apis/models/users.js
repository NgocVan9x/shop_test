/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var Users = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		}
	});
	Users.associate = function(models) {
		models.users.hasMany(models.carts,{foreignKey: 'users_id'});
	  };
	return Users;
};
