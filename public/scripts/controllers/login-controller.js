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

const LOGIN_CONTROLLER = (function() {
    'use strict';

    const loginController = function(config) {
        this.view = config.view;
        this.model = config.model;

        this.init();
    }

    loginController.prototype = {
        init: function() {
            let self = this;

            self.addValidateRules();
            self.attachLanuchEvent();
        },
        addValidateRules: function() {
            let self = this;

            let rules = [{
                element: self.view.elements['.device-textfield'],
                regexp: '^{[a-zA-Z0-9]}{4, 8}$'
            }, {
                element: self.view.elements['.password-textfield'],
                regexp: '^{[a-zA-Z0-9]}{4, 8}$'
            }];

            self.model.addValidateRules(rules);
        },
        attachLanuchEvent: function() {
            let self = this;

            self.view.elements['.launch-button'].addEventListener('click', self.model.launchDevice);
        }
    }

    return new loginController({
        view: LOGIN_VIEW,
        model: LOGIN_MODEL
    });
})();

export { LOGIN_CONTROLLER };
