// Fuel Cost Calculator
document.getElementById("calcForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const km = parseFloat(document.getElementById('distance').value);
    const rawConsumption = parseFloat(document.getElementById('consumption').value);
    const resultEl = document.getElementById('result');

    if (isNaN(km) || isNaN(rawConsumption)) {
        resultEl.textContent = "⚠️ Please enter valid numbers.";
        resultEl.style.color = "#D32F2F";
        return;
    }

    const consumption = rawConsumption / 100;
    const result = ((km * consumption) * 8) / 5;

    resultEl.style.color = "#2e7d32";
    resultEl.innerHTML =
        `<div style="font-size: 1.8rem; font-weight: bold; color: #2e7d32; margin-top: 10px;">
            ⛽ FUEL COST: €${result.toFixed(2)}
        </div>`;
});