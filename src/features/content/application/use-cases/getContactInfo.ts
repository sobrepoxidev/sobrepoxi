import { getContactInfo, type ContactInfo } from '../distribute';

export function getContactInformation(): ContactInfo {
  return getContactInfo();
}