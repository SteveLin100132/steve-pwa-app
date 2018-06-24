/**
 * 專案名稱：Steve App居家物聯網
 * 子專案名稱：PWA手機端APP
 * 檔案名稱：login-controller.js
 * 檔案說明：登入頁面(Controller)
 * Create 2018/06/24
 * @copyright Steve Lin. All right reserved.
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 * ---------------------------------------------------------------------------------------------------------------------
 * 使用說明：
 */

import { LOGIN_VIEW } from "../views/login-view.js";
import { LOGIN_MODEL } from "../models/login-model.js";

/**
 * [LOGIN_CONTROLLER build login page controller]
 * @type   {IFTT}
 * @member {Object} view       [login page 'view']
 * @member {Object} model      [login page 'model']
 * @method [init]              [initialize login page controller]
 * @method [addValidateRules]  [add the validation rule for elements]
 * @method [attachLanuchEvent] [attach the click event while launch button clicked]
 * @return {[Object]}          [login controller]
 * Create 2018/06/25
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 */
const LOGIN_CONTROLLER = (function() {
    'use strict';

    const loginController = function(config) {
        this.view = config.view;
        this.model = config.model;

        this.init();
    }

    loginController.prototype = {
        /**
         * [initialize login page controller]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        init: function() {
            let self = this;

            self.addValidateRules();
            self.attachLanuchEvent();
        },
        /**
         * [add the validation rule for elements]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        addValidateRules: function() {
            let self = this;

            let rules = [{
                element: self.view.elements['.device-textfield'],
                regexp: /^[A-Za-z0-9]{4,8}$/
            }, {
                element: self.view.elements['.password-textfield'],
                regexp: /^[A-Za-z0-9]{4,8}$/
            }];

            self.model.addValidateRules(rules);
        },
        /**
         * [attach the click event while launch button clicked]
         * Create 2018/06/25
         * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
         */
        attachLanuchEvent: function() {
            let self = this;

            self.view.elements['.launch-button'].addEventListener('click', () => {
                let validate = self.model.isValidate();
                let user = {
                    id: self.view.elements['.device-textfield'].value,
                    password: self.view.elements['.password-textfield'].value
                };

                if(validate.token) {
                    let auth = self.model.authUserAccount(user, () => {
                        self.model.launchDevice();
                    }, (err) => {
                        alert("Authentication Error");
                        console.log(err);
                    });
                } else {
                    for(let i = 0; i < validate.error.length; i++) {
                        self.view.validateFailedTextfield(validate.error[i]);
                    }
                }
            });
        }
    }

    return new loginController({
        view: LOGIN_VIEW,
        model: LOGIN_MODEL
    });
})();

export { LOGIN_CONTROLLER };
