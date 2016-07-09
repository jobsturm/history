const api = {
    years: [],
    currentYear: 2014
};

api.formURL = (topic) => {
    return `https://en.wikipedia.org/w/api.php?action=query&titles=${topic}&prop=revisions&rvprop=content`;
}

api.init = () => {
    request({
        url: api.formURL(api.currentYear),
        succes: api.handleData
    });
}

api.handleData = (data) => {
    var dataMonthRaw,
        monthArray;
    
    Object.keys(data).forEach((key) => {
        data = data[key];
    });
    
    
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
            monthArray.push({
                news: txtwiki.parseWikitext(data).split("*"),
                month: dataMonthRaw[n - 1]
            });
        }
    });
    
    
    console.log(monthArray);
}

api.finish = () => {
    
}