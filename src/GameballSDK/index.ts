import { Platform } from 'react-native';
import GameballWidget from '../GameballWidget';
import type { EventObject, Customer } from './types';
const package_json = require('../../package.json');

let baseUrl = '';
var customerId = '';

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
    baseUrl = `${GameballWidget.apiPrefix}/api/v4.0/integrations`;
  }
};

const sendEvent = async (data: EventObject) => {
  if (!baseUrl) initializeBaseUrl();

  return makeRequest(baseUrl + '/events', data);
};

const registerCustomer = async (data: Customer) => {
  if (!baseUrl) initializeBaseUrl();

  customerId = data.customerId;
  GameballWidget.initializeCustomer(customerId);
  myHeaders = { ...myHeaders, APIKey: GameballWidget.apiKey };
  return makeRequest(baseUrl + '/customers', data);
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

export { registerCustomer, sendEvent, getReferralCode };
