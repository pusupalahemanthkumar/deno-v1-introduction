// Importing Required Files And Packages Here.
import db from "../config/database.ts";

import validation from "../validation.ts";

const User = db.collection("users");

//  Main Controller Logic Here.

export const getIndex = async (ctx: any) => {
  const data = await User.find();
  console.log(data);
  ctx.response.body = {
    msg: "Fetched",
    users: data,
  };
};

export const getUser = async (ctx: any) => {
  console.log(ctx.params.id);
  const data = await User.findOne({ _id: { $oid: ctx.params.id } });
  ctx.response.body = {
    msg: "Fetched User",
    user: data,
  };
};

export const storeUser = async (ctx: any) => {
  const value = await validation.validate(ctx);
  //  If No Error
  if (value) {
    // Storing User in DataBase Here.
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
};
export const updateUser = async (ctx: any) => {
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
      { _id: { $oid: ctx.params.id } },
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
};

export const deleteUser = async (ctx: any) => {
  const deleteCount = await User.deleteOne({ _id: { $oid: ctx.params.id } });
  ctx.response.status = 200;
  ctx.response.body = {
    msg: "Deleted User Successfully.",
  };
};
