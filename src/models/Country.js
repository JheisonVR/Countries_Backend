const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flags: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    region:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    capital:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:true,
    },
    subregion:{
      type: DataTypes.STRING
    },
    area:{
      type: DataTypes.INTEGER
    },
    population:{
      type: DataTypes.INTEGER
    },
    maps:{
      type: DataTypes.STRING
    },
    coatOfArms:{
      type: DataTypes.STRING
    }
  });
};
