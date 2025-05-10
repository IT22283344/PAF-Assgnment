import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserLogin from "./Component/User/UserLogin";
import UserSignup from "./Component/User/UserSignup";
import UserPost from "./Component/UserPost/UserPost";
import UserCreatePost from "./Component/UserPost/UserCreatePost";
import UserEdit from "./Component/UserDetails/UserEdit";
import UserDetails from "./Component/UserDetails/UserDetails";
import UserDelete from "./Component/UserActions/UserDelete";
import Addtodo from "./Component/Todolist/Addtodo";
import UserTodo from "./Component/Todolist/UserTodo";
import UserDashboard from "./Component/Todolist/UserDashboard";
import TodoAnalytics from "./Component/Todolist/TodoAnalytics";
import EditTodo from "./Component/Todolist/EditTodo";
import UserHomePage from "./Component/Todolist/UserHomePage";
import UserCreateTodo from "./Component/Todolist/UserCreateTodo";
import Header from "./Component/Header/Header";
const App = () => {
  return (
    <div>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/posts" element={<UserPost />} />
          <Route path="/posts/createpost" element={<UserCreatePost />} />
          <Route path="/posts/userdetails" element={<UserDetails />} />
          <Route path="/posts/userdetails/useredit" element={<UserEdit />} />
          <Route path="/posts/userdetails/userdelete" element={<UserDelete />}/>
        
          <Route path="/posts/userdetails" element={<UserDetails />} />
          <Route path="/todo/createtodo" element={<UserCreateTodo />} />
          <Route path="/usertodo" element={<UserTodo />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/home" element={<UserHomePage />} />
          <Route path="/todo/analytics" element={<TodoAnalytics />} />
          <Route path="/todo/edit/:id" element={<EditTodo />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
