export interface Player {
  playerUniqueId: string;
  mobile?: string;
  email?: string;
  referrerCode?: string;
  levelOrder?: number;
  playerAttributes?: PlayerAttributes;
  deviceToken?: string;
}

export type PlayerAttributes = {
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
export type EventObject = { [key: string]: KeyValuePair };
