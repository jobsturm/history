const routing = {};

routing.init = () => {
    //setup crossroads
    routing.eventListeners();

    //setup hasher
    const parseHash = (newHash, oldHash) => {
      crossroads.parse(newHash);
    }
    
    hasher.initialized.add(parseHash); //parse initial hash
    hasher.changed.add(parseHash); //parse hash changes
    hasher.init(); //start listening for history change

    //update URL fragment generating new history record
    hasher.setHash(api.currentYear +"/"+ api.currentMonth +"/"+ api.currentDay);
}

routing.eventListeners = () => {
    crossroads.routed.add(year.change); //log all routes
}