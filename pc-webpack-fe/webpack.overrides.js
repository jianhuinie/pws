module.exports = {
    production(config, {paths}) {
        paths.appBuild += '/newpcweb';
        config.output.path = paths.appBuild;
    }
};
