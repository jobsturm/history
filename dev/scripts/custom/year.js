const year = {};

year.changeVar = () => {
    // this is callled after the year variable changes.
    hasher.setHash(api.currentYear +"/"+ api.currentMonth +"/"+ api.currentDay);
}

year.change = () => {
    // this is called after the URL changes.
    if (app.currentYear !== crossroads._prevMatchedRequest) {
        var hash = hasher.getHash();
        app.currentYear = hash.split("/")[0];
        api.currentYear = hash.split("/")[0];
        api.currentMonth = hash.split("/")[1];
        api.currentDay = hash.split("/")[2];
        
        app.setDate(api.currentYear, api.currentMonth, api.currentDay);
        console.log(`We are now on the date: ${api.currentYear, api.currentMonth, api.currentDay}`);
    }
}