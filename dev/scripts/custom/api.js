const api = {
    currentYear: app.settings.startYear
};

api.formURL = (topic) => {
    return `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(topic)}&prop=revisions&rvprop=content`;
}

api.request = (topic) => {
    request({
        url: api.formURL(topic),
        succes: api.handleData
    });
}

api.getCurrentYear = (topic) => {
    api.request(api.currentYear);
}

api.handleData = (data) => {
    var dataMonthRaw,
        months,
        dataRaw = data,
        title;

    Object.keys(data).forEach((key) => {
        data = data[key];
    });

    title = data.title;

    data = data.revisions[0]["*"];

    // get everything after EVENTS and before BIRTHS
    if (data && data.indexOf("==Events==") > -1) data = data.split("==Events==")[1];
    if (data && data.indexOf("==Births==") > -1) data = data.split("==Births==")[0];
    if (data && data.indexOf("==Nobel prizes==") > -1) data = data.split("==Nobel prizes==")[0];

    // get all raw data for the months
    dataMonthRaw = data.split(/===(.*)===/g),
        months = {};

    // create ordered object array.
    var add = false;
    dataMonthRaw.forEach((data, n) => {
        add = !add;

        if (add === true) {
            var keywords;
            if (data && data.indexOf("[[")) {
                keywords = data.match(/[[](.*?)]]/g);
            }

            let days = txtwiki.parseWikitext(data).split("*");
            // remove empty results from array.
            days = days.filter(function (n) {
                return n != ""
            });

            let monthName = dataMonthRaw[n - 1];
            let monthNumber = date.getMonthFromString(monthName);

            if (monthName && monthName !== "Date unknown") {
                var monthNumber_Name = monthNumber_Name = monthNumber + "_" + monthName;
                if (monthName.indexOf(" ") > -1) {
                    monthNumber_Name = monthNumber + "_" + monthName.split(' ').join('');
                }
                months[monthNumber_Name] = {};

                days.forEach((dayInfo) => {
                    var dayNumber = dayInfo.split(monthName)[1];
                    if (dayNumber) {
                        if (dayNumber.indexOf(" – ") > -1) {
                            dayNumber = dayNumber.split(" – ")[0];
                            dayInfo = dayInfo.split(" – ")[1];
                        }
                        if (dayNumber.indexOf(" - ") > -1) {
                            dayNumber = dayNumber.split(" - ")[0];
                            dayInfo = dayInfo.split(" - ")[1];
                        }
                        if (dayNumber.indexOf(" &ndash; ") > -1) {
                            dayNumber = dayNumber.split(" &ndash; ")[0];
                            dayInfo = dayInfo.split(" &ndash; ")[1];
                        }

                        // get picture
                        var topic;
                        var instanceOfMatch = 0;
                        
                        keywords.forEach((word) => {
                            var searchWord = word.substring(word.lastIndexOf("[")+1,word.lastIndexOf("]]"));
                            if (dayInfo.indexOf(searchWord) > -1) {
                                instanceOfMatch += 1;
                                if (instanceOfMatch === 1) {
                                    topic = searchWord;
                                }
                            }
                        });

                        var image,
                            dayNumber = dayNumber.split(' ').join('');
                        // put everything together
                        
                        if (dayNumber !== "") {
                            months[monthNumber_Name][dayNumber] = new day(dayNumber, dayInfo, topic, api.formURL(topic), title.toString(), monthNumber.toString());
                            crossroads.addRoute(title.toString() + "/" + monthNumber.toString() + "/" + dayNumber.toString());
                        }
                    }
                });
            }
        }
    });

    delete months.undefined;
    delete months["NaN_Dateunknown"];
    app.years[title.toString()] = {
        months: months,
        year: title,
        raw: dataRaw
    };
    if (title == api.order[api.order.length - 1]) {
        api.done();
    }    
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

// done function
api.done = () => {
    app.setDate(api.currentYear, api.currentMonth, api.currentDay);
}
