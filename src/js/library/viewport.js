let currentBreakpoint;
let config;

function checkBreakpoints() {

    const windowWidth = 'innerWidth' in window
        ? window.innerWidth
        : document.documentElement.offsetWidth
    ;

    for (let key in config.ranges) {

        let range = config.ranges[key];
        let from = range[0];
        let to = range[1];

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
