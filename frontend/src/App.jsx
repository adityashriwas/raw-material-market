import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Homepage from "./components/Homepage"
import Signup from "./components/SignUp";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AddProduct from "./components/AddProduct";
import AllProducts from "./components/AllProducts";
import ProductDetails from "./components/ProductDetails";

const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
          <>
            <Homepage/>
          </>
          ),
        },

        {
          path: "/signup",
          element: <Signup />,
        },

        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/add-product",
          element: <AddProduct />,
        },
        
        {
          path: "/all-products",
          element: <AllProducts />,
        },

        {
          path: "/product/:id",
          element: <ProductDetails />,
        },

        {
          path: "/profile",
          element: <UserProfile />,
        }
      ],
    },
  ],
);

function App() {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App