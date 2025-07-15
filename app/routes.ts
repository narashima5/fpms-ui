import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('login','./routes/Login.tsx'),
    layout('components/appshell/AppShell.tsx', [
        route("dashboard", "./routes/Dashboard.tsx"),
        ...prefix('products',[
            index("./routes/Products.tsx"),
            route("addProduct","./routes/AddProducts.tsx")
        ]),
        route("bills", "./routes/BillingList.tsx"),
        route("new-bill", "./routes/Billing.tsx"),

    ]),

] satisfies RouteConfig;
