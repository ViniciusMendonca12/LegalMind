var Providencias = require("../models/ProvidenciasModel.js")
var Advogados = require("../models/AdvogadosModel.js")
var Peticoes = require("../models/PeticoesModel.js")

const OpenAI = require("openai");


class PeticoesController {

    async dadosEspecificosProvidenciaPeticao(providencia) {
        try {
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: `Tendo em vista a minha providência judiciaria com 
                o título: ${providencia.tituloProvidencia} e a 
                descricao: ${providencia.descricaoProvidencia}, é possivel pegar o
                número da vara, cidade, número do processo, nome inteiro?. A reposta sua deve
                manter um padrao direto com esse exemplo:- Número da vara: XX
                - Cidade: XX - Número do processo: XX - Nome inteiro: XX .
                Se nao tiver algum coloque na frente "Não há". Os XX sao para preencher,
                nao quero que me devolva assim`,
                    },
                ],
                max_tokens: 4000,
            });
            var peticaoProvidencia = completion.choices[0].message.content
            return peticaoProvidencia

        } catch (error) {
            console.error("Erro interno ao fazer a analise de dados especificos:", error);
        }
    }

    async trataDadosEspecificosProvidencia(data) {
        try {
            const result = {};

            // Regex atualizado para capturar a cidade com acentos e caracteres especiais
            const varaRegex = /Número da vara:\s*(\d+)/;
            const cidadeRegex = /Cidade:\s*([^\n]+)/;  // Aceita qualquer coisa até o final da linha
            const processoRegex = /Número do processo:\s*([\d.-]+)/;
            const nomeRegex = /Nome inteiro:\s*(.*)/;

            // Match e extrair os dados
            const varaMatch = data.match(varaRegex);
            const cidadeMatch = data.match(cidadeRegex);
            const processoMatch = data.match(processoRegex);
            const nomeMatch = data.match(nomeRegex);

            // Adicionar ao resultado se encontrado
            if (varaMatch) result.vara = varaMatch[1];
            if (cidadeMatch) result.cidade = cidadeMatch[1].trim(); // Remover espaços extras
            if (processoMatch) result.processo = processoMatch[1];
            if (nomeMatch) result.nome = nomeMatch[1].trim(); // Remover espaços extras

            return result;
        } catch (error) {
            console.error("Erro interno ao fazer o tratamento de dados especificos:", error);

        }

    }



    async carregaDocumentoPeticao(req, res) {
        var idProvidencia = req.params.idProvidencia

        var providenciaPeticao = await Peticoes.pegaInfoProvidenciasPeticao(idProvidencia)
        console.log("teste ----- providenciapeticao")
        console.log(providenciaPeticao)
        var dadosEspecificosProvidenciaPeticaoIA = await this.dadosEspecificosProvidenciaPeticao(providenciaPeticao)

        var dadosTratadosEspecificosProvidencia = await this.trataDadosEspecificosProvidencia(dadosEspecificosProvidenciaPeticaoIA)

        console.log(dadosEspecificosProvidenciaPeticaoIA)
        console.log("----Teste-----")
        console.log(dadosTratadosEspecificosProvidencia)

        res.render("peticao.ejs", { providenciaPeticao: providenciaPeticao, dadosEspecificos:dadosTratadosEspecificosProvidencia })
    }


}

module.exports = new PeticoesController()