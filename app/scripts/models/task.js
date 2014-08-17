/*global Application, Backbone*/

Application.Models = Application.Models || {};

(function () {
    'use strict';

    Application.Models.Task = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
        },

        validate: function(attrs, options) {
        },

        post: function(userid, data) {
            if (!userid) userid = app.userid;
            var taskDataStore = app.milkcocoa.dataStore('tasks/' + userid);
            // app.collections.taskCollection.push(data);
            // app.collections.taskCollection.trigger('change');
            taskDataStore.push(data, function(result){
                app.collections.taskCollection.push(result.value);
                app.collections.taskCollection.trigger('change');
            });
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
