const schedule = require('node-schedule')

module.exports = app => {
    // '*/1 * * * *' => ATUALIZAÇÃO DE MIN A MIN
    schedule.scheduleJob('*/1 * * * *', async function () {
        //Recebo dados do psql 
        const usersCount = await app.db('users').count('id').first()
        const categoriesCount = await app.db('categories').count('id').first()
        const articlesCount = await app.db('articles').count('id').first()

        const { Stat } = app.api.stat

        const lastStat = await Stat.findOne({}, {},
            { sort: { 'createdAt' : -1 } })

        //crio novo dado para adicionar no mongo
        const stat = new Stat({
            users: usersCount.count,
            categories: categoriesCount.count,
            articles: articlesCount.count,
            createdAt: new Date()
        })

        //Vou comparar ultima estatisca (no mongo) com nova estatistica  (de um min depois)
        //Para ver se de fato ela foi atualizada.
        //Se mudou => persisto no mongo
        // Se nao mudou => continuar    

        //Se ultima estatistica ainda nao foi setada (!lastStat) 
        // ou
        // nova estatistica e diferente da ultima estatistica.
        //Então devera haver mudança

        const changeUsers = !lastStat || stat.users !== lastStat.users
        const changeCategories = !lastStat || stat.categories !== lastStat.categories
        const changeArticles = !lastStat || stat.articles !== lastStat.articles

        if(changeUsers || changeCategories || changeArticles) {
            //Inserindo registo no mongodb.
            stat.save().then(() => console.log('[Stats] Estatíticas atualizadas!'))
        }
    })
}