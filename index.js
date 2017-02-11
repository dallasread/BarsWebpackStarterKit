var App = require('bars/app'),
    Store = require('./utils/store'),
    store = new Store();

var app = new App(
    {
        index: require('./index.html'),
        // partials: {},
        // transforms: {}
    },

    store.data
);

store.on('update', function() {
    console.log(arguments);
    app.render();
});

app.appendTo(document.body);

window.app = app;
window.store = store;
