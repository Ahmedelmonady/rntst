// Modern React Native API
import GameballApp from './GameballApp';
import GameballWidget from './GameballWidget';
export { GameballApp, GameballWidget };
export default GameballApp;

// Types following React Native conventions
export type {
  GameballConfig,
  CustomerInitializationRequest,
  CustomerAttributes,
  CustomerInitializationResponse,
  Event,
  ShowProfileRequest,
  Callback,
} from './types/Common';
