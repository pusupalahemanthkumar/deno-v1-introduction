// Importing Required Files And Packages Here.
import db from "../config/database.ts";

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

export const storeUser = async (ctx : any) => {
  
  // Checking If request Body Exists.
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Please Provide The Required Data",
    };
    return;
  }
  // Getting Request Body Data.
  const data = await ctx.request.body();
  // Vadliation check Here.
  if (!data.value.email) {
    ctx.response.status = 400;
    return ctx.response.body = {
      msg: "Email is Required",
    };
  }
  if (!data.value.password) {
    ctx.response.status = 400;
    return ctx.response.body = {
      msg: "Password is Required",
    };
  }
  if (!data.value.name) {
    ctx.response.status = 400;
    return ctx.response.body = {
      msg: "Name is Required",
    };
  }
  // Storing User in DataBase Here.
  const insertedId = await User.insertOne({
    ...data.value,
  });

  console.log(data);
  ctx.response.status = 201;
  ctx.response.body = {
    msg: "Successfully created User.",
    user: insertedId,
  };
};
export const updateUser = async (ctx: any) => {
  // Checking Request Body Exists
  if (!ctx.request.hasBody) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Please Provide The Required Data",
    };
    return;
  }
  // Getting Request Body Here.
  const data = await ctx.request.body();
   // Vadliation check Here.
  if (!data.value.email) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Email is Required",
    };
    return;
  }
  if (!data.value.password) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Password is Required",
    };
    return;
  }
  if (!data.value.name) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Name is Required",
    };
    return;
  }
  // Updating User Data Here.
  const { matchedCount, modifiedCount, upsertedId } = await User.updateOne(
    { _id: { $oid: ctx.params.id } },
    { $set: { ...data.value } },
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
};

export const deleteUser = async (ctx: any) => {
  const deleteCount = await User.deleteOne({ _id: { $oid: ctx.params.id } });
  ctx.response.status = 201;
  ctx.response.body = {
    msg: "Deleted User Successfully.",
  };
};
