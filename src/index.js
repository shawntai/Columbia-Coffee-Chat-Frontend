import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./Profile";
import Home from "./Home";
import History from "./History";
import EditProfile from "./EditProfile";
import Review from "./Review";
import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/history",
		element: <History />,
	},
	{
		path: "/edit",
		element: <EditProfile />,
	},
	{
		path: "/review/:id",
		element: <Review />,
	},
]);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
