/**
 * 專案名稱：Steve App居家物聯網
 * 子專案名稱：PWA手機端APP
 * 檔案名稱：login-model.js
 * 檔案說明：登入頁面(Model)
 * Create 2018/06/24
 * @copyright Steve Lin. All right reserved.
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 * ---------------------------------------------------------------------------------------------------------------------
 * 使用說明：
 */

import { FIREBASE_CONNECTION as FIREBASE } from "./firebase-connection.js";

/**
 * [LOGIN_MODEL build login page model]
 * @type   {IFTT}
 * @member {Object}  validateRules    [login rules for validation]
 * @member {Boolean} validateToken    [the token record validate status]
 * @member {Boolean} accessLoginToken [the token record account available]
 * @method [addValidateRules]         [add the validation rule for elements]
 * @method [isValidate]               [check if validate success or not]
 * @method [authUserAccount]          [authenticate device account]
 * @method [launchDevice]             [launch the application function]
 * @return {[Object]}                 [login model]
 * Create 2018/06/25
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 */
const LOGIN_MODEL = (function() {
    'use strict';

    const loginModel = function(config) {
        this.validateRules = [];
        this.validateToken = false;
        this.accessLoginToken = false;
    }

    loginModel.prototype = {
        /**
         * [add the validation rule for elements]
         * @param {[Object]} rules [validate rule]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        addValidateRules: function(rules) {
            let self = this;
            self.validateRules = rules;
        },
        /**
         * [check if validate success or not]
         * @return {[Boolean]} [validation status]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        isValidate: function() {
            let self = this;

            let validationMatch = 0;
            let validateResult = {
                token: false,
                error: []
            };
            for(let i = 0; i < self.validateRules.length; i++) {
                let regexp = new RegExp(self.validateRules[i].regexp);
                let validateItemValue = self.validateRules[i].element.value;

                if(regexp.exec(validateItemValue) != null) {
                    validationMatch++;
                } else {
                    validateResult.error.push(self.validateRules[i].element);
                }
            }

            if(validationMatch == self.validateRules.length) {
                self.validateToken = true;
                validateResult.token = true;
            } else {
                self.validateToken = false;
                validateResult.token = false;
            }

            return validateResult;
        },
        /**
         * [authenticate device account]
         * @param  {[String]}   user.id       [device specific ID]
         * @param  {[String]}   user.password [device specific password]
         * @param  {[Function]} success       [while authenticate success, do something]
         * @param  {[Function]} failure       [while authenticate failure, do something]
         * @return {[Boolean]}                [authentication status]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        authUserAccount: function(user, success, failure) {
            let self = this;

            FIREBASE.getRef('user', (val) => {
                if(val.id === user.id && val.password === user.password) {
                    self.accessLoginToken = true;
                    success();
                } else {
                    self.accessLoginToken = false;
                    let authFailureMessage = 'authentication failure';
                    failure(authFailureMessage);
                }

                return self.accessLoginToken;
            });
        },
        /**
         * [launch the application function]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        launchDevice: function() {
            alert("Authentication Success");
        }
    }

    return new loginModel();
})();

export { LOGIN_MODEL };
