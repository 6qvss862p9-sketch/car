const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/rent", (req, res) => {
    const { name, phone, car, startDate, endDate, total } = req.body;

    console.log("Жаңа тапсырыс:");
    console.log({
        name,
        phone,
        car,
        startDate,
        endDate,
        total
    });

    res.json({
        success: true,
        message: "Арендаға тапсырыс қабылданды!"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Сайт іске қосылды: ${PORT}`);
});