var Advogados = require("../models/AdvogadosModel.js")
const bcrypt = require("bcryptjs")

class AdvogadosController{
    async mostraTodosAdvogados(req, res){
       var advogados = await Advogados.mostraTodosAdvogados()

       if(advogados != undefined ){
            res.json(advogados)
        }else{
            res.status(403).json({ success: false, message: "Houve um erro ao recuperar os advogados" });

        }

    }

    async autenticarLogin(req, res){
        try {
            var emailLogin = req.body.emailLogin
            var senhaLogin = req.body.senhaLogin
            
            var advogado = await Advogados.validacaoEmail(emailLogin)

            if(advogado){
/*                 var validacaoDeSenha = bcrypt.compareSync(senhaLogin, advogado.senha)
 */    
                if(senhaLogin == advogado.senha){
                        req.session.user = {
                        id: advogado.id,
                        emai: advogado.email,
                        nome: advogado.nomeCompleto
                    }
                    
                    
                    res.redirect("/dashboard")
                
                }else{
                    res.send("senha errada")
                }
            }else{
                res.send("email nao cadastrado")
            }
            
        } catch (error) {
            console.log(error+" erro interno de servidor")
            return
        }
    }
    
    async cadastrarAdvogado(req, res){
        try {

            var advogado = req.body.dados;
 
            var validaEmail = await Advogados.validacaoEmail(advogado.email)

            if(validaEmail != undefined){
                res.send("Email já cadastrado");
            }else{

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(advogado.senha, salt);

                var cadastraUsuario = await Advogados.cadastraUsuario(advogado.nomeCompleto, advogado.email, advogado.oab, hash)

                if(!cadastraUsuario.status){    
                    console.log("erro no cadastro")
                }

                var novoUsuario = await Advogados.validacaoEmail(advogado.email)

                var validacaoDeSenha = bcrypt.compareSync(advogado.senha, novoUsuario.senha);
                console.log("aq")
                if (validacaoDeSenha) {
                    req.session.user = {
                        id: novoUsuario.id,
                        email: novoUsuario.email,
                        nome: novoUsuario.nomeUsuario
                    };
                    /* res.redirect("/dashboard"); */
                } else {
                    res.send("Senha errada");
                }
            } 

        } catch (error) {
            console.log(error)
            return 
        }

    }
}

module.exports = new AdvogadosController()