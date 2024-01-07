import { Platform } from 'react-native';
import GameballWidget from '../GameballWidget';
import type { EventObject, Player } from './types';
const package_json = require('../../package.json');

let baseUrl = '';
var playerId = '';

type GameballSDKHeadersType = {
  'OS': typeof Platform.OS;
  'SDKVersion': string;
  'X-GB-Agent': string;
  'APIKey'?: string;
  'Content-Type': string;
};

let myHeaders: GameballSDKHeadersType = {
  'OS': Platform.OS,
  'SDKVersion': package_json.version,
  'Content-Type': 'application/json',
  'X-GB-Agent': `GB/react/${package_json.version}`,
};

const initializeBaseUrl = () => {
  if (!baseUrl) {
    baseUrl = `${GameballWidget.apiPrefix}/api/v3.0/integrations`;
  }
};

const sendEvent = async (data: EventObject) => {
  if (!baseUrl) initializeBaseUrl();

  const sendEventJson = {
    events: data,
    playerUniqueId: playerId,
    sessionInfo: {
      platform: 4,
    },
  };
  return makeRequest(baseUrl + '/event', sendEventJson);
};

const registerPlayer = async (data: Player) => {
  if (!baseUrl) initializeBaseUrl();

  playerId = data.playerUniqueId;
  GameballWidget.initialize_player(playerId);
  myHeaders = { ...myHeaders, APIKey: GameballWidget.apiKey };
  return makeRequest(baseUrl + '/player', data);
};

async function makeRequest(url: string, data: object) {
  console.log({ url, data });
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: myHeaders,
  }).then((response) => response.json());
}

const getReferralCode = (url: string) => {
  let index = url.indexOf('=');
  index = index + 1;
  return url.substring(index);
};

export { registerPlayer, sendEvent, getReferralCode };
