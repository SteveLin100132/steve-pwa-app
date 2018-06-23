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

    // TODO modify here to your own firebase
    var config = {
        apiKey: "",
        authDomain: "<Project ID>.firebaseapp.com",
        databaseURL: "https://<Project ID>.firebaseio.com/"
    };
    firebase.initializeApp(config);

    var firebaseDB = firebase.database();

    var userRef = firebase.database().ref('user');
    var USER;
    var PASSWORD;
    userRef.on('value', function(snapshot) {
        // console.log(snapshot.val());
        USER = snapshot.val().id;
        PASSWORD = snapshot.val().password;
    });

    var launchButton = document.querySelector('.launch-button');
    var firebaseTextfield = document.querySelector('.firebase-textfield');
    var passwordTextfield = document.querySelector('.password-textfield');

    launchButton.addEventListener('click', launchButtonClicked);

    function launchButtonClicked() {
        var firebaseUser = firebaseTextfield.value;
        var firebasePassword = passwordTextfield.value;

        if(firebaseUser === USER && firebasePassword === PASSWORD) {
            alert("Access Successed");
        } else {
            alert("Access Denied");
        }
    }
})();
