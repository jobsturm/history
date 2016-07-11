const app = {}
app.version = 1.0;
app.settings = {};

app.settings.yearBegin = 1990; // year the experience starts
app.settings.yearEnd = 2015; // year the experience ends
app.settings.startYear = 2000; // year the user gets dropped into.
app.settings.stepSize = 10; // the amount of years the script calls at the same time.

document.onreadystatechange = () => {
    switch (document.readyState) {
        case "loading":
            // The document is still loading.
            console.log("LOADING");
            break;
        case "complete":
            // The page is fully loaded.
            watch.init();
            routing.init();

            // fire the bomb
            if (crossroads._prevMatchedRequest && crossroads._prevMatchedRequest.length > 0) {
                app.currentYear = crossroads._prevMatchedRequest;
            } else {
                app.currentYear = app.settings.startYear;
            }
            
            // requests the first year
            api.init();
    }
}
