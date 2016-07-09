document.onreadystatechange = () => {
    switch (document.readyState) {
        case "loading":
            // The document is still loading.
            break;
        case "complete":
            // The page is fully loaded.
            api.init();
    }
}