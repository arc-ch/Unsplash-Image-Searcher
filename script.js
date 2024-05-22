let searchVal = document.getElementById("search");
let searchBtn = document.getElementById("searchBtn");
let showData = document.querySelector(".showData");
let showMore = document.querySelector("#showMore");

let page = 1;

const Access_Key = "H3s0Ay26iI-x_wZp9C2ly-Y91pIs_pENS1eN1YbKN2g";

// Function to convert a string to sentence case
const toSentenceCase = (str) => {
    if (!str) return '';
    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const getData = async (searchValue, pageNo) => {
    let fetching = await fetch(`https://api.unsplash.com/search/photos?query=${searchValue}&per_page=28&page=${pageNo}&client_id=${Access_Key}`);
    let jsonData = await fetching.json();

    let results = jsonData.results;
    console.log(jsonData);
    console.log(pageNo);


    //Displaying Load more button only when number of pageNo is more than 1 
    if (pageNo === 1) {
        showData.innerHTML = "";
    }

    if (searchVal.value == "") {
        showData.innerHTML = `<h1>Please Search</h1>`;
        document.querySelector(".moreBtn").style.display = "none";


    } else {
        document.querySelector(".moreBtn").style.display = "block";
    }

    results.forEach(function (data) {
        let card = document.createElement("div");
        card.classList.add("card");
        showData.appendChild(card);
        let caption = data.alt_description ? toSentenceCase(data.alt_description) : "No description";
        card.innerHTML = `
            <img src=${data.urls.small} alt="">
            <a href=${data.links.html} target="_blank">${caption}</a>
        `;
    });
}

const search = () => {
    let searchValue = searchVal.value;
    getData(searchValue, 1);
}

searchBtn.addEventListener("click", search);

searchVal.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        search();
    }
});

showMore.addEventListener("click", function () {
    getData(searchVal.value, ++page);
});
