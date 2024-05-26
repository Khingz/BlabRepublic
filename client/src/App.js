import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { NavBar } from "./components/navBar";
import { ScrollToTop } from "./components/scrollTop";
import Footer from "./components/footer";
import SinglePost from "./views/singlePost";
import CurrentUserProfile from "./views/profile";
import AddPost from "./views/AddPost";
import UpdatePost from "./views/UpdatePost";
import SingleUser from "./views/SingleUser";
import FilteredPosts from "./components/filteredPosts";
import { useAuth } from "./context/userContext";
import Users from "./views/Users";
import ProtectedRoutes from "./utility/protectedRoutes";
import NotFoundPage from "./views/NotFoundPage";

function App() {
  const {isLoggedIn} = useAuth()

  return (
    <div className="min-h-screen w-full" id="#app-root">
      <Router>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route
              path="/"
              element={<Home />}
          />
          <Route
              path="/login"
              element={!isLoggedIn ? <Login /> : <Navigate to='/' />}
          />
          <Route
              path="/register"
              element={!isLoggedIn ? <Register /> : <Navigate to='/' /> }
          />
          <Route
              path="/posts/:id"
              element={<SinglePost />}
          />
          <Route
              path="/posts"
              element={<FilteredPosts />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route
                path="/profile"
                element={<CurrentUserProfile /> }
            />
            <Route
                path="/posts/newpost"
                element={<AddPost /> }
            />
            <Route
                path="/posts/:id/update"
                element={<UpdatePost /> }
            />
            <Route
                path="/users/:id"
                element={<SingleUser /> }
            />
            <Route
                path="/users"
                element={<Users />  }
            />
            <Route
                path="/profile"
                element={<CurrentUserProfile /> }
            />
            <Route
                path="/posts/newpost"
                element={<AddPost /> }
            />
            <Route
                path="/posts/:id/update"
                element={<UpdatePost /> }
            />
            <Route
                path="/users/:id"
                element={<SingleUser /> }
            />
          </Route>
      </Routes>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
