import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
  bcrypt(stringToHash: string): any {
    const hash = bcrypt.hash(stringToHash);
    return hash;
  },
  verify(hash: string, text: string): any {
    const result = bcrypt.compare(text, hash);
    return result;
  },
};
