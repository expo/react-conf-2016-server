/**
 * @providesModule ViewerQuery
 * @flow
 */

import ViewerType, { viewerResolver } from 'ViewerType';
import { requiresUser } from 'SchemaUtils';

export default {
  type: ViewerType,
  resolve: requiresUser(viewerResolver),
};
