const watch = {};

watch.init = () => {
    // Watchlist, CIA style!
    watch.theFollowing("api.currentYear", year.changeVar);
};

watch.theFollowing = (objectDotKey, exec) => {
    if (objectDotKey.indexOf(".")) {
        const objectDotKeySplitted = objectDotKey.split(".");
        const object = objectDotKeySplitted[0];
        const key = objectDotKeySplitted[1];
        window[object].watch(key, (id, oldval, newval) => {
            setTimeout(() => {
                exec();
            }, 1);
            return newval;
        });
    } else {
        console.warn(objectDotKey, " is not executing ", exec, " because there is no dot in the string you have tried to watch.")
    }
}