module.exports = {
    "list": {
        "method": "GET",
        "url": "http://localhost:3002/api/movies",
    },
    "register": {
        "method": "POST",
        "url": "http://localhost:3002/api/register",
        "body": {
            "email": "someone@gmail.com",
            "password": "miclave"
        }
    },
    "create": {
        "url": "http://localhost:3002/api/movies",
        "method": "POST",
        "body": {
            "title": "Pelicula de drama 5",
            "year": 2009,
            "genre": "Drama",
            "director": "Prueba",
            "rate": 1
        },
        "headers": {
            "authorization": null
        }
    },
    "change":{
        "url": null,
        "method": "PUT",
        "body": {
            "title": "Pelicula Modificada",
            "year": 2009,
            "genre": "Drama",
            "director": "Prueba",
            "rate": 1
        },
        "headers": {
            "authorization": null
        }
    },
    "movie_by_id":{
        "url": null,
        "method": "DELETE",
        "headers": {
            "authorization": null
        }
    }
}
