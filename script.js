//Загружаем пачку постеров фильмов для отображения подборки
window.onload = loadPosters(genreURL = 'https://api.themoviedb.org/3/movie/top_rated?api_key=b40bcd1b7a69127917daf2a39a52c832&language=en-US&page=1')
function loadPosters(genreURL) {
    $.get(genreURL, function (data) {
        for (let i = 1; i < 11; i++) {
            let url = `https://image.tmdb.org/t/p/w500${data.results[i - 1].poster_path}`
            $(`#${i}`).attr('src', url)
        }
    })
    $('.card').click(function (e) {
        loadModal(e, genreURL)
    })

    //Блок поиска
    $('.d-flex').submit(function (e) {
        e.preventDefault()
        let input = $('.form-control').val()
        input = input.replace(/ +/g, ' ').trim().toLowerCase().replace(/ /g, '+')
        location.href = `searchResult.html?query=${input}`
    })
}

//Получаем данные по жанрам, записываем в объект
let genres = new Map()
$.get("https://api.themoviedb.org/3/genre/movie/list?api_key=b40bcd1b7a69127917daf2a39a52c832&language=en-US", function (data) {
    for (let i = 0; i < 19; i++) {
        genres.set(data.genres[i].id, data.genres[i].name)

    }
})

//Запускаем модальное окно
var myModal = new bootstrap.Modal($('#myModal'), {
})


//Наполняем карточку фильма в модальном окне
function loadModal(e = 1, url = 'https://api.themoviedb.org/3/movie/top_rated?api_key=b40bcd1b7a69127917daf2a39a52c832&language=en-US&page=1') {
    let id = e.target.id - 1
    $.get(url, function (data) {
        $('.modal-title').html(`${data.results[id].title}`)
        $('.overView').html(`${data.results[id].overview}`)
        $('#modalImg').attr('src', `https://image.tmdb.org/t/p/w500${data.results[id].poster_path}`)
        $('.language').html(`<b>Original language:</b> ${data.results[id].original_language}`)
        $('.popularity').html(`<b>Popularity:</b> ${data.results[id].popularity}`)
        $('.releaseDate').html(`<b>Release date</b>:</b> ${data.results[id].release_date}`)
        $('.voteAverage').html(`<b>Vote average:</b> ${data.results[id].vote_average}`)
        $('.voteCount').html(`<b>Vote count:</b> ${data.results[id].vote_count}`)
        $('.filmCard').attr('href', `filmCard.html?id=${data.results[id].id}`)
        let genreID = data.results[id].genre_ids
        let currentGenreArr = []
        for (let i = 0; i < genreID.length; i++) {
            if (genres.has(genreID[i])) {
                currentGenreArr.push(genres.get(genreID[i]))
            }
        }
        let currentGenre = currentGenreArr.join(', ')
        $('.genre').html(`<b>Genre:</b> ${currentGenre}`)
    })
    myModal.show()
}



