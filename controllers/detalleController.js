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
            res.render('detalle', { dato: req.query.idPelicula, resenas: resultados, error: req.params.error});
        })
    },

    agregarResena: function (req,res) {
        moduloLogin.buscarPorEmail(req.body.email)
        .then(resultado=>{
            if(resultado != undefined){
                let review = {
                    pelicula_id: req.params.id,
                    usuario_id: resultado.id,
                    resena: req.body.resena,
                    puntaje: req.body.puntaje
                }
                
                db.Resena.create(review)
                res.redirect('/detalle/?idPelicula=' + req.params.id + '#lastReview')
            }else{
                res.redirect('/detalle/true/?idPelicula='+req.params.id+'#scroll')
            }

        })
    }
}

module.exports = detalleController