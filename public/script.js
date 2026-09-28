const cars = [
    {
        id: 1,
        name: "Hyundai Accent",
        type: "economy",
        typeName: "Эконом",
        price: 14000,
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 2,
        name: "Kia Rio",
        type: "economy",
        typeName: "Эконом",
        price: 15000,
        image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 3,
        name: "Chevrolet Cobalt",
        type: "economy",
        typeName: "Эконом",
        price: 18000,
        image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 4,
        name: "Hyundai Elantra",
        type: "comfort",
        typeName: "Комфорт",
        price: 20000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 5,
        name: "Toyota Corolla",
        type: "comfort",
        typeName: "Комфорт",
        price: 22000,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 6,
        name: "Kia K5",
        type: "comfort",
        typeName: "Комфорт",
        price: 25000,
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 7,
        name: "Toyota Camry 70",
        type: "business",
        typeName: "Бизнес",
        price: 28000,
        image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 8,
        name: "Chery Tiggo 4",
        type: "suv",
        typeName: "SUV",
        price: 32000,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 9,
        name: "Haval M6",
        type: "suv",
        typeName: "SUV",
        price: 35000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 10,
        name: "Toyota RAV4",
        type: "suv",
        typeName: "SUV",
        price: 38000,
        image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 11,
        name: "Toyota Land Cruiser Prado",
        type: "suv",
        typeName: "SUV",
        price: 42000,
        image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 12,
        name: "Hyundai Santa Fe",
        type: "suv",
        typeName: "SUV",
        price: 45000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 13,
        name: "BMW 5 Series",
        type: "business",
        typeName: "Бизнес",
        price: 55000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 14,
        name: "BMW X5",
        type: "business",
        typeName: "Бизнес SUV",
        price: 72000,
        image: "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=900&q=80"
    },
    {
        id: 15,
        name: "Mercedes-Benz S-Class",
        type: "business",
        typeName: "Premium",
        price: 100000,
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=900&q=80"
    }
];

let selectedCar = null;

function displayCars(list = cars) {
    const grid = document.getElementById("carsGrid");

    grid.innerHTML = "";

    list.forEach(car => {
        grid.innerHTML += `
            <div class="car-card">
                <img class="car-image" src="${car.image}" alt="${car.name}">

                <div class="car-info">

                    <h3>${car.name}</h3>

                    <p class="car-type">${car.typeName}</p>

                    <div class="car-bottom">

                        <div class="price">
                            ${car.price.toLocaleString("ru-RU")} ₸
                            <span>/ күн</span>
                        </div>

                        <button
                            class="rent-small"
                            onclick="openModal(${car.id})">
                            Аренда
                        </button>

                    </div>

                </div>
            </div>
        `;
    });
}

function filterCars(type, button) {

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    if (type === "all") {
        displayCars(cars);
    } else {
        const filtered = cars.filter(car => car.type === type);
        displayCars(filtered);
    }
}

function openModal(carId) {

    selectedCar = cars.find(car => car.id === carId);

    document.getElementById("selectedCar").innerHTML = `
        ${selectedCar.name} — 
        ${selectedCar.price.toLocaleString("ru-RU")} ₸ / күн
    `;

    document.getElementById("rentModal").classList.add("show");

    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    document.getElementById("totalPrice").textContent = "0 ₸";
}

function closeModal() {
    document.getElementById("rentModal").classList.remove("show");
}

function calculatePrice() {

    if (!selectedCar) return;

    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;

    if (!start || !end) {
        document.getElementById("totalPrice").textContent = "0 ₸";
        return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const difference = endDate - startDate;

    const days = Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
        document.getElementById("totalPrice").textContent = "Қате күн";
        return;
    }

    const total = days * selectedCar.price;

    document.getElementById("totalPrice").textContent =
        total.toLocaleString("ru-RU") + " ₸";
}

document.getElementById("startDate").addEventListener(
    "change",
    calculatePrice
);

document.getElementById("endDate").addEventListener(
    "change",
    calculatePrice
);

async function submitRent() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!name || !phone || !startDate || !endDate) {
        alert("Барлық мәліметті толтырыңыз!");
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const days = Math.ceil(
        (end - start) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
        alert("Аяқталу күні дұрыс емес!");
        return;
    }

    const total = days * selectedCar.price;

    try {

        const response = await fetch("/api/rent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                phone,
                car: selectedCar.name,
                startDate,
                endDate,
                total
            })
        });

        const result = await response.json();

        if (result.success) {

            alert(
                "Тапсырысыңыз қабылданды!\n\n" +
                "Көлік: " + selectedCar.name + "\n" +
                "Жалпы баға: " +
                total.toLocaleString("ru-RU") +
                " ₸"
            );

            closeModal();

            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
        }

    } catch (error) {

        alert("Сервермен байланыс жоқ!");

    }
}

function scrollToCars() {
    document.getElementById("cars").scrollIntoView({
        behavior: "smooth"
    });
}

window.onclick = function(event) {

    const modal = document.getElementById("rentModal");

    if (event.target === modal) {
        closeModal();
    }

};

displayCars();