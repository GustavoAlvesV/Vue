module.exports = {
    //'?' é o que passei por parametro. (que é 'categoryId' da categoria pai)
    // SELECT id FROM categories WHERE id = ?  => estou selecionando o ID da propria categoria que passei.

    //      SELECT c.id FROM subcategories, categories c
    //          WHERE "parentId" = subcategories.id
    // => Estou fazendo um union do ID que passei + os IDs dos filhos dele.


    categoryWithChildren: `
        WITH RECURSIVE subcategories (id) AS ( 
            SELECT id FROM categories WHERE id = ?
            UNION ALL
            SELECT c.id FROM subcategories, categories c
            WHERE "parentId" = subcategories.id
        )
        SELECT id FROM subcategories
    `
}