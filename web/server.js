import axios from "axios"

// aqui vai criar uma conexão com o front end
export const server = axios.create({
  baseURL: "http://localhost:3333"
})