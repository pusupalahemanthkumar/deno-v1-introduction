// PAGE NOT FOUND 
export default (ctx :any) => {
  ctx.response.status = 404;
  ctx.response.body = {
    error: "Page Not Found",
  };
};
