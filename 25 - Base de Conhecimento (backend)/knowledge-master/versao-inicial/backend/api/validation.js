module.exports = app => {
        // Se o valor existir => Ok
    // Se o valor não existir => ERRO => MSG

    // SÃO AS REGRAS, PARA DIZER, O QUE DENTRO DO MEU SISTEMA DEVE EXISTIR
    // OU EXISTE OU ERRO (SE NAO EXISTIR É ERRO)
    function existsOrError(value, msg){
        if(!value) throw msg
        if(Array.isArray(value) && value.length == 0) throw msg
        if(typeof value === 'string' && !value.trim())  throw msg 
    }

    // SÃO AS REGRAS, PARA DIZER, O QUE DENTRO DO MEU SISTEMA NAO DEVE EXISTIR
    // OU NAO EXISTE OU ERRO (SE EXISTIR É ERRO)
    function notExistsOrError(value){
        try{
            existsOrError(value, msg)
        }catch(msg){  // SE RETORNA MSG => NAO EXISTE / SE NAO EXISTE => OK
            return
        }
        throw msg  // SE NAO RETORNA MSG => EXISTE / SE EXISTE => ERRO
    }


    //TESTA 2 VALORES SE SÃO IGUAIS.
    // SE IGUAIS => OK
    // SE DIFERENTES => ERRO
    function equalsOrError(valueA, valueB, msg ){
        if(valueA !== valueB) throw msg
    }

    return{ existsOrError, notExistsOrError, equalsOrError }
}