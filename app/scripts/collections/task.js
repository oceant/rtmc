/*global Application, Backbone*/

Application.Collections = Application.Collections || {};

(function () {
    'use strict';

    Application.Collections.Task = Backbone.Collection.extend({

        model: Application.Models.Task,

        initialize: function(userid, callback){
            if (!userid) userid = app.userid;
            var self = this;
            app.milkcocoa.dataStore('tasks/' + userid ).query().limit(30).done(function(data) {
                self.set(data);
                self.trigger('change');
                if (callback) callback();
            });
        },

        removeTask: function(id){
            var userid = app.userid;
            app.milkcocoa.dataStore('tasks/' + userid).remove(id);
            var removeItem = this.findWhere({id: id});
            console.log(removeItem);
            this.remove(removeItem);
            this.trigger('change');
        }

        // post: function(userid, data) {
        //     if (!userid) userid = app.userid;
        //     var taskDataStore = app.milkcocoa.dataStore('tasks/' + userid);
        //     this.push(data);
        //     this.trigger('change');
        //     taskDataStore.push(data);
        // }

    });

})();
