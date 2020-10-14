module.exports = app => {

    //Rotas Usuarios:
    app.route('/users')
        .post(app.api.user.save)
//        .get(app.api.user.get)  
    app.get('/users', app.api.user.get)

    app.route('/users/:id')
        .put(app.api.user.save)
        .get(app.api.user.getById)


    //Rotas Categorias:
    app.route('/categories')
        .post(app.api.category.save)
        .get(app.api.category.get)

    // Cuidado na ordem das rodas, porque elas podem gerar impacto negativo.
    // Rotas mais especificas tem que vim antes de rotas mais geral
    // :id se vim antes pode confundir com /tree.

    app.route('/categories/tree')
        .get(app.api.category.getTree)
    
    app.route('/categories/:id')
        .get(app.api.category.getById)
        .put(app.api.category.save)
        .delete(app.api.category.remove)
    

    //Rotas artigos
    app.route('/articles')
        .get(app.api.article.get)
        .post(app.api.article.save)

    app.route('/articles/:id')
        .get(app.api.article.getById)
        .put(app.api.article.save)
        .delete(app.api.article.remove)

    app.route('/categories/:id/articles')
        .get(app.api.article.getByCategory)

    //Rota inicio
    app.get('/', function(req,res){ 
        res.send("Bem Vindo");  
    })
}