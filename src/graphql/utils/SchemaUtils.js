/**
 * @providesModule SchemaUtils
 * @flow
 */

export const requiresUser = (resolver: Function): Function => (
  (...args) => {
    // TODO: require login
    return resolver(...args);
  }
);
