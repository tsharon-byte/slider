const dots = document.querySelector('.dots');
let current = document.querySelector(' #dot-1');
const left = document.querySelector(' #left');
const right = document.querySelector(' #right');
const reviews = [{
    id: 1,
    URL: 'https://images.unsplash.com/photo-1432457990754-c8b5f21448de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}, {
    id: 2,
    URL: 'https://images.unsplash.com/photo-1609639643505-3c158a56de42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=812&q=80'
}, {
    id: 3,
    URL: 'https://images.unsplash.com/photo-1575574202425-ba42a224118b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
}, {
    id: 4,
    URL: 'https://images.unsplash.com/photo-1565799690086-be5ba70ea648?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80'
}];
const reviewObjects = Array.from(document.querySelectorAll('.review'));
for (let i = 0; i < reviews.length; i++) {
    reviewObjects[i].style.backgroundImage = `url(${reviews[i].URL})`;
    reviewObjects[i].style.left = `${i * 55 + 25}%`;
}

function update(newId, oldId) {
    reviewObjects.forEach(item => {
        const newLeft = +item.style.left.split('%')[0] + 55 * (oldId - newId);
        item.style.left = `${newLeft}%`;
    })
    reviewObjects[newId - 1].classList.toggle('review_type_inactive');
    reviewObjects[oldId - 1].classList.toggle('review_type_inactive');
}

dots.addEventListener('click', (event) => {
    if (event.target.classList.contains('dot')) {
        current.classList.toggle('dot_active');
        const newId = +event.target.id.split('-')[1];
        const oldId = +current.id.split('-')[1];
        update(newId, oldId);
        current = event.target;
        current.classList.toggle('dot_active');
        if (newId > 1) {
            left.removeAttribute('disabled');
        } else {
            left.setAttribute('disabled', 'disabled');
        }
        if (newId < 4) {
            right.removeAttribute('disabled');
        } else {
            right.setAttribute('disabled', 'disabled');
        }
    }
});
left.addEventListener('click', event => {
    let currentId = +current.id.split('-')[1];
    if (currentId > 1) {
        const oldId = currentId;
        currentId--;
        const newId = currentId;
        right.removeAttribute('disabled');
        current.classList.toggle('dot_active');
        current = document.getElementById(`dot-${currentId}`)
        current.classList.toggle('dot_active');
        update(newId, oldId);
        if (currentId === 1) {
            left.setAttribute('disabled', 'disabled');
        }
    }
})
right.addEventListener('click', event => {
    let currentId = +current.id.split('-')[1];
    if (currentId < 4) {
        const oldId = currentId;
        currentId++;
        const newId = currentId;
        left.removeAttribute('disabled');
        current.classList.toggle('dot_active');
        current = document.getElementById(`dot-${currentId}`)
        current.classList.toggle('dot_active');
        update(newId, oldId);
        if (currentId === 4) {
            right.setAttribute('disabled', 'disabled');
        }
    }
})
