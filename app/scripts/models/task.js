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

        parse: function(response, options)  {
            return response;
        }
    });

})();
