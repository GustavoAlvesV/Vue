const admin = require('./admin')

module.exports = app => {
    //Rotas de autenticação
    //UNICAS URLS QUE NAO ESTARAM SEJEITAS A VALIDAÇÃO DO TOKEN
    // OUSEJA, SAO URLS PUBLICAS
    app.post('/signup', app.api.user.save) // para criar conta
    app.post('/signin', app.api.auth.signIn) //para logar
    app.post('/validateToken', app.api.auth.validateToken)

    //Rotas Usuarios:
    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.user.save))
        .get(admin(app.api.user.get))  
//   app.get('/users', app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(admin(app.api.user.save))
        .get(admin(app.api.user.getById))
        .delete(admin(app.api.user.remove))


    //Rotas Categorias:
    app.route('/categories')
        .all(app.config.passport.authenticate())
        .post(admin(app.api.category.save))
        .get(admin(app.api.category.get))

    // Cuidado na ordem das rodas, porque elas podem gerar impacto negativo.
    // Rotas mais especificas tem que vim antes de rotas mais geral
    // :id se vim antes pode confundir com /tree.

    app.route('/categories/tree')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getTree)
    
    app.route('/categories/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.category.getById)
        .put(admin(app.api.category.save))
        .delete(admin(app.api.category.remove))
    

    //Rotas artigos
    app.route('/articles')
        .all(app.config.passport.authenticate())
        .get(admin(app.api.article.get))
        .post(admin(app.api.article.save))

    app.route('/articles/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getById)
        .put(admin(app.api.article.save))
        .delete(admin(app.api.article.remove))

    app.route('/categories/:id/articles')
        .all(app.config.passport.authenticate())
        .get(app.api.article.getByCategory)


    //stats
    app.route('/stats')
        .all(app.config.passport.authenticate())
        .get(app.api.stat.get)

    //Rota inicio
    app.get('/', function(req,res){ 
        res.send("Bem Vindo");  
    })
}