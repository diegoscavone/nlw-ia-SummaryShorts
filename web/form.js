import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

// o formulario ficara escutando o evento submit quando o formulário é enviado
form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder") //vai adicionar a classe placeholder

  // essa variavel recebera o conteudo do input
  const videoURL = input.value

  // se dentro da variavel videoURL não conter a palavra "shorts" irá retornar a mensagem
  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser um short")
  }
  // ele vai separar a url, antes e depois do texto /shorts
  const [_, params] = videoURL.split("/shorts/")
  const [videoId] = params.split("?si")

  content.textContent = "Obtendo o texto do áudio..."

  // requisição para o back-end retornar a transcrição do audio, e com a função await vai aguardar a etapa terminar para continuar o codigo
  const transcription = await server.get("/summary/" + videoId)

  // todo o conteudo retornado pelo axios é saldo dentro de data, e utilizando data.result retornara o resultado do conteudo
  content.textContent = "Realizando o resumo..."

  // nova requisição pelo metodo post enviando o resultado da transcrição
  const summary = await server.post("/summary", {
    text: transcription.data.result
  })
  content.textContent = summary.data.result // aqui vai mostrar o texto no fron end na área content
  content.classList.remove("placeholder") //vai remover a classe placeholder
})
