module.exports = function (sequelize, DataTypes) {
    const Usuario = sequelize.define (
        'Usuario',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            birth_date: DataTypes.INTEGER,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
        timestamps: false,
        tableName: "usuarios"
        }
    )
    
    Usuario.associate = function (models) {
        Usuario.hasMany(models.Resena, {
            as: 'resenas',
            foreignKey: 'usuario_id'
        })
    }
    
  return Usuario  
};