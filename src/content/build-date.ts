import publication from "./published.json";

// Publisher fixes the same date for static rendering and browser hydration.
export const contentAsOfDate = publication.asOfDate;
