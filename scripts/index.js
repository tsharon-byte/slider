//Get html elements
const dots = document.querySelector('.dots');
const dotTemplate = document.querySelector('#dotTemplate').content;
const dotElement = dotTemplate.querySelector('.dot');

const reviewRow = document.querySelector('.review-row');
const reviewTemplate = document.querySelector('#reviewTemplate').content;
const reviewElement = reviewTemplate.querySelector('.review');

const left = document.querySelector(' #left');
const right = document.querySelector(' #right');

//functions
function prepareDots(config) {
    config.forEach((item) => {
        const dot = dotElement.cloneNode(true);
        dot.id = `dot-${item.id}`;
        dots.appendChild(dot);
    })
}

function prepareReview(config) {
    config.forEach((item) => {
        const review = reviewElement.cloneNode(true);
        review.id = `review-${item.id}`;
        review.style.backgroundImage = `url(${item.URL})`;
        reviewRow.appendChild(review);
    });
}

function update(positionId, dotArray, reviewArray) {
    if (positionId > 0 && positionId <= config.length) {
        dotArray.forEach(item => {
            if (+item.id.split('-')[1] === positionId) {
                item.classList.add('dot_active');
            } else {
                item.classList.remove('dot_active');
            }
        });
        reviewArray.forEach(item => {
            if (+item.id.split('-')[1] === positionId) {
                item.classList.remove('review_type_inactive');
            } else {
                item.classList.add('review_type_inactive');
            }
        });
        if (sliderPosition === 4) {
            right.setAttribute('disabled', 'disabled');
            left.removeAttribute('disabled');
        } else if (sliderPosition === 1){
            left.setAttribute('disabled', 'disabled');
            right.removeAttribute('disabled');
        }else{
            left.removeAttribute('disabled');
            right.removeAttribute('disabled');
        }
        reviewRow.style.marginLeft = `${150 - 100 * (sliderPosition - 1)}%`;
    }
}

//initialSetup
prepareDots(config);
prepareReview(config);
let sliderPosition = config[0].id;
const dotArray = Array.from(dots.querySelectorAll('.dot'));
const reviewArray = Array.from(reviewRow.querySelectorAll('.review'));
update(sliderPosition, dotArray, reviewArray);
dots.addEventListener('click', event => {
    if (event.target.classList.contains('dot')) {
        sliderPosition = +event.target.id.split('-')[1];
        update(sliderPosition, dotArray, reviewArray);
    }
});
left.addEventListener('click', event => {
    sliderPosition--;
    update(sliderPosition, dotArray, reviewArray);
})
right.addEventListener('click', event => {
    sliderPosition++;
    update(sliderPosition, dotArray, reviewArray);
})