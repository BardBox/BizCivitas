import { PagePropsWithSearch, UTMParams } from './common.types';

// Re-export the common PageProps for backward compatibility
export type PageProps = PagePropsWithSearch;

// Notes interface with UTM parameters
export interface Notes extends UTMParams {}