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
            'click #TaskInputBtn': 'onAddTask',
            'click #LogoutBtn': 'onLogout',
            'keypress input[name=title]': 'onTaskKeypress',
            'click .delete-task': 'onDeleteTask'
        },

        initialize: function () {
            this.listenTo(this.collection.task, 'change', this.render);
        },
        
        cleanup: function() {
            this.undelegateEvents();
            $(this.el).empty();
            this.stopListening();
        },

        onTaskKeypress: function(e){
            if(e.which == 13) {
                this.onAddTask();
                return false;
            }
        },

        onAddTask: function() {
            if ($('input[name=title]').val() == '') return false;
            var data = {
                title: $('input[name=title]').val()
            }
            this.model.task.post(app.userid, data);
        },

        onDeleteTask: function(e) {
            var id = $(e.target).data('id');
            this.collection.task.removeTask(id);
        },

        onLogout: function(){
            app.milkcocoa.logout(function(){
                app.router.navigate('login', {trigger: true});
            });
            return false;
        },

        render: function () {
            this.$el.html(this.template({
                tasks: this.collection.task.toJSON()
            }));
        }

    });

})();
