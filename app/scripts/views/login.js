/*global Application, Backbone, JST*/

Application.Views = Application.Views || {};

(function () {
    'use strict';

    Application.Views.Login = Backbone.View.extend({
        el: '#Application',

        template: JST['app/scripts/templates/login.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click #LoginBtn': 'onLogin',
            'click #AddUserBtn': 'onAddUser',
            'keypress .login__pass': 'onLoginKeypress'
        },

        initialize: function () {
        },

        cleanup: function() {
            this.undelegateEvents();
            $(this.el).empty();
            this.stopListening();
        },

        onLoginKeypress: function(e) {
            if(e.which == 13) {
                this.onLogin();
            }
        },

        onAddUser: function(e){
            var email = $('#AddEmail').val();
            var password = $('#AddPassword').val();
            var confirmpassword = $('#Confirm').val();

            if (password !== confirmpassword) {
                alert('パスワードが一致していません。');
                return false;
            }
            app.milkcocoa.addAccount(email, password, null, function(err, user) {
                switch (err) {
                    case null:
                        alert('正常に登録が完了しました。受信メールから本登録を行って下さい。');
                        break;
                    case 1:
                        alert('無効な書式のメールアドレスです');
                        break;
                    case 2:
                        alert('既に追加されているメールアドレスです');
                        break;
                }
            });
        },

        onLogin: function(e){
            var email = $('#Email').val();
            var password = $('#Password').val();

            app.milkcocoa.login(email, password, function(err, user) {
                if(err === '1') {
                    alert('Emailの形式が無効です。');
                } else if (err === '2') {
                    alert('登録されていないEmailか、無効なパスワードです。');
                } else if (err === '3') {
                    alert('まだアカウントは仮登録です');
                } else {
                    //成功時は取得できたidをコンテンツの表示切り分けなどに使う
                    localStorage.setItem('userid', user.id);
                    localStorage.setItem('profile', JSON.stringify(user));
                    localStorage.setItem('remember_me', $('#RememberMe:checked').val());
                    app.login = true;
                    app.router.navigate('app', {trigger: true});
                }
            });
        },



        render: function () {
            this.$el.html(this.template());
        }

    });

})();
