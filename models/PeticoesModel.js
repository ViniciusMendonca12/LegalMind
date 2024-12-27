var knex = require("../database/connection")

class Peticoes{

    async pegaInfoProvidenciasPeticao(idProvidencia){
        try {
            var providenciasPeticao =
             await knex.select("providencias.tituloProvidencia",
                               "providencias.descricaoProvidencia",
                               "advogados.nomeCompleto",
                               "advogados.oab"

            ).table("providencias")
             .innerJoin("advogados", "advogados.id", "providencias.idAdvogadoVinculado")
             .where("providencias.id", idProvidencia)
             .first()

            return providenciasPeticao
            
        } catch (error) {
            console.log(error)
            return []
        }
    } 

}


module.exports = new Peticoes()