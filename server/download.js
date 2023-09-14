import ytdl from "ytdl-core"
import fs from "fs"

/* Função para exportar uma const donwload usando uma função
anonima passando como parametro o id do video */
export const download = videoId =>
  new Promise((resolve, reject) => { //A função ira executar primeiro a Promise, que contem duas opções resolver, ou rejeitar

    const videoURL = "https://www.youtube.com/shorts/" + videoId
    console.log("Realizando o download do vídeo: " + videoId)

    /* aqui passa a url do video, onde vai realizar o download do audio*/
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", info => {
        const seconds = info.formats[0].approxDurationMs / 1000 //nessa linha pega a quantidade de milessegundos do video e divide por 1000 convertendo de milessegundos para segundos

        // se a variavel seconds for maior que 60s acontecera um erro
        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos!")
        }
      })
      // quando finalizar o download do video
      .on("end", () => {
        console.log("Download do video finalizado.")
        resolve()
      })
      // caso haja um erro no download
      .on("error", error => {
        console.log(
          "Não foi possivel fazer o download do vídeo. Detalhes do erro: " +
            error
        )
        reject(error)
      })
      // recupera a informação do video e salva na pasta tmp
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
