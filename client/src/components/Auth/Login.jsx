import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const readValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log("user =", user);
      await axios
        .post(`/api/v1/auth/login`, user)
        .then((res) => {
          // console.log("token =", res.data);
          toast.success("Successfully Login");
          localStorage.setItem("loginToken", res.data.token);
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("id", res.data.user.userId);
          navigate("/");
          window.location.href = "/";
        })
        .catch((err) => toast.error(err.response.data.msg));
    } catch (err) {
      throw err.message;
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="display-3 text-center mt-3">Login</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5">
            <div className="card-body">
              <form onSubmit={submitHandler} autoComplete="off">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="form-control"
                    onChange={readValue}
                    value={user.email}
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    onChange={readValue}
                    value={user.password}
                  />
                </div>
                <button className="btn btn-outline-success mt-3">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
