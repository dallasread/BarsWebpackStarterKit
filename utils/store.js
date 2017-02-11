var Generator = require('generate-js'),
    events = require('events');

var Store = Generator.generateFrom(events.EventEmitter, function Store(data) {
    var _ = this;

    _.defineProperties({
        data: data || {}
    });
});

Store.definePrototype({
    set: function set(key, value) {
        this.data = typeof this.data === 'object' ? this.data : {};

        var _ = this,
            splat = key.split(/\/|\./),
            lastKey = splat.pop(),
            obj = _.data;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        obj[lastKey] = value;

        _.emit('update', key, value);

        return value;
    },

    unset: function unset(key) {
        this.data = typeof this.data === 'object' ? this.data : {};

        var _ = this,
            splat = key.split(/\/|\./),
            lastKey = splat.pop(),
            obj = _.data;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] !== 'object') {
                obj[splat[i]] = {};
            }

            obj = obj[splat[i]];
        }

        delete obj[lastKey];

        obj = _.data;

        for (var i = 0; i < splat.length; i++) {
            if (typeof obj[splat[i]] === 'object' && !Object.keys(obj[splat[i]]).length) {
                delete obj[splat[i]];
                break;
            }

            obj = obj[splat[i]];
        }

        _.emit('update', key);
    },

    get: function get(key) {
        var _ = this,
            splat = key.split(/\/|\./),
            lastKey = splat.pop(),
            obj = _.data;

        for (var i = 0; i < splat.length; i++) {
            obj = obj[splat[i]];
            if (!obj) return;
        }

        return obj[lastKey];
    }
});

module.exports = Store;
