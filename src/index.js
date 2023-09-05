import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./routes/Home";
import CreateRecipe from "./routes/CreateRecipe";
import Recipes from "./routes/Recipes";
import ErrorPage from "./routes/ErrorPage";
import RecipeDetails from "./routes/RecipeDetails";

import { CartProvider } from "./CartContext";

const AppLayout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "createrecipe",
        element: <CreateRecipe />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "recipes/:id",
        element: <RecipeDetails />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <RouterProvider router={router} />
  </CartProvider>
);