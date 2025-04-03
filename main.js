import { BASE_URL } from "./secrets.js"
import { API_KEY } from "./secrets.js"
const original = document.getElementById("original")
const container = document.getElementById("container")
const nextButtons = document.querySelectorAll(".next-button")
const numberIcon = document.querySelectorAll(".number-icon")
const previousButtons = document.querySelectorAll(".previous-button")
const selectOne = document.querySelectorAll(".select-one")
const selectTwo = document.querySelectorAll(".select-two")
let currentCatagoryOne = null
let currentCatagoryTwo = null
console.log(currentCatagoryOne)

async function myApp() {
    let page = 1
    let region = "all"
    let bracket = "1v1"
    let pageNumber = 1

    console.log(selectOne)
    console.log(selectTwo)
    let rankingsAsyncAwait = null
    const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
    const data = await response.json()
    rankingsAsyncAwait = data

    async function divAdder() {
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
            if (elements) {
                clones.push(elements)
            }
            else console.warn(`Element with ID "clone-${i}" not found`)
        }
        return clones
    }

    async function getOriginalColor(catagory, select) {
        for (let i = 0; i < select.length; i++) {
            if (catagory !== select[i]) return select[i].classList.remove("blue")
                console.log(`removed blue from ${select[i]}`)
        }
    }

    async function grabCatagory(catagory, selectNumber) {
        if (catagory === currentCatagoryOne) {
            currentCatagoryOne = selectNumber; // Update currentCatagoryOne
        }
        selectNumber.classList.add("blue");
    }

    setTimeout(async () => {
        async function updateLeaderboard(page) {
            const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
            const data = await response.json()

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
                allClones[i].querySelector('.winrate').textContent = winRate
                allClones[i].querySelector('.elo').innerHTML = data[i].rating +
                    `<span style="color: gray; font-size: 12px;"> / ${data[i].peak_rating}</span>`
            }
        }

        await updateLeaderboard(page)

        nextButtons.forEach(nextButton => {
            if (nextButton) {
                nextButton.addEventListener('click', async () => {
                    if (pageNumber < 10) {
                        pageNumber++
                        page++
                        console.log(`Switching to page ${pageNumber}`)
                        numberIcon[0].textContent = pageNumber
                        numberIcon[1].textContent = pageNumber

                        await updateLeaderboard(page)
                    }
                });
            }
        })
        previousButtons.forEach(backButton => {
            if (backButton) {
                backButton.addEventListener('click', async () => {
                    if (pageNumber > 1) {
                        pageNumber--
                        page--
                        console.log(`switching to page ${pageNumber}`)
                        numberIcon[0].textContent = pageNumber
                        numberIcon[1].textContent = pageNumber

                        await updateLeaderboard(page)
                    }
                })
            }
        })
    }, 1000)
console.log(selectOne[0])
    selectOne[0].addEventListener('click',async () => {
        grabCatagory(currentCatagoryOne, selectOne[0])
        getOriginalColor(currentCatagoryOne, selectOne)
        console.log(currentCatagoryOne)
    })
    selectOne[1].addEventListener('click',async () => {
        grabCatagory(currentCatagoryOne, selectOne[1])
        getOriginalColor(currentCatagoryOne, selectOne)
        console.log(currentCatagoryOne)
    })
    selectTwo[0].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[0])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
    selectTwo[1].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[1])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
    selectTwo[2].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[2])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
    selectTwo[3].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[3])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
    selectTwo[4].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[4])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
    selectTwo[5].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[5])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
    selectTwo[6].addEventListener('click',async () => {
        grabCatagory(currentCatagoryTwo, selectTwo[6])
        getOriginalColor(currentCatagoryTwo, selectTwo)
        console.log(currentCatagoryTwo)
    })
}
myApp()