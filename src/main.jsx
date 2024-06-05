import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Store/Store.js";

import Login_Page from "./pages/Login_Page.jsx";
import SignUp_Page from "./pages/SignUp_Page.jsx";
import Index from "./pages/Index.jsx";
import AddPost_Page from "./pages/AddPost_Page.jsx";
import UserInfo from "./components/UserInfo.jsx";
import PostPage from "./pages/PostPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import CategoryPost from "./pages/CategoryPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Index />,
      },
      { path: "/user", element: <UserInfo /> },
      { path: "/post/:slug", element: <PostPage /> },
      { path: "/login", element: <Login_Page /> },
      { path: "/signup", element: <SignUp_Page /> },
      { path: "/addpost", element: <AddPost_Page /> },
      { path: "/bloggerinfo", element: <UserInfo /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/category/:category", element: <CategoryPost /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
