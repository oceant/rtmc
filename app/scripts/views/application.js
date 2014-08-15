/*global Application, Backbone, JST*/

Application.Views = Application.Views || {};

(function () {
    'use strict';

    Application.Views.Application = Backbone.View.extend({

        template: JST['app/scripts/templates/application.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {},

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        }

    });

})();
