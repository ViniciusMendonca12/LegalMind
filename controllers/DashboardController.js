var Providencias = require("../models/ProvidenciasModel.js")
var Advogados = require("../models/AdvogadosModel.js")


class DashboardController{

    async carregaPaginaDashboard(req, res){
        var idAdvogadoVinculado
        if(req.session.user){
            idAdvogadoVinculado = req.session.user
        }else{
            idAdvogadoVinculado = 0
        }
        req.session.user = {
            id: 1,
            emai: "vivicomferreira@hotmail.com",
            nome: "Vinícius Mendonçaa"
          }

        var providencias = await Providencias.listarTodasProvidencias()
        console.log(providencias)
        res.render("dashboard.ejs", {idAdvogadoVinculado: idAdvogadoVinculado, providencias:providencias})
        
          
    }

    async carregaPaginaCadastro(req, res){
        res.render("cadastro.ejs")
    }

    async carregaPaginaAnaliseDivergencia(req,res){
        var idAdvogadoVinculado
        if(req.session.user){
            idAdvogadoVinculado = req.session.user
        }else{
            idAdvogadoVinculado = 0
        }
        res.render("analiseDivergencia.ejs", {idAdvogadoVinculado:idAdvogadoVinculado})
    }

    async carregaPaginaGerenciarProvidencias(req,res){
        var providencias = await Providencias.listarTodasProvidencias()
        var advogados = await Advogados.mostraTodosAdvogados()
        var idAdvogadoVinculado

        if(req.session.user){
            idAdvogadoVinculado = req.session.user
        }else{
            idAdvogadoVinculado = 0
        }
        res.render("gerenciarProvidencias.ejs", {providencias:providencias, advogados:advogados, idAdvogadoVinculado:idAdvogadoVinculado })
    }

    async carregaPaginaAdvExecutor(req,res){
        var idAdvogadoVinculado
        if(req.session.user){
            idAdvogadoVinculado = req.session.user
        }else{
            idAdvogadoVinculado = 0
        }
        res.render("advExecutor.ejs", {idAdvogadoVinculado:idAdvogadoVinculado})
    }

    async carregaPaginaCadastrarProvidencias(req,res){
        var idAdvogadoVinculado
        if(req.session.user){
            idAdvogadoVinculado = req.session.user
        }else{
            idAdvogadoVinculado = 0
        }
        res.render("cadastrarProvidencias.ejs", {idAdvogadoVinculado:idAdvogadoVinculado})
    }
    
}

module.exports = new DashboardController()