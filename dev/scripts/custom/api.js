const api = {
    years: [],
    currentYear: app.settings.startYear
};

api.formURL = (topic) => {
    return `https://en.wikipedia.org/w/api.php?action=query&titles=${topic}&prop=revisions&rvprop=content`;
}

api.request = (topic) => {
    request({
        url: api.formURL(topic),
        succes: api.handleData
    });    
}

api.getCurrentYear= (topic) => {
    api.request(api.currentYear);
}

api.handleData = (data) => {
    var dataMonthRaw,
        monthArray,
        dataRaw = data,
        title;
    
    Object.keys(data).forEach((key) => {
        data = data[key];
    });
    
    title = data.title;
    
    data = data.revisions[0]["*"];
    
    // get everything after EVENTS and before BIRTHS
    data = data.split("==Events==")[1];
    data = data.split("==Births==")[0];
    
    // get all raw data for the months
    dataMonthRaw = data.split(/===(.*)===/g),
    monthArray = [];
    
    // create ordered object array.
    var add = false;
    dataMonthRaw.forEach((data, n) => {
        add = !add;
        
        if (add === true) {
            let news = txtwiki.parseWikitext(data).split("*");
            // remove empty results from array.
            news = news.filter(function(n){ return n != "" }); 
            monthArray.push({
                news: news,
                month: dataMonthRaw[n - 1]
            });            
        }
    });
    // remove first empty month
    monthArray.shift();
    
    api.years[title.toString()] = {
        months: monthArray,
        year: title
    };
}

api.smartOrder = () => {
    // this creates the order the wiki articles should be loaded in.
    api.order = [];
    
    const begin = app.settings.yearBegin;
    const end = app.settings.yearEnd;
    const current = parseInt(app.currentYear);
    var int = begin,
        intPlus = 0,
        intMin = 1;
    var plus = true;
    var plusSwitch = 0;
    var maxPlusReached = false
    var maxMinReached = false
    
    for (int = begin; int < end; int++) {
        if (current + intPlus > end) maxPlusReached = true;
        if (current - intMin < begin) maxMinReached = true;
        if (maxPlusReached === true) plus = false; 
        if (maxMinReached === true) plus = true;
        
        if (plus === true) {
            api.order.push(current + intPlus);
            intPlus += 1;
        }
        if (plus === false) {
            api.order.push(current - intMin);
            intMin += 1;
        }
        
        plusSwitch += 1;
        if (plusSwitch >= app.settings.stepSize) {
            plusSwitch = 0;
            plus = !plus;
        }
    }

}

api.steam = () => {
    // this will make sure the Wikipedia articles get loaded in a streaming fashion.
    api.order.forEach((year) => {
        api.request(year.toString());        
    });
}

// init function
api.init = () => {
    api.years = {};
    api.smartOrder();
    api.steam();
}