let db = require('../database/models');
let op = db.Sequelize.Op;
let moduloLogin = require('../modulo-login');
let bcrypt = require('bcryptjs');


let usersController = {
    getAll: function (req, res, next) {
        db.Usuario.findAll({
            include: [
                {association: 'resenas'}
            ]
        })
            .then(results => {
                // return res.send(results)
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
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        let user = {
            name: req.body.username,
            email: req.body.email,
            password: hash
        }
        db.Usuario.findAll({
            where:[
                {email: req.body.email}
            ]
        })
        .then(resultado =>{
            console.log(req.body.email, resultado == undefined);
            
            if(resultado == undefined){
               return res.render('registerError', {error: "Email already taken..."})
            }else{
                db.Usuario.create(user)
                return res.redirect('/')
            }
        })
    },

    logUser: function (req, res) {
        res.render('login', { tipo: "log" });
    },

    confirmUser: function (req, res) {
        moduloLogin.validar(req.body.email, req.body.password)
        .then(resultado=>{
            if(resultado == undefined){
                res.redirect('/users/reviews')
            }else{
                console.log(resultado.id);
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
    },

    confirmEdit: function (req, res) {
        console.log(req.params.id);
        let updateR = {
            resena: req.body.resena,
            puntaje: req.body.puntaje,
            id: req.params.id
        }

        db.Resena.update({
            resena: updateR.resena,
            puntaje: updateR.puntaje
        },{
            where: {
                id: updateR.id,      
            }
        } 
        ).then(()=>{
            db.Resena.findByPk(req.params.id)
            .then(resultado =>{  
                res.redirect('/users/reviews/'+resultado.usuario_id)
            })
        })
    },

    deleteReview: function (req,res) {
        res.render('login', { tipo: "delete", deleteId: req.params.id})
    },

    confirmDelete: function (req,res) {
        moduloLogin.validar(req.body.email, req.body.password)
        .then(resultado =>{
            if (resultado != null) {
                db.Resena.destroy({
                    where: {
                        id: req.params.id,
                    }
                })
                res.redirect('/users/reviews/')
            }else{
                res.redirect('/users/reviews/delete/'+ req.params.id)
            }
        })
    },

}

module.exports = usersController;