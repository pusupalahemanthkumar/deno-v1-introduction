// Importing Required Files And Packages Here.

// Main ToDos Controllers Logic Here.
export const getToDos = async (ctx: any) => {
  try {
    ctx.response.body = {
      msg: "Fetched ToDos Successfully!",
      todos: [
        {
          id: 1,
          name: "React",
        },
        {
          id: 2,
          name: "django",
        },
      ],
    };
  } catch (err) {
    console.log(err.message);
  }
};

export const addToDos = async (ctx: any) => {
  try {
    const { value } = await ctx.request.body();
    console.log(value);
    ctx.response.status = 201;
    ctx.response.body = {
      msg: "Todos Task Added Successfully!",
      todo: {
        ...value,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
};

export const deleteToDos = async (ctx: any) => {
  try {
    const id = ctx.params.id;
    console.log(id);
    ctx.response.status = 200;
    ctx.response.body = {
      msg: "Successfully Deleted Todo",
      todoId: id,
    };
  } catch (err) {
    console.log(err.message);
  }
};
