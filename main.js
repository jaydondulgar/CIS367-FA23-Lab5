
const data = ["zero","one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen"];

const carousel = document.getElementsByClassName("carousel")[0];
var activeIndex = Math.floor(data.length/2);


function addCards() {
    
    data.forEach( (item, index) => {
        let div = document.createElement('div');
        div.classList.add("box");
    
        // if( index < activeIndex){
        //     div.classList.add("left");
        //     const offset = windowWidth/2 - cardWidth/2 - index * 10;
        //     div.style.transform = `translateX(${-offset}px)`;
        //     div.zIndex = index
        //     //div.style.left = `${index*10}px`;
        //     //div.style.transform+=` scale(${ Math.pow(0.9, length-index+1)})`;
        // }
        // else if(index === activeIndex)
        // {
        //     div.classList.add("active");
        // }
        // else {
        //     div.classList.add("right");
        //     const offset = windowWidth/2 - cardWidth/2 - (length - index+1) * 10;
        //     console.log(offset)
        //     div.style.transform = `translateX(${offset}px)`;
        //     div.style.zIndex = (length - index);
        //     div.style.right  = `${offset}px`
        // }
    
        div.innerHTML = `${index} ${item}`
    
        carousel.appendChild(div);
    });
}

addCards();
updateCards();

function updateCards() {
    const length = data.length;

    const boxes = document.querySelectorAll(".carousel .box");
    
    boxes.forEach( (div, index) => {
        if( index < activeIndex){
            // left
            div.classList.remove("active");
            div.style.zIndex = index;
            const offset = 100+(length-index)*2;
            div.style.transform = `translateX(-${offset}%) scale(100%)`;
        }
        else if(index === activeIndex)
        {
            // middle
            div.classList.add("active");
            div.style.zIndex = 300;
            div.style.transform = `translateX(0) scale(120%)`;
        }
        else {
            //right 
            div.classList.remove("active");
            div.style.zIndex = (length - index);
            const offset = 100+(index)*2;
            div.style.transform = `translateX(${offset}%) scale(100%)`;
        }
    });
}

window.addEventListener("resize", updateCards);


document.getElementById("prevButton").addEventListener("click", ()=>{
    if( activeIndex >= 0)
    {
        activeIndex--;
        updateCards();
    }
    
});

document.getElementById("nextButton").addEventListener("click", ()=>{
    if( activeIndex < data.length)
    {
        activeIndex++;
        updateCards();
    }
    
});