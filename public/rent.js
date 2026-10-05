const params = new URLSearchParams(window.location.search);
const selectedCar = cars.find(car => car.id === Number(params.get("car")));

const DAY = 1000 * 60 * 60 * 24;
const fmt = n => n.toLocaleString("ru-RU") + " ₸";

function toggleMenu() {
    document.getElementById("mainNav").classList.toggle("open");
}

function getDays() {
    const start = document.getElementById("startDate").value;
    const end = document.getElementById("endDate").value;
    if (!start || !end) return null;
    return Math.ceil((new Date(end) - new Date(start)) / DAY);
}

function calculatePrice() {
    const box = document.getElementById("totalPrice");
    const days = getDays();

    if (days === null) {
        box.textContent = "0 ₸";
    } else if (days <= 0) {
        box.textContent = "Қате күн";
    } else {
        box.textContent = fmt(days * selectedCar.price);
    }
}

async function submitRent() {
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!name || !phone || !startDate || !endDate) {
        alert("Барлық мәліметті толтырыңыз!");
        return;
    }

    const days = getDays();
    if (days <= 0) {
        alert("Аяқталу күні дұрыс емес!");
        return;
    }

    const total = days * selectedCar.price;

    try {
        const response = await fetch("/api/rent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, phone, car: selectedCar.name, startDate, endDate, total })
        });

        const result = await response.json();

        if (result.success) {
            document.getElementById("rentLayout").hidden = true;

            const box = document.getElementById("rentSuccess");
            box.hidden = false;
            box.innerHTML = `
                <div class="success-mark">✓</div>
                <h2>Тапсырысыңыз қабылданды!</h2>
                <p>Біз сізбен жақын арада байланысамыз.</p>
                <div class="success-info">
                    <div><span>Көлік</span><strong>${selectedCar.name}</strong></div>
                    <div><span>Күндер</span><strong>${startDate} — ${endDate} (${days} күн)</strong></div>
                    <div><span>Жалпы баға</span><strong>${fmt(total)}</strong></div>
                </div>
                <a class="dark-button" href="index.html#cars">Автопаркке оралу →</a>
            `;
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    } catch (error) {
        alert("Сервермен байланыс жоқ!");
    }
}

if (!selectedCar) {
    document.getElementById("rentLayout").hidden = true;
    document.getElementById("rentError").hidden = false;
} else {
    document.title = `${selectedCar.name} — Аренда — DriveRent`;

    document.getElementById("rentCar").innerHTML = `
        <img src="${selectedCar.image}" alt="${selectedCar.name}">
        <div class="rent-car-info">
            <p class="car-type">${selectedCar.typeName}</p>
            <h1>${selectedCar.name}</h1>
            <div class="price">${selectedCar.price.toLocaleString("ru-RU")} ₸ <span>/ күн</span></div>
        </div>
    `;

    const today = new Date().toISOString().split("T")[0];
    const startInput = document.getElementById("startDate");
    const endInput = document.getElementById("endDate");
    startInput.min = today;
    endInput.min = today;

    startInput.addEventListener("change", () => {
        endInput.min = startInput.value || today;
        calculatePrice();
    });
    endInput.addEventListener("change", calculatePrice);
    document.getElementById("submitBtn").addEventListener("click", submitRent);
}
