import { BASE_URL } from "./secrets.js"
import { API_KEY } from "./secrets.js"
const original = document.getElementById("original")
const container = document.getElementById("container")
const nextButtons = document.querySelectorAll(".next-button")
const numberIcon = document.querySelectorAll(".number-icon")
const previousButtons = document.querySelectorAll(".previous-button")
const selectOne = document.querySelectorAll(".select-one")
const selectTwo = document.querySelectorAll(".select-two")
const player1 = document.querySelector(".player1")
const player2 = document.querySelector(".player2")
const propertiesInsideLeaderboard = document.querySelector(".properties-inside-leaderboard")
const propertiesOfLeaderboard = document.querySelector(".properties-of-leaderboard")
let currentCatagoryOne = null
let currentCatagoryTwo = null

async function myApp() {
    let page = 1
    let region = "all"
    let bracket = "1v1"
    let pageNumber = 1
    let brawhalla_id

    let rankingsAsyncAwait = null
    const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
    const data = await response.json()
    rankingsAsyncAwait = data
    let playerIdAsyncAwait = null
    const responsePlayer = await fetch(`${BASE_URL}/player/${brawhalla_id}/stats?&api_key=${API_KEY}`)
    const dataPlayer  =  await responsePlayer.json()
    playerIdAsyncAwait = dataPlayer

    for (let i = 0; i < data.length; i++) {
        let clone = original.cloneNode(true)
        container.appendChild(clone)
        clone.id = "clone-" + i;
    }


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

    async function removeBlueFromPrev(select) {
        for (let i = 0; i < select.length; i++) {
            if (select[i].classList.contains("blue")){
                select[i].classList.remove("blue")
                return
            }
        }
    }

    async function switchingRegions(select, selectNumber) {
        for (let i = 0; i < select.length; i++) {
            if (select[i].classList.contains("blue")) {
                region = selectNumber.textContent.toLowerCase()
            }
        }
    }

    async function switchingHeader() {
        if (bracket === "1v1") {
            player2.style.display = "none"
            player1.textContent = "name"
            propertiesInsideLeaderboard.style.gridTemplateColumns = "3rem 5rem 5rem auto 5rem 8rem 6rem 6rem"
            propertiesOfLeaderboard.style.gridTemplateColumns = "3rem 5rem 5rem auto 5rem 8rem 6rem 6rem"
        }
        if (bracket === "2v2") {
            player2.style.display = "block"
            player1.textContent = "player 1"
            propertiesInsideLeaderboard.style.gridTemplateColumns = "3rem 5rem 5rem auto auto 5rem 8rem 6rem 6rem"
            propertiesOfLeaderboard.style.gridTemplateColumns = "3rem 5rem 5rem auto auto 5rem 8rem 6rem 6rem"
        }
    }

    async function switchingBrackets(selectNumber) {
        bracket = selectNumber.textContent
        }

    function grabCatagory(selectNumber) {
        selectNumber.classList.add("blue");
        return selectNumber
    }

    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            console.log(this)
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }


        async function updateLeaderboard(page) {
            const response = await fetch(`${BASE_URL}/rankings/${bracket}/${region}/${page}?&api_key=${API_KEY}`)
            const data = await response.json()
            if (bracket === "2v2") {
                const responsePlayer = await fetch(`${BASE_URL}/player/${brawhalla_id}/stats?&api_key=${API_KEY}`)
                const dataPlayer  =  await responsePlayer.json()
            }
                
            let allClones = await getClones(data.length)
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
                    if (bracket === "2v2") {
                        allClones[i].querySelector('.player1').textContent = data[i].brawlhalla_id_one
                        allClones[i].querySelector('.player2').textContent = data[i].brawlhalla_id_two
                    }
            }
        }

        await updateLeaderboard(page)

        nextButtons.forEach(nextButton => {
            if (nextButton) {
                nextButton.addEventListener('click', throttle(async () => {
                    if (pageNumber < 10) {
                        pageNumber++
                        page++
                        console.log(`Switching to page ${pageNumber}`)
                        numberIcon[0].textContent = pageNumber
                        numberIcon[1].textContent = pageNumber

                        await updateLeaderboard(page)
                    }
                }, 500))
            }
        })
        previousButtons.forEach(backButton => {
            if (backButton) {
                backButton.addEventListener('click', throttle(async () => {
                    if (pageNumber > 1) {
                        pageNumber--
                        page--
                        console.log(`switching to page ${pageNumber}`)
                        numberIcon[0].textContent = pageNumber
                        numberIcon[1].textContent = pageNumber

                        await updateLeaderboard(page)
                    }
                }, 500))
            }
        })
    console.log(selectOne[0])
    selectOne[0].addEventListener('click', async() => {
        removeBlueFromPrev(selectOne)
        currentCatagoryOne = grabCatagory(selectOne[0])
        switchingBrackets(selectOne[0])
        switchingHeader()
        updateLeaderboard(page)
        console.log(data)
        console.log(currentCatagoryOne)
        console.log(bracket)
    })
    selectOne[1].addEventListener('click', () => {
        removeBlueFromPrev(selectOne)
        currentCatagoryOne = grabCatagory(selectOne[1])
        switchingBrackets(selectOne[1])
        switchingHeader()
        updateLeaderboard(page)
        console.log(data)
        console.log(currentCatagoryOne)
        console.log(bracket)
    })
    selectTwo[0].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[0])
        switchingRegions(selectTwo, selectTwo[0])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
    selectTwo[1].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[1])
        switchingRegions(selectTwo, selectTwo[1])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
    selectTwo[2].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[2])
        switchingRegions(selectTwo, selectTwo[2])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
    selectTwo[3].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[3])
        switchingRegions(selectTwo, selectTwo[3])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
    selectTwo[4].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[4])
        switchingRegions(selectTwo, selectTwo[4])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
    selectTwo[5].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[5])
        switchingRegions(selectTwo, selectTwo[5])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
    selectTwo[6].addEventListener('click', () => {
        removeBlueFromPrev(selectTwo)
        currentCatagoryTwo = grabCatagory(selectTwo[6])
        switchingRegions(selectTwo, selectTwo[6])
        updateLeaderboard(page)
        console.log(region)
        console.log(currentCatagoryTwo)
    })
}
myApp()