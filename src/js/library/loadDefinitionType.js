import serviceContainer from './serviceContainer';

export default function(definition) {
    return typeof definition.Type === 'string'
        ? serviceContainer.get(definition.Type).then(Type => {
            definition.Type = Type;
            return definition;
        })
        : Promise.resolve(definition);
}
