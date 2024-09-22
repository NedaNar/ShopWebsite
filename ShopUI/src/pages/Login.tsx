import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container" style={{ margin: "4.8rem auto 6.4rem" }}>
      <h3 className="center-align">Login</h3>
      <div className="row">
        <form className="col s12" onSubmit={() => {}}>
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
            >
              Login
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
          <strong>Don't have an account yet?</strong>
        </p>
        <a href="/signup" className="btn teal lighten-2">
          Sign up
        </a>
      </div>
    </div>
  );
};

export default Login;
