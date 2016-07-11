const app = {}
app.version = 1.0;
app.settings = {};

app.settings.yearBegin = 0; // year the experience starts
app.settings.yearEnd = 2015; // year the experience ends
app.settings.startYear = 2000; // year the user gets dropped into.
app.settings.stepSize = 10; // the amount of years the script calls at the same time.

document.onreadystatechange = () => {
    switch (document.readyState) {
        case "loading":
            // The document is still loading.
            break;
        case "complete":
            // The page is fully loaded.
            api.init();
            routing.init();
            watch.init();
            
            // fire the bomb
            console.log(hasher.getHash());
            if (hasher.getHash() != null) {
                app.currentYear = hasher.getHash();
            } else {
                app.currentYear = app.settings.startYear;
            }
    }
}
