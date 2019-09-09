import { NormalizedCache, StoreObject } from './types';

export interface Reference {
  readonly __ref: string;
}

export function makeReference(id: string): Reference {
  return { __ref: String(id) };
}

export function isObjectOrArray(obj: any): obj is Record<string, any> {
  return obj !== null && typeof obj === 'object';
}

export function isReference(obj: any): obj is Reference {
  return isObjectOrArray(obj) && typeof obj.__ref === 'string';
}

export function getTypenameFromStoreObject(
  store: NormalizedCache,
  storeObject: StoreObject | Reference,
): string | undefined {
  return isReference(storeObject)
    ? getTypenameFromStoreObject(store, store.get(storeObject.__ref))
    : storeObject && storeObject.__typename;
}
