const detalleController = {
    findByPk: function (req,res){
    console.log(req.query.idPelicula)
        res.render('detalle', {})
    }
}

module.exports = detalleController