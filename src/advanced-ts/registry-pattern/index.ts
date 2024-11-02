import { fetchRecord } from "./lib/registry";

const book = fetchRecord("book", "bk_123");
const magazine = fetchRecord("magazine", "bk_123");

/**
* Example of declare module interface usage in registry pattern
*/
