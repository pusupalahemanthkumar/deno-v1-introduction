// Importing Required Files And Packages Here.
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";


export default {
  // To Hash Password
  bcrypt(stringToHash: string): any {
    const hash = bcrypt.hash(stringToHash);
    return hash;
  },
  // To Verify Password
  verify(hash: string, text: string): any {
    const result = bcrypt.compare(text, hash);
    return result;
  },
};
