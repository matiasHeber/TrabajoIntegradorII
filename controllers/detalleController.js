const detalleController = {
    findByPk: function (req,res){
        res.render('detalle', { dato: req.query.idPelicula })
    }
}

module.exports = detalleController