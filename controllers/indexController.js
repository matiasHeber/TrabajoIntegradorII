let indexController = {
    index: function (req, res, next) {
        res.render('home', {});
    },

    search: function (req,res){
        res.render('buscador', {})
    },

    favoritos: function(req,res){
        res.render('favoritos',{})
    },

    terms: function (req,res){
        res.render('terminos',{})
    }
}

module.exports = indexController