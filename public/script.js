let currentFilter = "all";

function displayCars(list = cars) {
    const grid = document.getElementById("carsGrid");
    grid.innerHTML = "";

    list.forEach(car => {
        grid.innerHTML += `
            <article class="car-card">
                <img class="car-image" src="${car.image}" alt="${car.name}" loading="lazy">
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p class="car-type">${car.typeName}</p>
                    <div class="car-bottom">
                        <div class="price">
                            ${car.price.toLocaleString("ru-RU")} ₸
                            <span>/ күн</span>
                        </div>
                        <a class="rent-small" href="rent.html?car=${car.id}">
                            Аренда →
                        </a>
                    </div>
                </div>
            </article>
        `;
    });
}

function filterCars(type, button) {
    document.querySelectorAll(".filter").forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    if (type === "all") {
        displayCars(cars);
    } else {
        displayCars(cars.filter(car => car.type === type));
    }
}

function scrollToCars() {
    document.getElementById("cars").scrollIntoView({
        behavior: "smooth"
    });

    const nav = document.getElementById("mainNav");
    if (nav) nav.classList.remove("open");
}

function toggleMenu() {
    document.getElementById("mainNav").classList.toggle("open");
}

document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("mainNav").classList.remove("open");
    });
});

displayCars();
