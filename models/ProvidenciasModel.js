var knex = require("../database/connection")

class Providencias {

    async cadastrarProvidencias(providencias) {
        try {
            await knex.insert(providencias).table("providencias")

            return { status: true }

        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }

    async listarTodasProvidencias(dataConclusao, advogado, tarefaOuCompromisso, pendenteOuConcluido) {
        try {
            console.log(pendenteOuConcluido)
            var result =
                 knex.select("providencias.*", "advogados.nomeCompleto", "advogados.oab")
                    .table("providencias")
                    .leftJoin("advogados", "advogados.id", "providencias.idAdvogadoVinculado");


            if(advogado && advogado != 0){
                result = result.where("providencias.idAdvogadoVinculado", advogado)
            }

            if(tarefaOuCompromisso && tarefaOuCompromisso == 1){
                result = result.where("providencias.ehCompromisso", 0)
            }

            if(tarefaOuCompromisso && tarefaOuCompromisso == 2){
                result = result.where("providencias.ehCompromisso", 1)
            }

            if(pendenteOuConcluido && pendenteOuConcluido == 1){
                console.log("concluido")
                result = result.where("providencias.concluido", 1)
            }

            if(pendenteOuConcluido && pendenteOuConcluido == 2){
                result = result.where("providencias.concluido", 0)
            }

            if (dataConclusao && dataConclusao == 1) {
                result = result.orderBy("providencias.dataConclusao", "asc")
            }

            if( dataConclusao && dataConclusao == 2){
                result = result.orderBy("providencias.dataConclusao", "desc")
            }



            const query = await result;
            return query

        } catch (error) {
            console.log(error)
            return []
        }
    }

    async deletarProvidencia(idProvidencia) {
        try {
            await knex.delete().table("providencias").where("id", idProvidencia)

            return { status: true }

        } catch (error) { 
            console.log(error)
            return { status: false }
        }
    }

    async vincularProvidencia(idProvidencia, linkProvidencia) {
        try {
            await knex.update({linkHighQ: linkProvidencia}).table("providencias").where("id", idProvidencia)

            return { status: true }

        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }

    async obterLinkHighQ(idProvidencia, linkProvidencia) {
        try {
            var link = await knex.select("providencias.linkHighQ").table("providencias").where("id", idProvidencia).first()
            
            return link


        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }

    async pegaProvidenciaUnica(idProvidencia) {
        try {
            var providencia = await knex.select("providencias.*").table("providencias").where("id", idProvidencia).first()
            
            return providencia


        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }

    async editarProvidencia(idProvidencia, dadosProvidencia){
        try {
            await knex.update(dadosProvidencia).table("providencias").where("id", idProvidencia)

            return { status: true }

        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }

    async marcarComoConcluida(idProvidencia){
        try {

            await knex.update({concluido: 1}).table("providencias").where("id", idProvidencia)

            return { status: true }

        } catch (error) {
            console.log(error)
            return { status: false }
        }
    }


}


module.exports = new Providencias()