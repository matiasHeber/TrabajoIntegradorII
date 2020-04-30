let db = require('../database/models')


let usersController = {
    getAll: function (req, res, next) {
        db.sequelize.query('SELECT * FROM users')
            .then(results => {
                let listado = results[0]
                res.render('usersList', { listado: listado });
            })
    },

}

module.exports = usersController;