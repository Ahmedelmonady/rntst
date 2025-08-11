/**
 * Common types used throughout the Gameball SDK
 * Following React Native conventions with plain objects and optional properties
 */

export interface GameballConfig {
  apiKey: string;
  lang: string;
  shop?: string;
  platform?: string;
  apiPrefix?: string;
}

export interface Callback<T> {
  onSuccess?: (result: T) => void;
  onError?: (error: Error) => void;
}

export interface CustomerInitializationResponse {
  gameballId: string;
}

export interface CustomerInitializationRequest {
  customerId: string;
  email?: string;
  mobile?: string;
  referralCode?: string;
  levelOrder?: number;
  customerAttributes?: CustomerAttributes;
  deviceToken?: string;
  pushProvider?: string;
  isGuest?: boolean;
}

export interface CustomerAttributes {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  gender?: 'M' | 'F';
  dateOfBirth?: string;
  joinDate?: string;
  tags?: string[];
  custom?: Record<string, any>;
  preferredLanguage?: string;
  [key: string]: any;
}

export interface Event {
  events: Record<string, Record<string, any>>;
  customerId: string;
  mobile?: string;
  email?: string;
}

export interface ShowProfileRequest {
  customerId: string;
  showCloseButton?: boolean;
  openDetail?: string;
  hideNavigation?: boolean;
  widgetUrlPrefix?: string;
  closeButtonColor?: string;
}

export type GameballSDKHeadersType = {
  'OS': string;
  'SDKVersion': string;
  'X-GB-Agent': string;
  'APIKey'?: string;
  'Content-Type': string;
};
