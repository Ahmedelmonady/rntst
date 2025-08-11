export interface Customer {
  customerId: string;
  mobile?: string;
  email?: string;
  referralCode?: string;
  levelOrder?: number;
  customerAttributes?: CustomerAttributes;
  deviceToken?: string;
}

export type CustomerAttributes = {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  mobile?: string;
  email?: string;
  gender?: 'M' | 'F';
  dateOfBirth?: string;
  joinDate?: string;
  tags?: string[];
  custom?: KeyValuePair;
  preferredLanguage?: string;
  [key: string]: any;
};

type KeyValuePair = { [key: string]: any };
export type EventObject = {
  events: Record<string, Record<string, any>>;
  customerId: string;
  mobile?: string;
  email?: string;
};
