var request = (info) => {
    $.getJSON(info.url + "&format=json&callback=?", function(data) {
        info.succes(data.query.pages);
    });    
};