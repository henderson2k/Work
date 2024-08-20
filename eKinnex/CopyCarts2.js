const urlToCheck = 'https://stylelink.ergotron.com/app/carts?org=354';

var currentUrl = window.location.href;

if (currentUrl === urlToCheck) {
    (function() {
        var matchesSet = new Set();
        var elements = document.querySelectorAll('body *');
        elements.forEach(function(element) {
            var text = element.innerText.trim();
            var regex = /[DM]\d{5}/g;
            var match;
            while ((match = regex.exec(text)) !== null) {
                matchesSet.add(match[0]);
            }
        });

        var allMatches = Array.from(matchesSet).join('\n');
        navigator.clipboard.writeText(allMatches).then(function() {
            console.log(allMatches);
            showDialog(allMatches);
        }).catch(function(error) {
            console.error('Error copying text: ', error);
            alert('Error copying text. See console for details.');
        });
    })();
} else {
    showDialog("Not on Carts Page");
}

function showDialog(messageText) {
    var d = document.createElement('dialog');
    d.id = 'dialogDefault';
    d.innerHTML = `
        <form method="dialog">
            <p>${messageText}</p>
            <button type="submit" value="ok">OK</button>
        </form>
    `;
    document.body.appendChild(d);
    d.showModal();

   

    // Automatically close dialog after 3 seconds
    setTimeout(function() {
        d.close('timeout');
    }, 2000);
}


