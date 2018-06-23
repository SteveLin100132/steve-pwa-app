(function() {
    'use strict';

    if('serviceWorker' in navigator) {
        console.log('in');

        navigator.serviceWorker
            .register('./app-worker.js')
            .then(function(res) {
                console.log('App Worker Registered');
                console.log(res.scope);
            })
            .catch(function(err) {
                console.log(err);
            });
    } else {
        console.log('none');
    }
})();
