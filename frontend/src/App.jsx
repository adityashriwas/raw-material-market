import { createBrowserRouter, RouterProvider } from "react-router-dom"
import MainLayout from "./layout/MainLayout"
import Homepage from "./components/Homepage"
import Signup from "./components/SignUp";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";

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