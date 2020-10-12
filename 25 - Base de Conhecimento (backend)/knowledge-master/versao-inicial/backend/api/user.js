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
        
        try{
            existsOrError(user.name, 'Nome não informado')
            existsOrError(user.email, 'Email não informado')
            existsOrError(user.password, 'Senha não informado')
            existsOrError(user.confirmPassword, 'Confirmação de senha inválida')
            equalsOrError(user.password, user.confirmPassword, 'Senhas não conferem')

            const userFromDB = await app.db('users')
                .where({ email: user.email }).first()
        
            if(!user.id){
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        }   catch(msg) {
                return res.status(400).send(msg) //400: erro do lado cliente
        }
        

        user.password = encryptPassword(req.body.password)

        delete user.confirmPassword

        if(user.id){
            app.db('users')
                .update(user)
                .where({ id: user.id })
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
                .select('id', 'name', 'email', 'admin')
                .then(users => res.json(users))
                .catch(err => res.status(500).send(err))
    }

    const getById = ( req, res ) => {
        app.db('users')
        .select('id', 'name', 'email', 'admin')
        .where({ id: req.params.id })
        .first()
        .then(users => res.json(users))
        .catch(err => res.status(500).send(err))
    }

    return { save, get, getById }
}