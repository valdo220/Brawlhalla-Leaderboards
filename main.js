import { BASE_URL } from "./secrets.js"
import { API_KEY } from "./secrets.js"

async function myApp() {
    let page = 1
    let region = "us-e"
    let bracket = "1v1"

    let rankingsAsyncAwait = null
    const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    rankingsAsyncAwait = data

    
}
myApp()