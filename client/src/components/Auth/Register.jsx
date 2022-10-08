import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
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
        .post(`/api/v1/auth/register`, user)
        .then((res) => {
          toast.success("User register successfully");
          navigate(`/`);
        })
        .catch((err) => console.log(err.response.data.msg));
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h3 className="display-3 text-center mt-3">Register</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mt-5">
            <div className="card-body">
              <form onSubmit={submitHandler} autoComplete="off">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="form-control"
                    onChange={readValue}
                    value={user.name}
                  />
                </div>
                <div className="form-group mt-3">
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
                  <label htmlFor="mobile">Mobile No.</label>
                  <input
                    type="number"
                    name="mobile"
                    id="mobile"
                    className="form-control"
                    onChange={readValue}
                    value={user.mobile}
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
                <button className="btn btn-outline-success mt-3">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
