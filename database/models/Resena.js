module.exports = function (sequelize, DataTypes) {
    const Resena = sequelize.define(
        'Resena',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            pelicula_id: DataTypes.INTEGER,
            usuario_id: DataTypes.INTEGER,
            resena: DataTypes.STRING,
            puntaje: DataTypes.INTEGER
        },
        {
            tableName: "resenas"
        }
    )

    Resena.associate = function (models) {
        
        Resena.belongsTo(models.Usuario, {
            as: 'usuario',
            foreignKey: 'usuario_id'
        })
    }

    return Resena
};