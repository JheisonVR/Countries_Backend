const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('TouristActivity', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      dificulty: {
      type: DataTypes.ENUM,
      values:['1','2','3','4','5'],
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true

    }, 
    season: {
      type: DataTypes.ENUM,
      values: ['Winter', 'Summer', 'Spring', 'Autumn']
    },
    description: {
      type: DataTypes.STRING,
      allowNull:true
    }
    });
  };