const app = {}
app.version = 1.0;
app.settings = {};

// data
app.years = {};

app.settings.yearBegin = 1990; // year the experience starts
app.settings.yearEnd = 2015; // year the experience ends
app.settings.startYear = 2001; // year the user gets dropped into.
app.settings.startMonth = 9; // year the user gets dropped into.
app.settings.startDay = 11; // year the user gets dropped into.
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

            // fire the bomb
            
            if (document.URL.indexOf("#") > -1) {
                var hash = document.URL.split("#")[1];
                console.log(hash);
                api.currentMonth = hash.split("/")[2];
                api.currentDay = hash.split("/")[3];
                api.currentYear = hash.split("/")[1];
                app.currentYear = hash.split("/")[1];
            } else {
                api.currentMonth = app.settings.startMonth;
                api.currentDay = app.settings.startDay;                
                api.currentYear = app.settings.startYear;
                app.currentYear = app.settings.startYear;
            }
            
            routing.init();
            
            // requests the first year
            api.init();
            
            // get the elements the draw function is going to use
            app.getElements();
            initSlider();
    }
}

