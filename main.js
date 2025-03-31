import { BASE_URL } from "./secrets.js"
import { API_KEY } from "./secrets.js"
const original = document.getElementById("original")
const container = document.getElementById("container")

async function myApp() {
    let page = 1
    let region = "us-e"
    let bracket = "1v1"

    let rankingsAsyncAwait = null
    const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
    const data = await response.json()
    console.log(data)
    rankingsAsyncAwait = data
    
    async function divAdder(){
        for (let i = 1; i < 50; i++) {
            let clone = original.cloneNode(true)
            container.appendChild(clone)
            clone.id = "clone-" + i;
            await new Promise(resolve => setTimeout(resolve, 10))
            console.log("Added clone:", clone);
        }
    }
        divAdder();
}
myApp()