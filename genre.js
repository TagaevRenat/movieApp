
//Скрываем карточки, пока не выбрана категория
window.onload = function () {
    let id = window.location.search.slice(4)

    //Блок поиска
    $('.d-flex').submit(function (e) {
        e.preventDefault()
        let input = $('.form-control').val()
        input = input.replace(/ +/g, ' ').trim().toLowerCase().replace(/ /g, '+')
        location.href = `searchResult.html?query=${input}`
    })

    //Получаем данные по жанрам
    let genres = new Map()
    $.get("https://api.themoviedb.org/3/genre/movie/list?api_key=b40bcd1b7a69127917daf2a39a52c832&language=en-US", function (data) {
        for (let i = 0; i < 19; i++) {
            genres.set(data.genres[i].id, data.genres[i].name)
        }
        $('.fs-2').text(genres.get(Number(id)))
    })

    loadPosters(`https://api.themoviedb.org/3/discover/movie?api_key=b40bcd1b7a69127917daf2a39a52c832&language=en-US&sort_by=vote_average.desc&include_adult=true&include_video=false&page=1&vote_count.gte=500&with_genres=${id}&with_watch_monetization_types=flatrate`,)
    // $('.fs-2').text('Привет')
    // console.log(genres.has(35))

}

//Загружаем пачку постеров фильмов для отображения подборки
function loadPosters(genreURL, id) {
    $.get(genreURL, function (data) {
        for (let i = 1; i < 11; i++) {
            let url = `https://image.tmdb.org/t/p/w500${data.results[i - 1].poster_path}`
            $(`#${i}`).attr('src', url)
        }
    })
    $('.card').click(function (e) {
        loadCard(e, genreURL)
    })
}

//Наполняем карточку фильма
function loadCard(e, genreURL) {
    let id = e.target.id - 1
    $.get(genreURL, function (data) {
        let filmID = data.results[id].id
        location.href = `filmCard.html?id=${filmID}`
    })
}


