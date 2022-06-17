let wIcon = document.querySelectorAll('#weather-icon')
let searchBar = document.querySelector('#search-bar')
let searchBtn = document.querySelector('#search-btn')
let mainCity = document.querySelector('.main-city')
let mainTemp = document.querySelector('#main-temp')
let mainHumid = document.querySelector('#main-humid')
let mainWind = document.querySelector('#main-wind')
let mainUv = document.querySelector('#main-uv')
let mainIcon = document.querySelector('#main-icon')
let dailyForecast = document.querySelector('#daily-forecast')
let searchArea = document.querySelector('.search-area')
var date = new Date()
var dateMonth = date.getMonth()
dateMonth = dateMonth + 1
var dateDay = date.getDate()
var dateYear = date.getFullYear()

// let apiKey = '39d5ef987e1c9e7714c917079d549648'
let apiKey = config.apiKey
let dailySearch = 'https://api.openweathermap.org/data/2.5/onecall?'

let search = function() {
    let searchDiv = document.createElement('div')
    searchArea.appendChild(searchDiv)
    let searchCard = document.createElement('div')
    searchCard.classList.add("m-3")
    searchDiv.appendChild(searchCard)
    let historyBtn = document.createElement('button')
    historyBtn.classList.add("btn-seconday", "w-100")
    searchCard.appendChild(historyBtn)
    historyBtn.textContent = searchBar.value
    historyBtn.addEventListener("click", historySearch, true)
    
    preformSearch()
}

let preformSearch = function () {
    let citySearch = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value}&appid=${apiKey}&units=metric`
    fetch(citySearch)
    .then(function (response) {
    if (!response.ok) {
        throw response.json();
    }
    return response.json();
    })
    .then (function(maindata) {
        console.log(maindata) // initial fetch here to make main card
        console.log(maindata.coord)
        console.log(maindata.weather[0].icon)
        mainCity.innerHTML = `${maindata.name} ${dateDay}/${dateMonth}/${dateYear}<span class='ml-3'><img src='http://openweathermap.org/img/wn/${maindata.weather[0].icon}@2x.png' alt="weather icon"></img></span>`
        mainTemp.textContent = `Temperature: ${maindata.main.temp} celsius`
        mainHumid.textContent = `Humidity: ${maindata.main.humidity}%`
        mainWind.textContent = `Wind: ${maindata.wind.speed} mph`
        
        fetch(`${dailySearch}lat=${maindata.coord.lat}&lon=${maindata.coord.lon}&appid=${apiKey}&units=metric`)
        .then(function (response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data) // making daily cards here
            console.log(data.current.weather[0].icon)
            mainUv.innerHTML = `Uv: <span id='uv-color'>${data.current.uvi}</span>`
            if (data.current.uvi < 3) {
                document.querySelector('#uv-color').style.backgroundColor = 'green';
            } else if (data.current.uvi > 2 && data.current.uvi < 6) {
                document.querySelector('#uv-color').style.backgroundColor = 'yellow'
            } else if (data.current.uvi > 5 && data.current.uvi < 9) {
                document.querySelector('#uv-color').style.backgroundColor = 'orange'
            } else if (data.current.uvi > 8) {
                document.querySelector('#uv-color').style.backgroundColor = 'red'
            }
            document.querySelector('#uv-color').classList.add('px-2')
            dailyForecast.innerHTML = ''
            for (let i = 0; i < 5; i++) {
            let cardDiv = document.createElement('div')
            cardDiv.classList.add('card', 'mt-4')
            dailyForecast.appendChild(cardDiv)
            let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            cardDiv.appendChild(cardBody)
            let dailyDate = document.createElement('h2') // daily header date
            dailyDate.textContent = `${dateDay + i}/${dateMonth}/${dateYear}`
            cardBody.appendChild(dailyDate)
            let dailyImg = document.createElement('img') // daily weather icon
            dailyImg.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
            cardBody.appendChild(dailyImg)
            let dailyTemp = document.createElement('h5') // daily temp
            dailyTemp.textContent = `Temp: ${data.daily[i].temp.day} celsius`
            cardBody.appendChild(dailyTemp)
            let dailyWind = document.createElement('h5') // daily wind 
            dailyWind.textContent = `Wind: ${data.daily[i].wind_speed} mph`
            cardBody.appendChild(dailyWind)
            let dailyHumid = document.createElement('h5') // daily humidity
            dailyHumid.textContent = `Humidity: ${data.daily[i].humidity}%`
            cardBody.append(dailyHumid)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    })
    .catch(function (error) {
        console.error(error)
    })
}

let historySearch = function () {
    console.log('ffff')
    let historySearch = `https://api.openweathermap.org/data/2.5/weather?q=${this.textContent}&appid=${apiKey}&units=metric`
    fetch(historySearch)
    .then(function (response) {
    if (!response.ok) {
        throw response.json();
    }
    return response.json();
    })
    .then (function(maindata) {
        console.log(maindata) // initial fetch here to make main card
        console.log(maindata.coord)
        console.log(maindata.weather[0].icon)
        mainCity.innerHTML = `${maindata.name} ${dateDay}/${dateMonth}/${dateYear}<span class='ml-3'><img src='http://openweathermap.org/img/wn/${maindata.weather[0].icon}@2x.png' alt="weather icon"></img></span>`
        mainTemp.textContent = `Temperature: ${maindata.main.temp} celsius`
        mainHumid.textContent = `Humidity: ${maindata.main.humidity}%`
        mainWind.textContent = `Wind: ${maindata.wind.speed} mph`
        
        fetch(`${dailySearch}lat=${maindata.coord.lat}&lon=${maindata.coord.lon}&appid=${apiKey}&units=metric`)
        .then(function (response){
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function(data) {
            console.log(data) // making daily cards here
            console.log(data.current.weather[0].icon)
            mainUv.innerHTML = `Uv: <span id='uv-color'>${data.current.uvi}</span>`
            if (data.current.uvi < 3) {
                document.querySelector('#uv-color').style.backgroundColor = 'green';
            } else if (data.current.uvi > 2 && data.current.uvi < 6) {
                document.querySelector('#uv-color').style.backgroundColor = 'yellow'
            } else if (data.current.uvi > 5 && data.current.uvi < 9) {
                document.querySelector('#uv-color').style.backgroundColor = 'orange'
            } else if (data.current.uvi > 8) {
                document.querySelector('#uv-color').style.backgroundColor = 'red'
            }
            document.querySelector('#uv-color').classList.add('px-2')
            dailyForecast.innerHTML = ''
            for (let i = 0; i < 5; i++) {
            let cardDiv = document.createElement('div')
            cardDiv.classList.add('card', 'mt-4')
            dailyForecast.appendChild(cardDiv)
            let cardBody = document.createElement('div')
            cardBody.classList.add('card-body')
            cardDiv.appendChild(cardBody)
            let dailyDate = document.createElement('h2') // daily header date
            dailyDate.textContent = `${dateDay + i}/${dateMonth}/${dateYear}`
            cardBody.appendChild(dailyDate)
            let dailyImg = document.createElement('img') // daily weather icon
            dailyImg.src = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`
            cardBody.appendChild(dailyImg)
            let dailyTemp = document.createElement('h5') // daily temp
            dailyTemp.textContent = `Temp: ${data.daily[i].temp.day} celsius`
            cardBody.appendChild(dailyTemp)
            let dailyWind = document.createElement('h5') // daily wind 
            dailyWind.textContent = `Wind: ${data.daily[i].wind_speed} mph`
            cardBody.appendChild(dailyWind)
            let dailyHumid = document.createElement('h5') // daily humidity
            dailyHumid.textContent = `Humidity: ${data.daily[i].humidity}%`
            cardBody.append(dailyHumid)
            }
        })
        .catch(function (error) {
            console.error(error)
        })
    })
    .catch(function (error) {
        console.error(error)
    })
}

searchBtn.addEventListener("click", search)