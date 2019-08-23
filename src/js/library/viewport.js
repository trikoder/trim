let currentBreakpoint;
let config;

function checkBreakpoints() {

    const windowWidth = 'innerWidth' in window
        ? window.innerWidth
        : document.documentElement.offsetWidth
    ;

    for (var key in config.ranges) {

        const range = config.ranges[key];
        const from = range[0];
        const to = range[1];

        if (windowWidth >= from && windowWidth <= to && currentBreakpoint !== key) {
            currentBreakpoint = key;
            config.onMatch(key);
        }

    }

}

export default {

    setBreakpoints(userConfig) {

        config = userConfig;

        window.removeEventListener('resize', checkBreakpoints);
        window.addEventListener('resize', checkBreakpoints);

        return this;

    },

    checkBreakpoints() {

        checkBreakpoints();
        return this;

    }

};
