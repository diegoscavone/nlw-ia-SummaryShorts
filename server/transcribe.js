import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio) {
  try {
    //return transcriptionExample
    console.log("Realizando a transcrição...")

    //aqui vai definir qual o modelo de ia será usado
    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )
    // aqui é criado a tarefa de transcrição do audio
    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      languages: "portuguese",
      tanks: "transcribe"
    })

    console.log("Transcrição finalizada com sucesso!")
    return transcription?.text.replace("[Música]", "") //vai tirar a palavra musica e substituir por nada
  } catch (error) {
    throw new Error(error)
  }
}
