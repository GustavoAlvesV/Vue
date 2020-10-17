const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
//VOU VALIDAR USURIO PARA ENTRAR
// Posso fazer essas funções manualmente.
// oU SEJA, e eu pegar a requisição, olhar seus cabeçalhos,
// e pegar o cabeçalho cujo nome é 'AUTHORIZATION'.
//  DEPOIS EXTRAIR o token que é definido nesse cabeçalho. 
/*
Exemplo manualmente:
    const authToken = req.headers['authorization'];

        if (authToken != undefined) {
            const bearer = authToken.split(' ');
            var token = bearer[1];
            jwt.verify(token, JWTSecret, (err, data) => {
                if (err) {
                    res.status(401);
                    res.json({ err: "Token inválido!" });
                } else {
                    req.loggedUser = { id: data.id, email: data.email };
                    req.empresa = "Guia do programador";
                    //res.json({token: bearer});
                    next();  //se todo processamento foi feito com sucesso
                }
            });
        } else {
            res.status(401);
            res.json({ err: "Token inválido!" });
        }
*/
// O passport Jwt faz isso pra gente.

const { Strategy, ExtractJwt } = passportJwt


module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() //Vai extrair token do request
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}