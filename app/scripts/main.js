/*global Application, $*/

var app = {};


window.Application = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        app.milkcocoa = new MilkCocoa("https://io-vhyuut4dq.mlkcca.com");
        app.router = new Application.Routers.Application();
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    Application.init();
});
