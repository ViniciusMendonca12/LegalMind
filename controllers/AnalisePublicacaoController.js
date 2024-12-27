const OpenAI = require("openai");


class AnalisePublicacaoController{

    async geraDataAtual(){
      const dataAtual = new Date();
      const ano = dataAtual.getFullYear();
      const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Meses começam do 0
      const dia = String(dataAtual.getDate()).padStart(2, '0');
      const horas = String(dataAtual.getHours()).padStart(2, '0');
      const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
      const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
  
      const dataFormatada = `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
      return dataFormatada;
    }

      async analisePublicacaoIA(publicacao) {
        try {
          const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", 
            messages: [
              {
                role: "system",
                content: `Você é um assistente de advogado. Sua função é otimizar o trabalho dos advogados fazendo análise de publicações judiciais que lhe serão entregues. Você deve analisar a publicação e pontualmente gerar todas as providências necessárias para cada uma isso deve ser uma analise, nao um copia e cola. Você deve se portar como um controller, é você quem dita os as regras e nao quem envia para outra pessoa que depois ira repassar novamente. Você deve fornecer as providencias seguindo o seguinte modelo: "1. *TJ-MS - Recurso Inominado Cível nº 0802498-03.2022.8.12.0019* - *Providência:* - Informar ao cliente sobre a manutenção da sentença com a indenização de R$ 5.000,00 e que o recurso da ré não foi provido." Ou seja, o numero da providencia(É MUITO IMPORTANTE TER O NUMERO DE CADA PROVIDENCIA NA FRENTE DO NUMERO DO PROCESSO, MESMO QUE SÓ TENHA 1), o processo e abaixo a providencia. A publicação é: ${publicacao}`,
              },
            ],
            max_tokens: 4000,  
          });
          var publicacaoAnalisada = completion.choices[0].message.content
          return publicacaoAnalisada

        } catch (error) {
          console.error("Erro ao fazer a requisição:", error);
        }
      }

    async geraProvidencias(publicacaoAnalisada){
      try {
        const regex = /(\d+)\.\s([\s\S]*?)\s-\s\*Providência:\*\s([\s\S]*?)(?=\d+\.\s|$)/g;
        let match;
        const secciones = [];
        
        while ((match = regex.exec(publicacaoAnalisada)) !== null) {
            const numero = match[1].trim(); 
            const tituloParte = match[2].trim(); 
            const descricaoProvidencia = match[3].trim(); 
        
            const tituloProvidencia = `${numero}. ${tituloParte}`; 
            const dataCriacaoProvidencia = await this.geraDataAtual();
        
            secciones.push({ tituloProvidencia, descricaoProvidencia, dataCriacaoProvidencia });
        }
        
        return secciones;

      } catch (error) {
        console.error('Erro ao processar a publicação:', error);

      }
    }
      

    async analisePublicacao(req, res, io){
        try {
          var publicacao = req.body.publicacao
           
          var publicacaoIA = await this.analisePublicacaoIA(publicacao)
            console.log(publicacaoIA)
 
            console.log("Publicação enviada do servidor");
          var providencias = await this.geraProvidencias(publicacaoIA)
          console.log(providencias)

 
          io.emit("providencias", providencias);
          res.status(200).send({ success: true });

          


        } catch (error) {
            console.error('Erro ao processar a publicação:', error);
            res.status(500).send({ success: false, message: 'Erro ao processar a publicação' });
        }
    }

  
    
}

module.exports = new AnalisePublicacaoController()