/**
 * 專案名稱：Steve App居家物聯網
 * 子專案名稱：PWA手機端APP
 * 檔案名稱：firebase-connection.js
 * 檔案說明：建立Firebase連線
 * Create 2018/06/24
 * @copyright Steve Lin. All right reserved.
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 * ---------------------------------------------------------------------------------------------------------------------
 * 使用說明：
 */

/**
 * [FIREBASE_CONNECTION establish firebase connection]
 * @type   {IFTT}
 * @member {Object} firebaseDB [firebase database]
 * @method [config]   [firebase configure data]
 * @method [init]     [initialize firebase]
 * @method [getRef]   [get reference data without auto update]
 * @return {[Object]} [firebase]
 */
const FIREBASE_CONNECTION = (function() {
    'use strict';

    const firebaseConnection = {
        firebaseDB: null,
        /**
         * [firebase configure data]
         * @return {[Object]} [configure data]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        config: function() {
            // TODO modify here to your own firebase
            return {
                apiKey: "",
                authDomain: "<Project ID>.firebaseapp.com",
                databaseURL: "https://<Project ID>.firebaseio.com/"
            };
        },
        /**
         * [initialize firebase]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        init: function() {
            let config = this.config();
            firebase.initializeApp(config);

            this.firebaseDB = firebase.database();
        },
        /**
         * [get reference data without auto update]
         * @param {String}   data     [firebase database reference data]
         * @param {Function} callback [when get the data from firebase then use callback function to send the value with argument]
         * Create 2018/06/24
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        getRef: function(data, callback) {
            let userRef = this.firebaseDB.ref(data);
            userRef.once('value', (snapshot) => {
                callback(snapshot.val());
            });
        }
    };

    return firebaseConnection;
})();

export { FIREBASE_CONNECTION };
