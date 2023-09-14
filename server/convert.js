import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4" // pega o local aonde está salvo o audio
const outputPath = filePath.replace(".mp4" , ".wav") // converte o audio para .wav

// exporta a função convert
export const convert = () => new Promise ((resolve, reject) => {
  console.log("Convertendo o vídeo...")

  ffmpeg.setFfmpegPath(ffmpegStatic)
  ffmpeg()
  .input(filePath)
  .audioFrequency(16000)
  .audioChannels(1)
  .format("wav")
  .on("end" , () => {
    const file = fs.readFileSync(outputPath) // quando terminar de fazer a converção vai pegar o arquivo
    const fileDecoded = wav.decode(file) //decodificar o arquivo wav, pegar o audio e transformar em código

    const audioData = fileDecoded.channelData[0] // pegar os dados do audio atraves do array na primeira posição
    const floatArray = new Float32Array(audioData) // vai converter para o formato que a IA consegue entender

    console.log("Video convertido com sucesso!")
    resolve(floatArray)

    fs.unlinkSync(outputPath) // vai deletar o arquivo que não irá usar
  })
  .on("error",  (error) => {
    console.log("Erro ao converter o vídeo", error)
    reject(error)
  })
  .save(outputPath)
})