// Importing Required Files And Packages Here.
import db from "../config/database.ts";
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import validation from "../validation.ts";
import hash from "../util/hash.ts";
import token from "../util/token.ts";

const User= db.collection("users");

// Main Logic For Login
export const login = async (ctx: any) => {
  // validation
  const value = await validation.validateLogin(ctx);
  if (!value) {
    return;
  }

  // fetch user
  const user = await User.findOne({ email: value.email });
  if (!user) {
    console.log("User with that email.")
    ctx.response.status = 422;
    ctx.response.body = {
      errors: { message: "Credentials doesn't match out record" },
    };
    return;
  }
  console.log(user);
  // verify password
  const passwordMatched = await hash.verify(user.password, value.password);
  console.log(passwordMatched);
  if (!passwordMatched) {
    ctx.response.body = { error: "Password is incorrect" };
    return;
  }
  // Sending Token To Client
  ctx.response.body =await token.generate(user._id.$oid);
};
