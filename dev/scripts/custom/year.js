const year = {};

year.changeVar = () => {
    // this is callled after the year variable changes.
    hasher.setHash(app.currentYear);
}

year.change = () => {
    console.log(app.currentYear, crossroads._prevMatched)
    // this is called after the URL changes.
    if (app.currentYear !== crossroads._prevMatchedRequest) {
        app.currentYear = crossroads._prevMatchedRequest;
        api.currentYear = app.currentYear;
        api.getCurrentYear();
        console.log(`We are now in the year ${api.currentYear}`);
    }
}