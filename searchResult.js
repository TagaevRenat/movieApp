//Скрываем карточки, если запрос некоректен
window.onload = function () {
    $('.hide').hide()

    let input = window.location.search.slice(7)
    loadPosters(`https://api.themoviedb.org/3/search/movie?api_key=b40bcd1b7a69127917daf2a39a52c832&query=${input}`)

    //Блок поиска
    $('.d-flex').submit(function (e) {
        e.preventDefault()
        let input = $('.form-control').val()
        input = input.replace(/ +/g, ' ').trim().toLowerCase().replace(/ /g, '+')
        location.href = `searchResult.html?query=${input}`
    })
}

function loadPosters(genreURL) {
    $.get(genreURL, function (data) {
        if (data.results.length == 0) {
            $('.text').text('Sorry, no results :( Try changing the query')
        }
        else {
            for (let i = 1; i < 11; i++) {
                let url = `https://image.tmdb.org/t/p/w500${data.results[i - 1].poster_path}`
                if (data.results[i - 1].poster_path) {
                    $(`#${i}`).attr('src', url)
                }
            }
            $('.card').click(function (e) {
                loadCard(e, genreURL)
            })
            $('.hide').show()
        }
    }
    ).fail(function () {
        $('.text').text('Sorry, no results :( Try changing the query')
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




