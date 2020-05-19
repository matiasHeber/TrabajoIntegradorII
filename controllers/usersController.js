let db = require('../database/models')
let op = db.Sequelize.Op
let moduloLogin = require('../modulo-login')


let usersController = {
    getAll: function (req, res, next) {
        db.Usuario.findAll({
            include: [
                {association: 'resenas'}
            ]
        })
            .then(results => {
                return res.send(results)
                let listado = results[0]
                res.render('usersList', { listado: listado });
            })
    },

    buscar: function (req,res) {
        moduloLogin.chequearUsuario(req.query.email)
        .then (resultado =>{
            res.send(resultado)
        })
    },
    
    register: function (req,res) {
        let user = {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
        db.Usuario.findAll({
            where:[
                {email: req.body.email}
            ]
        })
        .then(resultado =>{
            console.log(req.body.email, resultado == undefined);
            
            if(resultado != undefined){
               return res.render('registerError', {error: "Email already taken..."})
            }else{
                db.Usuario.create(user)
                return res.redirect('/')
            }
        })
    },

}

module.exports = usersController;