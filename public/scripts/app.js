/**
 * 專案名稱：Steve App居家物聯網
 * 子專案名稱：PWA手機端APP
 * 檔案名稱：app.js
 * 檔案說明：主頁基本設定
 * Create 2018/06/24
 * @copyright Steve Lin. All right reserved.
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 * ---------------------------------------------------------------------------------------------------------------------
 * 使用說明：
 */

(function() {
    'use strict';

    /**
     * [APP the main procedure]
     * @type   {Object}
     * @method [init]                  [Initialize APP]
     * @method [bindEvents]            [Binding DOM loaded event]
     * @method [contentLoaded]         [DOM loaded event]
     * @method [registerServiceWorker] [Register service worker for offline cache]
     * Create 2018/06/24
     * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
     */
    const APP = {
        /**
         * [Initialize APP]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        init: function() {
            this.bindEvents();
            this.registerServiceWorker();
        },
        /**
         * [Binding DOM loaded event]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        bindEvents: function() {
            document.addEventListener('DOMContentLoaded', this.contentLoaded);
        },
        /**
         * [DOM loaded event]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        contentLoaded: function() {
            // TODO Proccess behavior after content load.
        },
        /**
         * [Register service worker for offline cache]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        registerServiceWorker: function() {
            if('serviceWorker' in navigator) {
                console.log('[Service Worker] exist');

                navigator
                    .serviceWorker
                    .register('./app-worker.js')
                    .then(function(res) {
                        console.log('[app-worker.js] registered');
                        console.log(res.scope);
                    })
                    .catch(function(err) {
                        console.log('[app-worker.js] occur error: ');
                        console.log(err);
                    });
            } else {
                console.log('[Service Worker] not exist');
            }
        }
    }

    APP.init();

    // TODO modify here to your own firebase
    var config = {
        apiKey: "AIzaSyDaMbHLq0aJC6WnYh8giTPtQS7p9ORGSSE",
        authDomain: "stevelinapp.firebaseapp.com",
        databaseURL: "https://stevelinapp.firebaseio.com/"
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
