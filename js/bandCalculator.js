// Band Cost Calculator
document.getElementById("bandForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const pricePerPerson = parseFloat(
    document.getElementById("pricePerPerson").value
  );
  const numPeople = parseInt(document.getElementById("numPeople").value);
  const sound = parseFloat(document.getElementById("soundCost").value) || 0;
  const dubaRental =
    parseFloat(document.getElementById("dubaRental").value) || 0;
  const dubaTransport =
    parseFloat(document.getElementById("dubaTransport").value) || 0;
  const valiTransport =
    parseFloat(document.getElementById("valiTransport").value) || 0;
  const cantatBiserica =
    parseFloat(document.getElementById("cantatBiserica").value) || 0;
  const needHotel = document.getElementById("needHotel").checked;
  const resultEl = document.getElementById("bandResult");

  if (isNaN(pricePerPerson) || isNaN(numPeople)) {
    resultEl.textContent = "⚠️ Please enter the required fields.";
    resultEl.style.color = "#D32F2F";
    return;
  }

  const bandTotal = pricePerPerson * numPeople;
  const extras =
    sound + dubaRental + dubaTransport + valiTransport + cantatBiserica;
  const total = bandTotal + extras;

  const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const day = String(expirationDate.getDate()).padStart(2, "0");
  const month = String(expirationDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = expirationDate.getFullYear();
  const offerExpiration = `${day}-${month}-${year}`;

  // Prepare the biserica line if applicable
  let bisericaLine = "";
  if (cantatBiserica > 0) {
    bisericaLine = `<li>+cantat la ceremonia religioasa pian si voce 2-4 piese</li>`;
  }

  // Prepare hotel line if needed
  let hotelLine = "";
  if (needHotel) {
    hotelLine = `<li>⁠⁠1 noapte de cazare din <em><b>XX->XX MONTH</b></em> pentru 5 sau 6 persoane in functie de pachetul ales</li>`;
  }

  resultEl.innerHTML = `
    <div style="font-size: 1rem; color: #555;">🎵 Band: €${bandTotal.toFixed(
      2
    )}</div>
    <div style="font-size: 1rem; color: #777;">➕ Extras: €${extras.toFixed(
      2
    )}</div>
    <div style="font-size: 1.8rem; font-weight: bold; color: #2e7d32; margin-top: 10px;">
        🧾 TOTAL PRICE: €${total}
    </div>

    <div style="margin-top: 30px; text-align: left; color: #333; line-height: 1.6;">
        <p>==================================</p>
        <p>Salut CLIENT,</p>
        <p>Am revenit cu oferta pentru <strong>DATE</strong>, <strong>LOCATION</strong></p>

        <h3>Ce oferim la eveniment:</h3>
        <ul>
            <li>✅ Garanta ca vom oferi momente de neuitat care vor dainui o viata intreaga pentru voi cat si pentru invitatii vostri</li>
            <li>✅ Momente speciale:
                <ul>
                    <li>⁠ ⁠Intrare miri cu muzică live</li>
                    <li>⁠ ⁠3-4-5 sesiuni live (30-40 min) in functie de felurile de mancare servite</li>
                    <li>⁠ ⁠Concert interactiv cu invitații (in functie de dorinta voastra si vibe)</li>
                    <li>⁠ ⁠Moment muzical la intrarea tortului</li>
                    <li>⁠ ⁠Anunturi</li>
                </ul>
            </li>
            <li>✅ Repertoriu variat: Jazz, lounge, pop, piese creștine</li>
            <li>✅ Flexibilitate: Adaptăm volumul și dinamica muzicii în funcție de atmosferă</li>
            <li>✅ Sunet: Asiguram sunetul pe durata evenimentului la masa</li>
        </ul>

        <h3>Pachete disponibile:</h3>
        <p>🎵<b>Full Band</b> – €${total}
        <ul>
            <li>Pian, voce, tobe, bass, chitara electrica, saxofon, sunet</li>
            ${bisericaLine}
        </ul>
        </p>


        <p>🎵<b>Small Band</b> – €${total - pricePerPerson}
        <ul>
            <li>Pian, voce, tobe, bass, sunet, chitara electrica, <b>SAU</b> saxofon</li>
            ${bisericaLine}
        </ul>
        </p>


        <h3>🚩Costuri adiționale:</h3>
        <ul>
            <li>⁠ ⁠Avans: €350 pentru rezervarea datei (restul la finalul nunții, în valută)</li>
                ${hotelLine}
            <li>⁠ ⁠In onorariul mentionat mai sus este <strong>inclus</strong> si transportul</li>
        </ul>

        <h3>🚩Opțiuni suplimentare:</h3>
        <ul>
            <li>⁠ ⁠Momente personalizate pe parcursul evenimentului</li>
        </ul>

        <p>
            🔷 Oferta valabila pana la data de <strong>${offerExpiration}</strong><br/>
            🔷 Pentru orice fel de intrebari va stam la dispozitie pentru a le discuta si a va ajuta cu raspuns si gidare.<br/>
            🔷 Dacă oferta este pe placul vostru, blocăm data prin achitarea avansului.
        </p>
        <p>=================================</p>
    </div>`;

  // show church singing line if applicable
  const cantatBisericaLine =
    cantatBiserica > 0
      ? `- ⛪ Church singing: €${cantatBiserica.toFixed(2)}\n`
      : "";

  const hotel =
    needHotel === true
      ? "- 🏨 1 noapte de cazare din XX->XX MONTH pentru 5 sau 6 persoane"
      : "";

  const summaryLines = [
    `- 💶 Band price per person: €${pricePerPerson.toFixed(2)}`,
    `- 👥 Number of people: ${numPeople}`,
    `- 🔊 Sound cost: €${sound.toFixed(2)}`,
    `- 🚐 Van rental: €${dubaRental.toFixed(2)}`,
    `- ⛽ Van fuel cost: €${dubaTransport.toFixed(2)}`,
    `- ⛽ Vali fuel cost: €${valiTransport.toFixed(2)}`,
    cantatBisericaLine.trim(),
    hotel.trim(),
  ]
    .filter((line) => line)
    .join("\n");

  const summaryText = `
🧾 TOTAL PRICE: €${total.toFixed(2)}

${summaryLines}
`;

  const calendarBtn = document.getElementById("calendarBtn");
  calendarBtn.style.display = "block";
  calendarBtn.onclick = () => createICSFile(summaryText);
});
