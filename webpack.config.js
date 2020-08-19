module.exports = ({NODE_ENV = ''} = {})=> {
    if (NODE_ENV === 'prod') {
        return require('./config/webpack.prod');
    } else {
        return require('./config/webpack.dev');
    }
};