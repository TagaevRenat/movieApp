window.onload = function () {

    let id = window.location.search.slice(4)

    $.get(`https://api.themoviedb.org/3/movie/${id}?api_key=b40bcd1b7a69127917daf2a39a52c832&language=en-US`, function (data) {
        $('.card-header').html(`${data.title}`)
        $('.overviewInfo').html(`<b>Overview: </b>${data.overview}`)
        if (data.poster_path == null) {
            $('.card-img-top').attr('src', `posterNotFound.jpg`)
        }
        else {
            $('.card-img-top').attr('src', `https://image.tmdb.org/t/p/w500${data.poster_path}`)
        }
        $('.languageInfo').html(`<b>Original language:</b> ${data.original_language}`)
        $('.popularityInfo').html(`<b>Popularity:</b> ${data.popularity}`)
        $('.releaseDateInfo').html(`<b>Release date</b>:</b> ${data.release_date}`)
        $('.voteAverageInfo').html(`<b>Vote average:</b> ${data.vote_average}`)
        $('.voteCountInfo').html(`<b>Vote count:</b> ${data.vote_count}`)
        $('.budgetInfo').html(`<b>Budget:</b> ${data.budget}`)
        $('.statusInfo').html(`<b>Status:</b> ${data.status}`)
        $('.countryInfo').html(`<b>Country:</b> ${data.production_countries[0].name}`)
        let genreID = data.genres
        let currentGenreArr = []
        for (let i = 0; i < genreID.length; i++) {
            currentGenreArr.push(genreID[i].name)
        }
        let currentGenre = currentGenreArr.join(', ')
        $('.genreInfo').html(`<b>Genre:</b> ${currentGenre}`)
    })

    //Блок поиска
    $('.d-flex').submit(function (e) {
        e.preventDefault()
        let input = $('.form-control').val()
        input = input.replace(/ +/g, ' ').trim().toLowerCase().replace(/ /g, '+')
        location.href = `searchResult.html?query=${input}`
    })
}
