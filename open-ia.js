const OpenAI = require("openai");



const openai = new OpenAI({
  apiKey: "sk-arPE-a9QBFT7TPH8yTE6EJKCl7I_ipf4Swdw4OuuifT3BlbkFJeclRGrtH19k3BcnoJ1wuFte8DblLK4s7i7KMdBaSYA",  // Use your actual API key here
  organization: "org-cOmpkpohfqcJ9nUAHXNxT3sI",
  project: "proj_OGx4Dd5TD6puRbwtRmaoYAq4",
});

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use a valid model name like gpt-3.5-turbo or gpt-4
      messages: [
        {
          role: "system",
          content: `Você é um assistente de advogado. Sua função é otimizar o trabalho dos advogados fazendo análise de publicações judiciais que lhe serão entregues. Você deve analisar a publicação e pontualmente gerar todas as providências necessárias para cada uma. A publicação é: ${publicacao}`,
        },
      ],
      max_tokens: 1000,  // Adjust token limit if necessary
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Erro ao fazer a requisição:", error);
  }
}

main();
