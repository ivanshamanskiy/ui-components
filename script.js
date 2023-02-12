/*
 * Creates star rating functionality
 * @param el DOM Element
 * @param count Number of stars
 * @param callback Returns selected star count to callback
 */

function Star(el, count, callback) {
    // write logic to create star rating utility.
    const element = document.querySelector(el);
    const btn = document.querySelector('.reset-btn')
    let id;
    
	for (let i = 1; i <= count; i++) {
	    element.innerHTML += `<i class="fa fa-star-o" id="${i}"></i>`
	}

    const starEl = document.querySelectorAll('i');
    element.addEventListener('mouseover', onHover);
    element.addEventListener('mouseout', onMouseOut);
    element.addEventListener('click', onClick);

    btn.addEventListener('click', resetRating);

    
    function onHover(e) {
        // исполняем только если у кликнутого элемента есть определенный класс.
        if (e.target.classList.contains('fa')) {
            id = e.target.id;

            const elementsBefore = findElementsBefore(id);

            elementsBefore.forEach(element => {
                element.classList.remove('fa-star-o')
                element.classList.add('fa-star')
            })
        }
    }

    function onMouseOut(e) {
        // исполняем только если у кликнутого элемента есть определенный класс.
        if (e.target.classList.contains('fa')) {
            
            const elementsBefore = findElementsBefore(id);
            
            elementsBefore.forEach(element => {
                element.classList.remove('fa-star')
                element.classList.add('fa-star-o')
            })

            document.getElementById("display-star").innerHTML = '';
        }
    }

    function findElementsBefore(currId) {
        const elements = [...document.querySelectorAll('.fa')];
        return elements.filter(element => element.id <= currId);
    }

    function onClick(e) {
        // исполняем только если у кликнутого элемента есть определенный класс.
        if (e.target.classList.contains('fa')) {
            callback(e.target.id)
            element.removeEventListener('mouseover', onHover);
            element.removeEventListener('mouseout', onMouseOut);
            element.removeEventListener('click', onClick);
            btn.disabled = false;
        }
    }

    function resetRating() {
        // возвращаем пустую заливку всем звездам
        starEl.forEach(star => {
            if (star.classList.contains('fa-star')) {
                star.classList.remove('fa-star');
                star.classList.add('fa-star-o');
            }
        })

        // снова навешиваем ивент листенеры
        element.addEventListener('mouseover', onHover);
        element.addEventListener('mouseout', onMouseOut);
        element.addEventListener('click', onClick);

        // контейнер с значением рейтинга делаем пустым
        document.getElementById("display-star").innerHTML = '';

        // кнопку отключаем
        btn.disabled = true;
    }
}

function getStar(value){
    document.getElementById("display-star").innerHTML = value;
}

new Star("#star", 5, getStar);