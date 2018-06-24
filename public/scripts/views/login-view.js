/**
 * 專案名稱：Steve App居家物聯網
 * 子專案名稱：PWA手機端APP
 * 檔案名稱：login-view.js
 * 檔案說明：登入頁面(View)
 * Create 2018/06/24
 * @copyright Steve Lin. All right reserved.
 * @author Chieng-Yu Lin (Email:jojo404032@gmil.com, Phone:+886-973-686-705)
 * ---------------------------------------------------------------------------------------------------------------------
 * 使用說明：
 */

const LOGIN_VIEW = (function() {
    'use strict';

    const loginView = function(config) {
        this.container = config.container;
        this.elements = config.elements;

        this.init();
    }

    loginView.prototype = {
        init: function() {
            this.render();
        },
        render: function() {
        }
    }

    let container = document.querySelector('.login-page');
    let elements = {
        '.device-textfield': container.querySelector('.device-textfield'),
        '.password-textfield': container.querySelector('.password-textfield'),
        '.launch-button': container.querySelector('.launch-button')
    };

    return new loginView({
        container: container,
        elements: elements
    });
})();

export { LOGIN_VIEW };
