/*global Application, Backbone, JST*/

Application.Views = Application.Views || {};

(function () {
    'use strict';

    Application.Views.App = Backbone.View.extend({
        el: '#Application',

        template: JST['app/scripts/templates/app.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click #TaskInputBtn': 'onAddTask'
        },

        initialize: function () {
            this.listenTo(this.collection.task, 'change', this.render);
        },

        onAddTask: function() {
            var data = {
                title: $('input[name=title]').val()
            }
            this.collection.post(app.userid, data);
        },

        render: function () {
            this.$el.html(this.template({
                tasks: this.collection.task.toJSON()
            }));
        }

    });

})();
