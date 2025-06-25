import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    route("SignIn",'routes/root/SignIn.tsx'),
    route('api/create-trip', 'routes/api/create-trip.ts'),
    layout("routes/admin/Layout.tsx",[
        route("Dashboard",'routes/admin/Dashboard.tsx'),
        route("all-users",'routes/admin/all-users.tsx'),
        route("trips",'routes/admin/trips.tsx'),
        route("trips/create",'routes/admin/CreateTrip.tsx')
    ])
] satisfies RouteConfig;