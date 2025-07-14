import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('login','./routes/Login.tsx'),
    layout('components/appshell/AppShell.tsx', [
        route("dashboard", "./routes/Dashboard.tsx"),
        route("products", "./routes/Products.tsx"),
        route("bills", "./routes/BillingList.tsx"),
        route("new-bill", "./routes/Billing.tsx"),

    ]),

] satisfies RouteConfig;
