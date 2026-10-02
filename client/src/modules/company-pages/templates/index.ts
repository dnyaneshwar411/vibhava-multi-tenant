import { style1About, style1Contact, style1Landing, style1Policy, style1Terms } from "./style-1";
import { style2About, style2Contact, style2Landing, style2Policy, style2Terms } from "./style-2";
import { style3About, style3Contact, style3Landing, style3Policy, style3Terms } from "./style-3";

export const Templates = {
  Style1: {
    landing: style1Landing,
    about: style1About,
    contact: style1Contact,
    "privacy-policy": style1Policy,
    "terms-conditions": style1Terms,
  },
  Style2: {
    landing: style2Landing,
    about: style2About,
    contact: style2Contact,
    "privacy-policy": style2Policy,
    "terms-conditions": style2Terms,
  },
  Style3: {
    landing: style3Landing,
    about: style3About,
    contact: style3Contact,
    "privacy-policy": style3Policy,
    "terms-conditions": style3Terms,
  },
}