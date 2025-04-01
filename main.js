import { BASE_URL } from "./secrets.js"
import { API_KEY } from "./secrets.js"
const original = document.getElementById("original")
const container = document.getElementById("container")

async function myApp() {
    let page = 1
    let region = "all"
    let bracket = "1v1"

    let rankingsAsyncAwait = null
    const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
    const data = await response.json()
    rankingsAsyncAwait = data
    
    async function divAdder(){
        for (let i = 0; i < 50; i++) {
            let clone = original.cloneNode(true)
            container.appendChild(clone)
            clone.id = "clone-" + i;
            await new Promise(resolve => setTimeout(resolve, 10))
        }
    }
    divAdder()

    async function getClones(count) {
        let clones = []
        for (let i = 0; i < count; i++) {
            let elements = document.getElementById("clone-" + i)
            if (elements){
                clones.push(elements)
            }
            else console.warn(`Element with ID "clone-${i}" not found`)
        }
        return clones
    }
console.log(data)
    setTimeout(async() => {
        let allClones = await getClones(50)
        for (let i = 0; i < allClones.length; i++) {
            let losses = data[i].games - data[i].wins
            let winRateDecimal = data[i].wins / data[i].games * 100
            let winRate = winRateDecimal.toFixed(2) + "%"

            allClones[i].querySelector('.rank').textContent = data[i].rank
            allClones[i].querySelector('.tier').textContent = data[i].tier
            allClones[i].querySelector('.region').textContent = data[i].region
            allClones[i].querySelector('.name').textContent = data[i].name
            allClones[i].querySelector('.games').textContent = data[i].games
            allClones[i].querySelector('.winLoss').innerHTML = 
            `<span style="color: green;">${data[i].wins}W</span> 
            <span style="color: red;">${losses}L</span>`
            allClones[i].querySelector('.elo').textContent = data[i].rating
            allClones[i].querySelector('.winrate').textContent = winRate
        }
    }, 2000)
}
myApp()