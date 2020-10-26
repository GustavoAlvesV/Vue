const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    
//    const existOrError = app.api.validation.existOrError

    const  { notExistsOrError, equalsOrError, existsOrError } = app.api.validation // Ao inves de declarar tudo igual em cima, foi usado operador destruictor

    const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10) 
        return bcrypt.hashSync(password, salt);
    }


    const save = async (req, res) => {
        const user = { ...req.body }
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false  //Se entrou pela url '/signup'
        if(!req.user || !req.user.admin) user.admin = false  // Entrou pela url '/users', e verificando se user da req é admin.
        
        try{
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(user.password, 'Senha não informada')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
        
            if(!user.id){

                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        }catch(msg) {
               return res.status(400).send(msg) //400: erro do lado cliente
        }
        

        user.password = encryptPassword(req.body.password)

        delete user.confirmPassword

        if(user.id){
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .whereNull('deletedAt')
                .then(_ => res.status(204).send()) // 204: tudo certo, nao tem nenhum dado para retornar
                .catch(err => res.status(500).send(err)) //500: erro lado servidor.
        }else{
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send()) // 204: tudo certo, nao tem nenhum dado para retornar
                .catch(err => res.status(500).send(err)) //500: erro lado servidor.
        }
    }

    const get = ( req, res ) => {
            app.db('users')
                .select('id', 'name', 'email','password', 'admin')
                .whereNull('deletedAt')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
    }

    const getById = ( req, res ) => {
        app.db('users')
            .select('id', 'name', 'email', 'admin')
            .where({ id: req.params.id })
            .whereNull('deletedAt')
            .first()
            .then(user => res.json(user))
            .catch(err => res.status(500).send(err))
    }

//SOFTDELETE    
    const remove = async (req, res) => {
        try {
            const articles = await app.db('articles')
                .where({ userId: req.params.id })
            notExistsOrError(articles, 'Usuário possui artigos.')

            const rowsUpdated = await app.db('users')
                .update({deletedAt: new Date()})
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Usuário não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}