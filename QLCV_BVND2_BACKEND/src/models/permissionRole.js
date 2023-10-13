"use strict";
const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class permissionRole extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   permissionRole.init(
//     {
//       permissionId: DataTypes.INTEGER,
//       roleId: DataTypes.INTEGER,
//     },
//     {
//       sequelize,
//       modelName: "permissionRole",
//     }
//   );
//   return permissionRole;
// };


module.exports = (sequelize, DataTypes) => {
  const permissionRole = sequelize.define('permissionRole', {
    // permissionId: {
    //   type: DataTypes.INTEGER,
    //   references: "permission",
    //   referencesKey: "id",
    //   allowNull: false,
    // },
    // roleId: {
    //   type: DataTypes.INTEGER,
    //   references: "role",
    //   referencesKey: "id",
    //   allowNull: false,
    // },
  });
  return permissionRole;
};