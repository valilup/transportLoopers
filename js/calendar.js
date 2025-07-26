function createICSFile(summaryText, eventDate, location) {
    const eventStart = eventDate
        ? new Date(eventDate)
        : new Date();

    const startDate = eventStart.toISOString().split("T")[0].replace(/-/g, "");
    const endDate = new Date(eventStart.getTime() + 86400000).toISOString().split("T")[0].replace(/-/g, "");

    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourApp//BandEvent//EN
BEGIN:VEVENT
UID:${Date.now()}@bandevent.com
DTSTAMP:${startDate}T000000Z
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:🎸 Nunta Loopers - ${location}
DESCRIPTION:${summaryText.replace(/\n/g, "\\n")}
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], {type: "text/calendar;charset=utf-8"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Band_Event.ics";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}