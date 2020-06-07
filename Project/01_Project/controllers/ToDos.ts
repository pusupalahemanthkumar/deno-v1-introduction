// Importing Required Files And Packages Here.
import { ObjectId } from "https://deno.land/x/mongo@v0.8.0/mod.ts";

import db from "../config/database.ts";

const ToDos = db.collection("todos");

// Main ToDos Controllers Logic Here.
export const getToDos = async (ctx: any) => {
  try {
    const todos = await ToDos.find();
    ctx.response.body = {
      msg: "Fetched ToDos Successfully!",
      todos: todos,
    };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      error: {
        msg: "Server Error!",
      },
    };
  }
};

export const addToDos = async (ctx: any) => {
  try {
    const { value } = await ctx.request.body();
    console.log(value);
    if (!value.name) {
      ctx.response.status = 402;
      ctx.response.body = {
        error: {
          msg: "Task Name is Required!",
        },
      };
    }
    const insertedId = await ToDos.insertOne({
      name: value.name,
    });
    ctx.response.status = 201;
    ctx.response.body = {
      msg: "Todos Task Added Successfully!",
      todo: {
        _id: insertedId,
        name: value.name,
      },
    };
  } catch (err) {
    console.log(err.message);
    ctx.response.status = 500;
    ctx.response.body = {
      error: {
        msg: "Server Error!",
      },
    };
  }
};

export const deleteToDos = async (ctx: any) => {
  try {
    const id = ctx.params.id;
    console.log(id);
    await ToDos.deleteOne({ _id: ObjectId(id) });
    ctx.response.status = 200;
    ctx.response.body = {
      msg: "Successfully Deleted Todo",
      todoId: id,
    };
  } catch (err) {
    console.log(err.message);
    if (err.message === `ObjectId("${ctx.params.id}") is not legal.`) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: {
          msg: "Invalid Id",
        },
      };
      return;
    }
    ctx.response.status = 500;
    ctx.response.body = {
      error: {
        msg: "Server Error!",
      },
    };
  }
};
