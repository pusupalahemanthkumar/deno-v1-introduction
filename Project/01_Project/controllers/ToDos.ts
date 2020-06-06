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
