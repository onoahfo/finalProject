module.exports = function(sequelize, DataTypes){
    var Spot = sequelize.define("Spot", {
        title:{
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.STRING
        },
        besttime: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.TEXT
        },
        tags: {
            type: DataTypes.STRING
        },
    });
    return Spot
}
