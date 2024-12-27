var Providencias = require("../models/ProvidenciasModel.js")

class ProvidenciasController{
    async cadastrarProvidencias(req, res, io){
        var providencias = req.body.selectedProvidencias
        console.log(providencias)

        var cadastrouProvidencia = await Providencias.cadastrarProvidencias(providencias)

        if(cadastrouProvidencia.status){
            console.log("salvou providencias")
            res.status(200).json({ success: true, message: "Providências salvas com sucesso." });
        }else{
            res.status(403).json({ success: false, message: "Houve um erro ao cadastrar as providências." });

        }
    }

    async listaTodasProvidencias(req, res){

        var providencias = await Providencias.listarTodasProvidencias()

        if(providencias == undefined){
            res.status(403).json({ success: false, message: "Houve um erro ao recuperar as providências" });
        }

        res.json(providencias)
    }

    async listaTodasProvidenciasFiltro(req, res){
        var dataConclusao = req.query.dataConclusao || null;
        var advogado = req.query.advogado || null;
        var compromissoTarefa = req.query.compromissoTarefa || null;
        var status = req.query.status || null;

        var providencias = await Providencias.listarTodasProvidencias(dataConclusao, advogado, compromissoTarefa, status)

        if(providencias == undefined){
            res.status(403).json({ success: false, message: "Houve um erro ao recuperar as providências" });
        }

        res.json(providencias)
    }

    async deletarProvidencia(req, res){
        var idProvidencia = req.params.idProvidencia

        var operacaoDeletar = await Providencias.deletarProvidencia(idProvidencia)

        if(!operacaoDeletar){
            res.status(403).json({ success: false, message: "Houve um erro ao deletar a providência" });
        }
        res.status(200).json({ success: true, message: "Providência deletada com sucesso" });

    }

    async vincularProvidencia(req, res){
        var idProvidencia = req.params.idProvidencia
        var linkVinculo = req.body.linkVinculo

        var operacaoVincular = await Providencias.vincularProvidencia(idProvidencia, linkVinculo)

        if(!operacaoVincular){
            res.status(403).json({ success: false, message: "Houve um erro ao vincular a providência" });
        }
        res.status(200).json({ success: true, message: "Providência vinculada com sucesso" });
 
    }

    async obterLinkHighQ(req, res){
        var idProvidencia = req.params.idProvidencia

        var operacaoVincular = await Providencias.obterLinkHighQ(idProvidencia)

        if(!operacaoVincular){
            res.status(403).json({ success: false, message: "Houve um erro ao obter o link do highq da providência" });
        }
        console.log(operacaoVincular)
        res.status(200).json({ success: true, message: "Link da providência pega com sucesso", link: operacaoVincular.linkHighQ });
        
    }

    async pegaProvidenciaUnica(req, res){
        var idProvidencia = req.params.idProvidencia

        var providencia = await Providencias.pegaProvidenciaUnica(idProvidencia)

        if(providencia.status == false){
            res.status(403).json({ success: false, message: "Houve um erro ao obter a providência" });
        }
        res.status(200).json({ success: true, message: "Providência pega com sucesso", providencia: providencia});
         
    }

    async editarProvidencia(req,res){
        var idProvidencia = req.params.idProvidencia
        var editarProvidenciaDados = req.body.editarProvidenciaDados

        var editarProvidencia = await Providencias.editarProvidencia(idProvidencia, editarProvidenciaDados)

        if(!editarProvidencia){
            res.status(403).json({ success: false, message: "Houve um erro ao editar a providência" });
        }
        res.status(200).json({ success: true, message: "Providência editada com sucesso" });
    }

    async marcarComoConcluida(req, res){
        var idProvidencia = req.params.idProvidencia

        var marcarComoConcluida = await Providencias.marcarComoConcluida(idProvidencia)

        if(!marcarComoConcluida){
            res.status(403).json({ success: false, message: "Houve um erro ao marcar como concluida a providência" });
        }
        res.status(200).json({ success: true, message: "Providência marcada como concluida com sucesso" });
 
    }

}

module.exports = new ProvidenciasController()