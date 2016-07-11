const routing = {};

routing.init = () => {
    //setup crossroads
    routing.createRoutes();
    routing.eventListeners();

    //setup hasher
    const parseHash = (newHash, oldHash) => {
      crossroads.parse(newHash);
    }
    
    hasher.initialized.add(parseHash); //parse initial hash
    hasher.changed.add(parseHash); //parse hash changes
    hasher.init(); //start listening for history change

    //update URL fragment generating new history record
    hasher.setHash(app.settings.start);
}

// create all routes from app.settings.yearBegin (i.e. 1930) to app.settings.yearEnd (i.e. 2016)
routing.createRoutes = () => {
    const begin = app.settings.yearBegin;
    const end = app.settings.yearEnd;
    var int = begin;
    
    for (int = begin; int < end; int++) {
        crossroads.addRoute(int.toString());
    }
}

routing.eventListeners = () => {
    crossroads.routed.add(year.change); //log all routes
}