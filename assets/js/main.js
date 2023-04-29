
const createCard = (input, index) => {
   
    let innerHTML = '';

    innerHTML += '<div class="portfolio__content" data-portfolio-card index="' + index + '"><div class="portfolio__img"><a><img src="';
    innerHTML += input.imgSrc;
    innerHTML += '" alt="' + input.longDesc + '"></a></div>\n';
    innerHTML += '<div class="portfolio__data"><span class="portfolio_subtitle">';

    for (let i = 0; i < input.filters.length - 1; i++) {
        innerHTML += input.filters[i].charAt(0).toUpperCase() + input.filters[i].slice(1) + ", ";
    }
    innerHTML += input.filters[input.filters.length - 1].charAt(0).toUpperCase() + input.filters[input.filters.length - 1].slice(1);

    innerHTML += '</span><a >\n';
    innerHTML += '      <h2 class="portfolio__title">' + input.name + '</h2>\n';
    innerHTML += '</a><a  class="button button-link">Show More</a></div>\n</div>';

    return {
        filters: input.filters,
        longDesc: input.longDesc,
        imgSrc : input.imgSrc,
        name: input.name,
        html: innerHTML,
    }

}

const allCards = [
    createCard({filters: ["lead"], longDesc: "“Successful Life of Three” (March 2020). Written by Maria Irene Fornes. Directed by Claire Edmonds. Gil Weissman as “He”. Presented by UCLA school of theater, film, and television.", imgSrc: "assets/img/portfolio/successfullo3.png", name: "Successful Life of Three"}, 0),
    createCard({filters: ["lead"], longDesc: "“Quad I & II” (Jan. 2020). Written by Samuel Beckett, directed by Michael Hackett. Featured in the LA Opera Eurydice festival.", imgSrc: "assets/img/portfolio/quad.jpg", name: "Quad I & II"}, 1),
    createCard({filters: ["directed"], longDesc: "“Pragma: The Beach Ball” Play (Oct. 2022). Written and directed by Gil Weissman, featured in the UCLA school of Theater, Film and Television's Bruin Fringe Festival.", imgSrc: "assets/img/pragma.jpg", name: "Pragma"}, 2),
    createCard({filters: ["lead"], longDesc: "“King Lear” (May 2022). Directed by Graham King. Gil Weissman as King Lear. Presented by Shakespeare Co. at UCLA.", imgSrc: "assets/img/portfolio/kinglear.png", name: "King Lear"}, 3),
    createCard({filters: ["directed"], longDesc: "Gil Weissman (Bass, backing vocals) performing with his band, Lot 3 at The Troubadour (Feb. 2023)", imgSrc: "assets/img/portfolio/lot3.jpg", name: "Lot3"}, 4),
    createCard({filters: ["directed"], longDesc: "“You Are Here (and Here, and Here)” July 2020. Multi-platform online live production, Directed by Devon Baur at Stanford SHTEM. Assistant Directed by Gil Weissman.", imgSrc: "assets/img/portfolio/youarehere.png", name: "You Are Here (and Here, and Here)"}, 5)
]

var activeNavFilters = ["lead", "film", "directed", "support"];
const navFilterButtons = Array.from(document.getElementsByClassName("portfolio__item"));

function applyPortfolioFilter(){

}

function renderActive(){

    if (activeNavFilters == activeNavFilters == ["lead", "film", "directed", "support"]) {
        navFilterButtons.forEach(item => {
            item.classList.remove("active");
        })
        navFilterButtons[0].classList.add("active");
        return;
    }

    navFilterButtons[0].classList.remove("active");
    navFilterButtons.forEach(item => {
        let innerText = item.textContent;
        
        if (innerText == "Leads") {
            if (activeNavFilters.includes("lead")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        } else if (innerText == "Films") {
            if (activeNavFilters.includes("film")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        } else if (innerText == "Directed") {
            if (activeNavFilters.includes("directed")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        } else if (innerText == "Supports") {
            if (activeNavFilters.includes("support")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        } 
    });

    let newCardsInnerHtml = '';
    allCards.forEach((card, index) => {
        let shouldBeActive = false;
        card.filters.forEach(filter => {
            if (activeNavFilters.indexOf(filter) !== -1) {
                shouldBeActive = true;
            }
        });

        if (shouldBeActive) {
            newCardsInnerHtml += card.html;
        }
    });

    if (newCardsInnerHtml === '') {
        newCardsInnerHtml === 'Sorry, no cards match your filters'
    }

    document.getElementById("portfolio__container").innerHTML = newCardsInnerHtml;

}

navFilterButtons.forEach(item => item.addEventListener('click', function() {
    let innerText = this.textContent;

    if (innerText == "Leads") {
        activeNavFilters = ["lead"];
    } else if (innerText == "Films") {
        activeNavFilters = ["film"];
    } else if (innerText == "Directed") {
        activeNavFilters = ["directed"];
    } else if (innerText == "Supports") {
        activeNavFilters = ["support"];
    } else {
        activeNavFilters = ["lead", "film", "directed", "support"];
    }

    renderActive();
    openModalCards = document.querySelectorAll('[data-portfolio-card]');
    openModalCards.forEach(card => {
        card.addEventListener('click', () => {
            let index = card.getAttribute('index');
            openModalCard(index);
        })
    })

}));
renderActive();

// Logic for the modal
var openModalCards = document.querySelectorAll('[data-portfolio-card]');
var closeModalButtons = document.querySelectorAll('[data-close-modal-button]');
const overlay = document.getElementById('overlay');
const modal = Array.from(document.getElementsByClassName('modal'))[0];

openModalCards.forEach(card => {
    card.addEventListener('click', () => {
        let index = card.getAttribute('index');
        openModalCard(index);
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        closeModal();
    })
})

function openModalCard(index) {
    setModalInnerHTML(allCards[index]);
    modal.classList.add('active');
    overlay.classList.add('active');
    closeModalButtons = document.querySelectorAll('[data-close-modal-button]');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeModal();
        })
    })
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function setModalInnerHTML(card) {
    let retval = "<div class='modal-header'>\n";
    retval += "<h2 class=section-title-modal' data-modal-title>" + card.name + "</h2>\n";
    retval += "<button class='button modal-button' data-close-modal-button>&times;</button></div><div class='modal-body bd-grid'><div class='modal-img'>\n";
    retval += '<img src="' + card.imgSrc + '" class="about__img"></div><div class="modal-text">\n';
    retval += card.longDesc;
    retval += '</div></div></div>';

    modal.innerHTML = retval;
}

overlay.addEventListener('click', () => {
    closeModal();
})

// Carousel functionallity

const carouselButtons = document.querySelectorAll("[data-carousel-button]");
console.log(carouselButtons);

let cardIndex = 0;
let photoCards = [
    {
        imgSrc: "assets/img/pragma.jpg",
        description: "\"Pragma: The Beach Ball Play\" (Oct. 2022). Written and directed by Gil Weissman, featured in the UCLA school of Theater, Film and Television's Bruin Fringe Festival."
    }
];

setAcviteCard = (offset) => {
    cardIndex = (cardIndex + offset) % photoCards.length;
    document.getElementById("active-photo-img").src = photoCards[cardIndex].imgSrc;
    document.getElementById("active-photo-txt").innerText = photoCards[cardIndex].description;
}

carouselButtons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1;
        const carousel = button.closest("[data-carousel]");
        carousel.dataset.hide = true;
        console.log(offset);

        setTimeout(() => {
            setAcviteCard(offset);
            delete carousel.dataset.hide;
        }, 200);
    })
});