export const getNestedError = (errors, path) => {
  if (!errors) {
    return;
  }
  const pathSegments = path?.split('.') || [];
  return pathSegments.reduce((error, segment) => error?.[segment], errors);
};