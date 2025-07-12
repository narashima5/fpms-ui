import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login","./routes/LoginPage/LoginPage.tsx"),
    route("dashboard","./routes/Dashboard/Dashboard.tsx")

] satisfies RouteConfig;
