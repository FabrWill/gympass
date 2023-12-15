export default defineNuxtRouteMiddleware((to, from) => {
  console.log(to.path);
  if (to.path === "/") {
    return navigateTo("/dashboard");
  }
});
