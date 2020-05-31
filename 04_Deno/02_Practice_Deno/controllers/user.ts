import db from "../config/database.ts";

const User = db.collection("users");

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
  const data = await ctx.request.body();
  const insertedId = await User.insertOne({
   ...data
  });
  console.log(data);
  ctx.response.status = 201;
  ctx.response.body = {
    msg: "Successfully created User.",
    user: insertedId,
  };
};
export const updateUser = async (ctx: any) => {
  const data = await ctx.request.body();
  const { matchedCount, modifiedCount, upsertedId } = await User.updateOne(
    { _id: { $oid: ctx.params.id } },
    { $set: { ...data } },
  );
  ctx.response.status=201;
  ctx.response.body = {
    msg: "Updated User Successfully.",
    user: {
      matchedCount,
      modifiedCount,
      upsertedId
    },
  };

};

export const deleteUser = async (ctx: any) => {
  const deleteCount = await User.deleteOne({ _id: { $oid: ctx.params.id }  });
  ctx.response.status=201;
  ctx.response.body = {
    msg: "Deleted User Successfully.",
    
  };


};
