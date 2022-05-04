export const handleResponse = (executor, fulfilledCallback) => {
  executor.then((res) => fulfilledCallback(res)).catch((error) => console.log(error));
};
