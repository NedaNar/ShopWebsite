import { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router";
import { toastError } from "../utils/toastUtils";

const Signup = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signUp(username, email, password);
      navigate("/");
    } catch (err: any) {
      toastError(err.message);
    }
  };

  return (
    <div className="container" style={{ margin: "4.8rem auto 6.4rem" }}>
      <h3 className="center-align">Sign Up</h3>
      <div className="row">
        <form className="col s12" onSubmit={() => {}}>
          <div className="input-field col s12">
            <input
              id="username"
              className="validate"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-field col s12">
            <input
              id="email"
              type="email"
              className="validate"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-field col s12">
            <input
              id="password"
              type="password"
              className="validate"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>
          <div className="input-field col s12">
            <button
              className="btn-large waves-effect waves-light"
              type="submit"
              disabled={!username || !email || !password}
              onClick={handleSignUp}
            >
              Sign up
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
      <div
        className="teal lighten-5"
        style={{
          margin: "3.6rem 0 0",
          padding: "0.8rem 0 1.6rem",
          borderRadius: "1.2rem",
        }}
      >
        <p style={{ fontSize: "1.2rem" }}>
          <strong>Already have an account?</strong>
        </p>
        <a href="/login" className="btn teal lighten-2">
          Login
        </a>
      </div>
    </div>
  );
};

export default Signup;
