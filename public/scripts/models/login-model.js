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

const LOGIN_MODEL = (function() {
    'use strict';

    const loginModel = function(config) {
        this.validateRules = [];
        this.validateToken = false;
    }

    loginModel.prototype = {
        addValidateRules: function(rules) {
            let self = this;
            self.validateRules = rules;
        },
        isValidate: function() {
            let self = this;

            let validationMatch = 0;
            for(let i = 0; i < self.validateRules.length; i++) {
                let regexp = new RegExp(self.validateRules[i].regexp);
                let validateItemValue = self.validateRules[i].element.value;

                console.log(regexp.exec(validateItemValue));
                if(regexp.exec(validateItemValue) != null) {
                    validationMatch++;
                }
            }

            if(validationMatch == self.validateRules.length) {
                self.validateToken = true;
            }

            return self.validateToken;
        },
        launchDevice: function() {
            console.log(this);
            alert('launch');
        }
    }

    return new loginModel();
})();

export { LOGIN_MODEL };
