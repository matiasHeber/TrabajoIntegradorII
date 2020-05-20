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

    logUser: function (req, res) {
        res.render('login', { error: "" });
    },

    confirmUser: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
        .then(resultado=>{
            if(resultado == undefined){
                res.redirect('/users/login')
            }else{
                res.redirect('/users/reviews/'+resultado.id)
            }
        })
    },

    getReviews: function (req,res) {
        db.Resena.findAll({
            where: [
                {usuario_id: req.params.id}
            ],
            include: [
                { association: "usuario" }
            ]
        })
        .then(resultado=>{
            console.log(resultado);
            
            res.render('reviews',{resultado:resultado})
        })
    },

    showEdit: function (req,res){
        db.Resena.findOne({
            where: [
                {id: req.params.id}
            ]
        })
        .then(resultado =>{
            res.render('editReview', {resultado: resultado})
        })
    }

}

module.exports = usersController;