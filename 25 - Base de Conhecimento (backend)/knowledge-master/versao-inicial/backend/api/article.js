const queries = require('./queries')

module.exports = app => {

    const { existsOrError } = app.api.validation

    // salvar e o alterar
    const save = ( req, res ) => {
            const article = {...req.body}

            if(req.params.id) article.id = req.params.id

            try{
                existsOrError(article.name, 'Nome não informado')
                existsOrError(article.description, 'Descrição não informada')
                existsOrError(article.categoryId,'Categoria não informada')
                existsOrError(article.userId, 'Autor não informado')
                existsOrError(article.content, 'Conteudo não informado')
            }catch(msg){
                return res.status(400).send(msg) //400: erro do lado cliente
            }

            if(article.id) {
                app.db('articles')
                    .update( article )
                    .where({ id: article.id })
                    .then(() => res.status(204).send()) // 204: tudo certo, nao tem nenhum dado para retornar
                    .catch(err => res.status(500).send(err)) //500: erro lado servidor.
            }else{
                app.db('articles')
                    .insert( article )
                    .then(() => res.status(204).send()) // 204: tudo certo, nao tem nenhum dado para retornar
                    .catch(err => res.status(500).send(err)) //500: erro lado servidor.
            }

    }

    // remover
    const remove = async ( req, res ) => {
        try{
            const rowsDeleted = await app.db('articles')  // Recebe o numero de linhas deletadas
                .where ({ id: req.params.id })
                .del()
            //Erro do usuario => ID nao existe, ou seja, BAD REQUEST
            try{
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            }catch(msg){
                return res.status(400).send(msg)
            }
            res.status(204).send() //Sucesso.
        }catch(msg){
            res.status(500).send(msg) // Erro lado servidor.
        }
    }

    //Paginação

    const limit = 10 //LIMITE DE ARTIGOS POR PÁGINA (Usado na páginação)

    const get = async ( req, res ) => {
        const page = req.query.page || 1

        const result = await app.db('articles').count('id').first() // Quantos registros tenho no banco (em objeto) 
                                                                    //Exemplo: result = {count: '10'}

        const count = parseInt(result.count) //Acessa a propriedade count do objeto result e transforma para inteiro.
        
        app.db('articles')
            .select('id', 'name', 'description')
            .limit(limit).offset(page * limit - limit)  //offset é um cálculo em cima do 'page' e 'limit', gera o deslocamento, ou seja,
                                                        // offset calcula de qual artigo (em um array) vc comeca a sua busca.
            .then(articles => res.json({ data: articles, count, limit }))
                                                        //Foi criado uma atributo data, e dentro de data vai ter os artigos.
                                                        // data vai ser um array e dentro dele vai ter os dados dos artigos.
            .catch(err => res.status(500).send(err))

    }

    const getById = ( req, res ) => {
        app.db('articles')
            .where({ id: req.params.id })
            .first()
            .then(article => {
                article.content = article.content.toString()
                return res.json(article)    
            })
            .catch(err => res.status(500).send(err))
    }

    //Filtrar os artigos pela categoria. => se categoria tiver filho, e para pegar os artigos
    //da categoria escolhida mais seus categoria dos seus filhos.

    const getByCategory = async (req, res) => {
        const categoryId = req.params.id
        const page = req.query.page || 1
        const categories = await app.db.raw(queries.categoryWithChildren, categoryId) 
        //'raw' quer dizer que vamos escrever um sql 'crú'a partir do knex 
        // Query pra encontrar categorias dos filhos, e dos filhos dos filhos e assim em diante.
        //Resultado é um objeto com muitos dados, onde os ids se encontram na propriedade 'rows'.
        //console.log(categories)
        //resposta:
        /*
            Result {
                command: 'SELECT',
                rowCount: 4,
                oid: null,
                rows: [ { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 } ],
                ...
        */

        const ids = categories.rows.map(c => c.id) //extrai os ids das categorias do objeto resposta da query.
                                                // resultado é um array com ids
        //console.log(ids)
        //  [ 5, 6, 7, 8 ]


        //consulta com JOIN
        app.db({a: 'articles', u: 'users'}) //usou alias
            .select('a.id', 'a.name', 'a.description', 'a.imageUrl', { author: 'u.name' }) //renomiei nome como autor.
            .limit(limit).offset(page * limit - limit)
            .whereRaw('?? = ??', ['u.id', 'a.userId']) //whereRaw é o 'ON'do join das duas tabelas, para encontrar de fato o usuario que o autor dos artigos.
            .whereIn('categoryId', ids) // 'In' em sql, é que vou buscar os ids que fazem parte da lista de ids chamada 'ids'.
            .orderBy('a.id', 'desc')  // Vai ordernar dos artigos mais novos para os mais antigos;
            .then(articles => res.json(articles))
            .catch(err => res.status(500).send(err))
    }

    
    return { save, remove, get, getById, getByCategory }
}