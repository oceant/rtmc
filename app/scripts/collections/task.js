/*global Application, Backbone*/

Application.Collections = Application.Collections || {};

(function () {
    'use strict';

    Application.Collections.Task = Backbone.Collection.extend({

        model: Application.Models.Task,

        initialize: function(userid, callback){
            if (!userid) userid = app.userid;
            var self = this;
            app.milkcocoa.dataStore("tasks/" + userid ).get(function(data) {
                self.set(data);
                if (callback) callback();
            });
        },

        post: function(userid, data) {
            if (!userid) userid = app.userid;
            var taskDataStore = app.milkcocoa.dataStore('tasks/' + userid);
            this.push(data);
            this.trigger('change');
            taskDataStore.push(data);
        }

    });

})();
