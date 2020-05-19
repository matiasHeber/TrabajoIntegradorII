let db = require('../database/models');
let op = db.Sequelize.Op;
let moduloLogin = require('../modulo-login');

const detalleController = {
    findByPk: function (req,res){
        db.Resena.findAll({
            where:[
                { pelicula_id:  req.query.idPelicula}
            ],
            include: [
                {association: 'usuario'}
            ]
        })
        .then(resultados => {
            // res.send(resultados)
            res.render('detalle', { dato: req.query.idPelicula, resenas: resultados});
        })
    }
}

module.exports = detalleController