/*global Application, Backbone*/

Application.Collections = Application.Collections || {};

(function () {
    'use strict';

    Application.Collections.Application = Backbone.Collection.extend({

        model: Application.Models.Application

    });

})();
