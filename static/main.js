let paginaActual = 1
const btnAnterior = document.getElementById("btnAnterior")
const btnSiguiente = document.getElementById("btnSiguiente")

pintarPelis()
btnSiguiente.addEventListener("click", () => {
    if (paginaActual < 1000) {
        paginaActual++
        pintarPelis()
    }
})
btnAnterior.addEventListener("click", () => {
    if (paginaActual > 1) {
        paginaActual--
        pintarPelis()
    }
})


async function cargarPelis() {
    try {
        const options = {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MzRiZjU3YWVkOTZiMDA2MTlhNDAxZWQ4ZmM2YTg1NSIsInN1YiI6IjY1MDEwZTBmZGI0ZWQ2MTAzM2EyNWEwMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kEkbGIeTIyKhz9znMlHH_LFOpFFyNx7K9HVwbSUWk3U'
            }
        }

        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${paginaActual || 1}&sort_by=popularity.desc`, options)

        if (response.status == 200) {
            const data = await response.json()
            return data.results
        } else { console.log("error " + response.status); }

    } catch (error) {
        console.log(error);
    }
}
async function pintarPelis() {
    const results = await cargarPelis()
    console.log(results);
    let peliculasHTML = ""
    results.forEach(pelicula => {
        peliculasHTML += `
        <div class="pelicula">
            <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
            <h3 class="titulo">${pelicula.title}</h3>
        </div>
        `
    })
    document.getElementById("contenedor").innerHTML = peliculasHTML
}





