// Importing Required Files And Packages Here.
import {
  validateJwt,
  parseAndDecode,
  validateJwtObject,
} from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";

const key = "your-secret";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

export default {
  // Logic To Generate Token
  generate(userId: string): string {
    const payload: Payload = {
      uid: userId,
      exp: setExpiration(new Date().getTime() + 60000 * 60),
    };
    return makeJwt({ header, payload, key });
  },
  // Logic To Validate Token 
  async validate(token: string) {
    return !!await validateJwt(token, key, { isThrowing: false });
  },
  // Getting UserId For Token
  fetchUserId(token: string) {
    return validateJwtObject(parseAndDecode(token)).payload;
  },
};
 