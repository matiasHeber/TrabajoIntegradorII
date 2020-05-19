let db = require('./database/models')

let moduloLogin = {
    buscarPorEmail: function (email) {
        return db.Usuario.findOne({
            where: {
                email: email
            }
        })
        .then(function(usuario) {
            return usuario != null;
        })
    }
}


module.exports = moduloLogin;