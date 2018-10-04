/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	var Carts = sequelize.define('carts', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		odered: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		users_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		products_id: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'products',
				key: 'id'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		}
	}, {
			tableName: 'carts'
		});
	Carts.associate = function (models) {
		models.carts.belongsTo(models.users, {
			onDelete: "CASCADE",
			foreignKey:'users_id'
		});
		models.carts.belongsTo(models.products, {
			onDelete: "CASCADE",
			foreignKey: 'products_id',
		});
	};
	return Carts;
};
