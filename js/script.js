function searchMovie() {
    // saat klik search, kosongkan dulu html, lalu tampilkan data ajax [looping]
    $('#movie-list').html('');

    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'GET',
        datatype: 'JSON',
        data: {
            'apikey': 'af90fe08',
            's': $('#search-input').val()
        },
    
        success: function (result) {
            if(result.Response == "True") {
            let movies = result.Search;

            $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-3">
                            <div class="card mb-4">
                                <img src="`+ data.Poster +`" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h3 class="card-title">`+ data.Title +`</h3>
                                    <h6 class="card-year mb-2 text-muted">`+ data.Year +`</h6>
                                    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID +`">
                                        See Detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    `);
                });

            $('#search-input').val('');

            } else{
                $('#movie-list').html(`
                <div class=col>
                    <h1 class="result-error text-center">`+ result.Error +`</h1>
                </div>
                `)
            }
        // console.log(result);
        }
    });
    
}

// agar button search setelah diklik dapat menampilkan data
$('#search-button').on('click', function () {
    searchMovie();
});

// agar tombol enter berfungsi sesudah menulis title
$('#search-input').on('keyup', function (event) {
    if(event.keyCode === 13) {
        searchMovie();
    }
});

// pemanggilan ajax pada tombol see detail
$('#movie-list').on('click', '.see-detail', function() {
    $.ajax({
        url: 'https://www.omdbapi.com/',
        type: 'GET',
        datatype: 'JSON',
        data: {
            'apikey': 'af90fe08',
            'i': $(this).data('id')
        },
        
        success: function (movie) {
            if(movie.Response == "True") {
                $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="`+ movie.Poster +`" class="img-fluid">
                            </div>
                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3 class="font-weight-bold">`+ movie.Title +`</h3></li>
                                    <li class="list-group-item">Language: `+ movie.Language +`</li>
                                    <li class="list-group-item">Genre: `+ movie.Genre +`</li>
                                    <li class="list-group-item">Plot: `+ movie.Plot +`</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    });
});