const browserFeatures = {};
const html = document.getElementsByTagName('html')[0];

function setBrowserFeature(feature, supported) {

    browserFeatures[feature] = supported;
    html.className += (supported ? ' ' : ' no-') + feature;

}

function prefixedProperty(property) {

    const style = document.createElement('div').style;
    const prefixes = ['Webkit', 'Moz', 'ms', 'O'];
    const upperCaseProperty = property.charAt(0).toUpperCase() + property.slice(1);
    let actualProp = false;

    if (property in style) {
        return property;
    }

    for (let i = 0; i < prefixes.length; i++) {

        const possibleProp = prefixes[i] + upperCaseProperty;

        if (possibleProp in style) {

            actualProp = possibleProp;
            break;

        }
    }

    return actualProp;

}

browserFeatures.runTests = function() {

    setBrowserFeature('svg', Boolean('createElementNS' in document && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect));

    setBrowserFeature('csstransforms', Boolean(prefixedProperty('transform')));

    setBrowserFeature('csstransitions', Boolean(prefixedProperty('transition')));

    setBrowserFeature('touch', Boolean('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch));

    setBrowserFeature('history', Boolean(window.history && window.history.pushState));

    return this;

};

browserFeatures.prefixed = prefixedProperty;
browserFeatures.setFeature = setBrowserFeature;

export default browserFeatures;
