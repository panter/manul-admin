/**
Best use https://github.com/panter/manul-alerts !
**/
export default {
  handleCallback(namespace, { props }, next) {
    return (error, result) => {
      if (error) {
        window.alert(`an error occured: ${error.reason || error.message}`);
      } else {
        window.alert(`${namespace} success!`);
      }
      next(error, result);
    };
  },
};
