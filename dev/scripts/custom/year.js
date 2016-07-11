const year = {};

year.change = () => {
    console.log(app.currentYear , crossroads._prevMatchedRequest)
    if (crossroads._prevMatchedRequest != undefined && crossroads._prevMatchedRequest != null && app.currentYear != null && app.currentYear != crossroads._prevMatchedRequest) {
        app.currentYear = crossroads._prevMatchedRequest;
        crossroads.parse(app.currentYear); //match `route1`, triggering `routed` Signal
        api.currentYear = app.currentYear;
        api.init();
        console.log(`We are now in the year ${api.currentYear}`);
    } else {
        window.location = "#/" + crossroads._prevMatchedRequest;
    }
}