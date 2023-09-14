import cors from "cors"
import express, { request, response } from "express"

import { convert } from "./convert.js"
import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
import { summarize } from "./summarize.js"

const app = express()
app.use(express.json())
app.use(cors())

/*Nessa parte será passado o método get /summary/:id
e a resposta será recuperado o parametro id do video da requisição*/
app.get("/summary/:id", async (request, response) => {
  try{
  await download(
    request.params.id
  ) /* Aqui está passando para a função download o id do video */
  const audioConverted = await convert() // após converter o audio
  
  //aqui é feito a transcrição
  const result = await transcribe(audioConverted)

  // aqui é o resultado do resumo
  return response.json({ result })
  } catch(error){
    console.log(error)
    return response.json({ error })
  }
})

app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text)
    return response.json({ result })
  } catch (error) {
    console.log(error)
    return response.json({ error })
  }
})

app.listen(3333, () => console.log("Server is running on port 3333"))
