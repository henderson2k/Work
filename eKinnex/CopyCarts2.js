(function() {
    const matchesSet = new Set();
    document.querySelectorAll('body *').forEach(element => {
        const text = element.innerText.trim();
        const regex = /[DM]\d{5}/g;
        let match;
        while ((match = regex.exec(text)) !== null) {
            matchesSet.add(match[0]);
        }
    });

    const allMatches = Array.from(matchesSet).join('\n');
    navigator.clipboard.writeText(allMatches)
        .then(() => {
            console.log(allMatches);
            showDialog(allMatches);
        })
})();

function showDialog(messageText) {
    const d = document.createElement('dialog');
    d.id = 'dialogDefault';
    d.innerHTML = `
        <form method="dialog">
            <p>${messageText}</p>
        </form>
    `;
    document.body.appendChild(d);
    d.showModal();

    // Automatically close dialog after 1 second
    setTimeout(() => d.close('timeout'), 1000);
}