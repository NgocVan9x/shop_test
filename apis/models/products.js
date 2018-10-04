/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var Products = sequelize.define('products', {
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
		desctiption: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		price: {
			type: "DOUBLE",
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
	Products.associate = function(models) {
		models.products.hasMany(models.carts,{foreignKey: 'products_id'});
	  };
	  return Products;
};
