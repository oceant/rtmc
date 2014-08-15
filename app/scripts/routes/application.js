/*global Application, Backbone*/

Application.Routers = Application.Routers || {};

(function () {
    'use strict';

    Application.Routers.Application = Backbone.Router.extend({
        routes: {
            '': 'app',
            'app': 'app',
            'login': 'login'
        },
        execute: function(callback, args){
            if ((!app.loaded) && (callback != this.login)){
                if ((app.login === true) || (localStorage.getItem('remember_me') === 'remember')) {
                    app.models = {};
                    app.models.taskModel = new Application.Models.Task();
                    app.collections = {};
                    app.collections.taskCollection = new Application.Collections.Task();

                    this.loading([
                        app.collections.taskCollection,
                    ], callback);


                    var profile = JSON.parse(localStorage.getItem('profile'));
                    app.userid = localStorage.getItem('userid');
                } else {
                    app.router.navigate('login', {trigger: true});
                }
            } else {
                if (this.dashboardView) {
                    this.dashboardView.cleanup();
                }
                if (this.trackView) {
                    this.trackView.cleanup();
                }
                callback(this);
            }
        },
        login: function(self){
            localStorage.clear();
            self.loginView = new Application.Views.Login();
            self.loginView.render();
        },
        loading: function(collections, callback){
            var self = this;
            self.app();
            var start = _.after(collections.length, _.once(function(){
                $('.AreaLoadingContents').hide();
                app.loaded = true;
                callback(self);
            }));
            _.each(collections, function(collection){
                collection.bind('sync', start);
            });
        },
        app: function(){
            this.appView = new Application.Views.App({
                collection: {
                    task: app.collections.taskCollection
                }
            });
            this.appView.render();

        },
    });

})();
