let APIkey = "api_key=11095978a44875933bd9fcf6ded862cb";

let BaseURL = "https://api.themoviedb.org/3";
const API_URL = BaseURL + "/discover/movie?sort_by=popularity.desc&" + APIkey;
const API_Final_url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=11095978a44875933bd9fcf6ded862cb";
console.log("API_URL:", API_URL);

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

//* Notes https://api.themoviedb.org/3/search/movie?api_key={api_key}&query=Jack+Reacher

const SEARCH_API = `https://api.themoviedb.org/3/search/movie?${APIkey}&query=`;

// Get initial moives

getMoive(API_Final_url);

async function getMoive(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log("data:", data.results);
    showMoives(data.results);
  } catch (error) {
    console.log("error:", error);
  }
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchMoive);
let search = document.getElementById('ipSarch');
function searchMoive(e) {
  e.preventDefault();
  let searchTerm = search.value;

  if (searchTerm && searchTerm !== "") {
    getMoive(SEARCH_API + searchTerm);

    search.value = "";
  } else {
    window.location.reload();
  }
}

let main = document.querySelector("#main");

function showMoives(moives) {
  main.innerHTML = null;

  moives.forEach(function (ele, index) {
    const { title, poster_path, vote_average, overview } = ele;

    let moiveEl = document.createElement("div");
    moiveEl.classList.add("movie");

    moiveEl.addEventListener("click", togleOVer);

    function togleOVer() {
      moiveEl.classList.toggle("active");
    }
    moiveEl.innerHTML = `
    
    <img src="${poster_path ? IMG_PATH + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${"title"}">
    <div class="movie-info">
        <h3>"${title}"</h3>
        <span class="${getClasdbyRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>overview</h3>
       ${overview};
    </div>`;
    main.append(moiveEl);
  });
}

function getClasdbyRate(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

// todo--> Adding functionalaites for genres

const genres = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

let tagContainer = document.getElementById("tags");

let selectGenre = [];

setGenre(genres);
function setGenre(array) {
  tagContainer.innerHTML = null;

  array.forEach((genre) => {
    let tagDiv = document.createElement("div");
    tagDiv.classList.add("tag");
    tagDiv.id = genre.id;
    tagDiv.innerText = genre.name;

    // Adding event lister for tags
    tagDiv.addEventListener("click", () => {
      if (selectGenre.length == 0) {
        selectGenre.push(genre.id);
      } else {
        if (selectGenre.includes(genre.id)) {
          // this will avoid dupicates
          selectGenre.forEach((id, index) => {
            if (id == genre.id) {
              selectGenre.splice(index, 1);
            }
          });
        } else {
          selectGenre.push(genre.id);
        }
      }
      console.log(selectGenre);
      getMoive(API_URL + "&with_genres=" + encodeURI(selectGenre.join(",")));

      // note This fun used to add class to the tag for adding higlit property

      highlightSelection();
    });

    tagContainer.append(tagDiv);
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll(".tag");
  tags.forEach((tag, i) => {
    tag.classList.remove("highlight");
  });

  if (selectGenre.length !== 0) {
    selectGenre.forEach((id, i) => {
      // note This adding class only the datas available in the selectGenre [] otherise this fun wnt add clss

      const highlightedTag = document.getElementById(id);
      highlightedTag.classList.add("highlight");
    });
  }
  clearBtn();
}

function clearBtn() {
  let clrBtn = document.getElementById("clear");
  if (!clrBtn) {
    let clear = document.createElement("div");
    clear.classList.add("tag", "highlight");
    clear.id = "clear";
    clear.innerText = "Clear X";
    clear.addEventListener("click", () => {
      selectGenre = [];
      setGenre(genres);
      getMoive(API_Final_url);
    });
    tagContainer.append(clear);
  } else {
    clear.classList.add("highlight");
  }
}
