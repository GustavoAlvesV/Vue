module.exports = app => {

    const  { notExistsOrError, existsOrError } = app.api.validation 

    const save = ( req, res ) => {
        const category = { ...req.body }

        if(req.params.id) category.id = req.params.id;

        try{
            existsOrError(category.name, 'Nome não informado')
        }catch(msg){
            return res.status(400).send(msg)
        }

        if(category.id){
            app.db('categories')
                .update(category)
                .where({ id:categoryId })
                .then( () => res.status(204).send() )
                .catch( err => res.status(500).send(err) )
        } else {
            app.db('categories')
                .insert(category)
                .then( () => res.status(204).send() )
                .catch( err => res.status(500).send(err) )
        }
    }

    const remove = async ( req, res ) => {
        //Verificiar se a categoria esta referenciada em algum artigo
        //Se estiver => NAO DELETA
        try{
            existsOrError(req.params.id, 'Código da categoria não informado.')
            
            const subcategory = await app.db('categories')
                .where({ parentId: req.params.id })
            notExistsOrError(subcategory, 'Categoria possui subcategorias.')
            
            const articles = await app.db('articles')
                .where({ categoryId: req.params.id })            
            notExistsOrError(articles, 'Categoria possui artigos.')


            const rowsDeleted = await app.db('categories')
                .where({ id: req.params.id }).del()
            
            existsOrError(rowsDeleted, 'Categoria não foi encontrada.')

            res.status(204).send()
        }catch(msg) {
            res.status(400).send(msg)
        }
    }

    const withPath = categories => {

        // Descobri quem é o pai de uma categoria a partir do id.
        const getParent = (categories, parentId) => {
            const parent = categories.filter(parent => parent.id === parentId)
            return parent.length ? parent[0] : null
        }

        //Vou mapear para cada categoria das categorias, 'se tiver um pai', quem é o pai dessa categoria
        // e tranformar um array de categorias em um outro array de categorias com um atributo a mais chamado "path"
        //Obs: no BD so tenho o id do pai, nao tenho mais informções, aqui obter o resto dessas informações
        const categoriesWithPath = categories.map(category => {
            let path = category.name
            let parent = getParent(categories, category.parentId)

            // Procura todos os pais ate chegar no nó raiz (que nao tem mais nenhum pai.)
            while(parent){
                path = `${parent.name} > ${path}`
                parent = getParent(categories, parent.parentId)
            }
            //Retorna categoria com atributo a mais path
            return {...category, path}
        }) 

        //Ordenar a lista de categorias pelo alfabeto.
        categoriesWithPath.sort(( a, b ) => {
            if(a.path < b.path) return -1
            if(a.path > b.path) return 1
            return 0
        })

        return categoriesWithPath
    }


    const get = ( req, res ) => {
        app.db('categories')
            .then(categories => res.json(withPath(categories)))
            .catch( err => res.status(500).send(err) )
    }

    const getById = ( req, res ) => {
        app.db('categories')
            .where({ id: req.params.id })
            .first()
            .then(category => res.json(category))
            .catch( err => res.status(500).send(err) )
    }
    
    return { save, remove, get, getById }
}
