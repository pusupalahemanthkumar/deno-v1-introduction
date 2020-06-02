// Importing Required Files And Packages Here.
import { ObjectId } from "https://deno.land/x/mongo@v0.7.0/mod.ts";

import db from "../config/database.ts";
import hash from "../util/hash.ts";

import validation from "../validation.ts";

const User = db.collection("users");

//  Main Controller Logic Here.

export const getIndex = async (ctx: any) => {
  try {
    const data = await User.find();
    console.log(data);
    ctx.response.body = {
      msg: "Fetched",
      users: data,
    };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      msg: "Error",
      error: err.message,
    };
  }
};

export const getUser = async (ctx: any) => {
  try {
    console.log(ctx.params.id);
    const data = await User.findOne({ _id: ObjectId(ctx.params.id) });
    ctx.response.body = {
      msg: "Fetched User",
      user: data,
    };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      msg: "Error",
      error: err.message,
    };
  }
};

export const storeUser = async (ctx: any) => {
  try {
    const value = await validation.validate(ctx);
    //  If No Error
    if (value) {
      // Storing User in DataBase Here.
      value.created_at = parseInt((new Date().getTime() / 1000).toString());
      value.password = await hash.bcrypt(value.password);
      console.log(value.password);
      const insertedId = await User.insertOne({
        ...value,
      });
      ctx.response.status = 201;
      ctx.response.body = {
        msg: "Successfully created User.",
        user: value,
        userId: insertedId,
      };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      msg: "Error",
      error: err.message
    };
  }
};
export const updateUser = async (ctx: any) => {
  try {
    // Checking Request Body Exists
    const value = await validation.validateUpdate(ctx);

    if (value) {
      const data = {
        email: value.email,
        name: value.name,
        password: value.password,
      };
      // Updating User Data Here.
      const { matchedCount, modifiedCount, upsertedId } = await User.updateOne(
        { _id:ObjectId(ctx.params.id) },
        { $set: { ...data } },
      );
      ctx.response.status = 201;
      ctx.response.body = {
        msg: "Updated User Successfully.",
        user: {
          matchedCount,
          modifiedCount,
          upsertedId,
        },
      };
    }
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      msg: "Error",
      error: err.message,
    };
  }
};

export const deleteUser = async (ctx: any) => {
  try {
    const deleteCount = await User.deleteOne({ _id: ObjectId(ctx.params.id) });
    ctx.response.status = 200;
    ctx.response.body = {
      msg: "Deleted User Successfully.",
    };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      msg: "Error",
      error: err.message,
    };
  }
};
