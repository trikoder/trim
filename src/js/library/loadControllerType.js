import serviceContainer from './serviceContainer';
import Loader from './loader';

const controllerPromiseMap = {};

export default function(controllerName) {

    if (controllerPromiseMap[controllerName]) {
        return controllerPromiseMap[controllerName];
    }

    const loader = Loader.on();

    controllerPromiseMap[controllerName] = serviceContainer.get(
        controllerName + 'Controller'
    ).then(definition => {

        if (definition.extendsController || definition.resourceName) {

            const controllerName = (definition.extendsController || 'BaseResource') + 'Controller';

            return serviceContainer
                .get(controllerName)
                .then(BaseController => {
                    loader.off();
                    return BaseController.toVueComponent(definition);
                });

        } else {
            loader.off();
            return definition;
        }

    });

    return controllerPromiseMap[controllerName];

}
