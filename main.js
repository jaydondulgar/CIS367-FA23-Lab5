const API_URL = "https://fhu-faculty-api.netlify.app/fhu-faculty.json";
let liked = [];
let bookmarked = [];
const carousel = document.querySelector(".carousel");
const likeButton = document.getElementById("likeButton");
const bookmarkButton = document.getElementById("bookmarkButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
let activeIndex = Math.floor(59/2);
let data = [];

async function getData() {
    try{
        let response = await fetch(API_URL);
        let fetchedData = await response.json();
        return fetchedData;
    } 
    catch (error) {
        console.error("Error loading data:", error);
        return [];
    }
}


async function init() {
    data = await getData();

    console.log(data);
    renderCards(data);
    updateLikedAndBookmarkedIcons();
}


// function addCards() {
    
//     data.forEach( (item, index) => {
//         let div = document.createElement('div');
//         div.classList.add("box");    
//         div.innerHTML = `${index} ${item}`
    
//         carousel.appendChild(div);
//     });
// }

function renderCards(data) {
    const windowWidth = window.innerWidth;
    const cardWidth = 350;
    const length = data.length;

    carousel.innerHTML = "";

    for(let index = 0; index < length; index++) {
        let div = document.createElement('div');
        div.classList.add("box")

        if (index < activeIndex) {
            div.classList.add("left")
            const offset = windowWidth / 2 - cardWidth / 2 - index * 10;
            div.style.transform = `translateX(${offset}px)`;
        } 
        else if (index == activeIndex) {
            div.classList.add("active");
        } 
        else {
            div.classList.add("right");
            const offset = windowWidth / 2 - cardWidth / 2 - (length - index + 1) * 10;
            div.style.transform = `translateX(${offset}px)`;
            div.style.zIndex = length - index;
        }

        const person = data[index];
        div.innerHTML = `
        <div class="flexbox max-w-md mx-auto border-8 border-yellow-400 bg-blue-400">
          <div class="flex max-w-md mx-auto justify-between">
              <div>Basic</div>
              <div class="text-2xl mt-2">"${person.NickName}" ${person.FirstName} ${person.LastName}</div>
              <div class="mt-3">HP ${person.HitPoints}</div>
              <div class="m-2">
                  <div class="bg-yellow-500 p-2 rounded-full">
                      <div>
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                          </svg>
                      </div>
                  </div>
              </div>
          </div>
      
          <div class="flex max-w-md my-2 justify-center">
              <img src="https://fhu-faculty-api.netlify.app/images/headshots/${person.Image}" alt="">
          </div>
      
          <div class="flex max-w-md mx-8 justify-center border-2 border-slate-500 bg-slate-200">
              <div>No.${person.id} ${person.Type} HT. ${person.Height}" S:${person.Stamina} Gender:${person.Gender} </div>
          </div>

          <div class="flex max-w-md px-4 justify-between mt-4">
              <div class="bg-yellow-500 p-2 rounded-full">
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                      </svg>
                  </div>
              </div>
              <div class="text-lg">${person.Attack1}</div>
              <div>${person.Attack1Damage}</div>
          </div>
          <div class="flex max-w-md mx-4 justify-center mb-4">
              <div>Stun the opponent in disbelief. Decrease opponents attacks by 62 and stun them for a turn.</div>
          </div>

          <div class="flex max-w-md px-4 justify-between">
              <div class="bg-yellow-500 p-2 rounded-full">
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                      </svg>
                  </div>
              </div>
              <div class="text-lg">${person.Attack2}</div>
              <div>${person.Attack2Damage}</div>
          </div>
          <div class="flex max-w-md mx-4 justify-center mb-4">
              <div>Stun the opponent in disbelief. Decrease opponents attacks by 62 and stun them for a turn.</div>
          </div>

          <div class="flex max-w-md justify-center">
              <div class="text-xl">Character Attributes</div>
          </div>

          <div class="flex max-w-md mx-4 flex-wrap justify-between mb-8">
              <div>${person.Rank}</div>
              <div>${person.EducationLevel}</div>
              <div>${person.Tenure}</div>
              <div>${person.Department}</div>
          </div>

          <div class="flex max-w-md mx-auto border-4 border-slate-500 bg-slate-100">
              <div>Weaknesses: ${person.Weaknesses}</div>
              <div>Resistance: ${person.Resistances}</div>
              <div>${person.HashTag}</div>
          </div>
        </div>`

        carousel.appendChild(div);
    }

    updateLikedAndBookmarkedIcons();
}


function toggleLike() {
    if (liked.includes(activeIndex)) {
        liked = liked.filter(index => index !== activeIndex);
    } 
    else {
        liked.push(activeIndex);
    }
    updateLikedAndBookmarkedIcons();
}

function toggleBookmark() {
    if (bookmarked.includes(activeIndex)) {
        bookmarked = bookmarked.filter(index => index !== activeIndex);
    } 
    else {
        bookmarked.push(activeIndex);
    }
    updateLikedAndBookmarkedIcons();
}

function updateLikedAndBookmarkedIcons() {
    const isLiked = liked.includes(activeIndex);
    const isBookmarked = bookmarked.includes(activeIndex);

    likeButton.classList.toggle("liked", isLiked);
    bookmarkButton.classList.toggle("bookmarked", isBookmarked);
}

init();

window.addEventListener("resize", () => renderCards(data));

prevButton.addEventListener("click", () => {
    if (activeIndex > 0) {
        activeIndex--;
        renderCards(data);
    }
});

nextButton.addEventListener("click", () => {
    if (activeIndex < data.length - 1) {
        activeIndex++;
        renderCards(data);
    }
});

likeButton.addEventListener("click", () => {
    toggleLike();
});

bookmarkButton.addEventListener("click", () => {
    toggleBookmark();
});