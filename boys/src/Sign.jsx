import { useState, useEffect } from "react";
import "./sign.css";

export default function Sign() {
  const [isNewUser, setIsNewUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(""); // State for username (new user)

  // Check if the user is already signed in by checking localStorage
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsNewUser(false); // User is already signed in
    }
  }, []);

  const handleSignIn = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const user = { email, password };

    try {
      setLoading(true);
      setError(""); // Clear previous error

      // Simulate sign-in request
      const signInResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!signInResponse.ok) {
        throw new Error("Sign-in failed. Please check your credentials.");
      }

      const userDetails = await signInResponse.json();
      localStorage.setItem("user", JSON.stringify(userDetails));

      setIsNewUser(false);
      setLoading(false);
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;
    const user = { email, password, username };

    try {
      setLoading(true);
      setError(""); // Clear previous error

      const signUpResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!signUpResponse.ok) {
        throw new Error("Sign-up failed. Please try again.");
      }

      const userDetails = await signUpResponse.json();
      localStorage.setItem("user", JSON.stringify(userDetails));

      setIsNewUser(false);
      setLoading(false);
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isNewUser) {
    const userData = JSON.parse(localStorage.getItem("user"));

    return (
      <div className="container">
        <div className="card">
          <h2 className="title">Welcome back, {userData.username}!</h2>
          <p>{userData.message || "Enjoy using the app!"}</p>

          {/* Instagram Link, Email, and Future Plans */}
          <div className="footer-section">
            <div className="future-plans">
              <h3>Future Plans for the App:</h3>
              <p>I plan to add a shopsection for some products</p>
              <p>make the ui even better</p>
              <p>most importantly you will not be redirected to some other site for the movie</p>
              <p>and the finance page will have more features including a some way to pay</p>
              <p>the talk section needs more improvement too !</p>
              <p>your advise is welcomed and very much needed for, suggestions my contacts links are down there</p>
            </div>
            <div className="contact-info">
              <h3>Contact Info:</h3>
              <p>📸 Instagram: <a href="https://instagram.com/suvvy_max" target="_blank" rel="noopener noreferrer">My insta</a></p>
              <p>📧 Email: <a href="mxmu025@gmail.com">email me</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">{isNewUser ? "Sign in" : "Create an account"}</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={isNewUser ? handleSignIn : handleSignUp} className="form">
          <div className="form-group">
            <label htmlFor="email" className="label">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="example@email.com"
              className="input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="********"
              className="input"
            />
          </div>

          {isNewUser && (
            <div className="form-group">
              <label htmlFor="username" className="label">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="input"
              />
            </div>
          )}

          <button type="submit" className="btn">{isNewUser ? "Sign in" : "Sign up"}</button>
        </form>

        <p className="signup-text">
          {isNewUser ? (
            <>
              Don’t have an account? <a href="#" onClick={() => setIsNewUser(false)} className="signup-link">Sign up</a>
            </>
          ) : (
            <>
              Already have an account? <a href="#" onClick={() => setIsNewUser(true)} className="signup-link">Sign in</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
