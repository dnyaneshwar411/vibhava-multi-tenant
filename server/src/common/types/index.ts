import { CONSTANTS } from "../../config/constants.js";

export type USER_TYPE = typeof CONSTANTS.USER_ROLE[number];

export type USER_MODELS = typeof CONSTANTS.USER_MODELS[number];

export type POSSIBLE_USERS = typeof CONSTANTS.POSSIBLE_USERS[number]

export type CONSTANTS_TYPE = {
  [K in keyof typeof CONSTANTS]: typeof CONSTANTS[K] extends readonly (infer U)[]
    ? U
    : typeof CONSTANTS[K];
};