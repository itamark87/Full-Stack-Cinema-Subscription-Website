import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";


// Login page

function LoginPageComp(props) {
  
  const [creds, setCreds] = useState({username: "", password: ""});
  
  const navigate = useNavigate();


  // If all of [user, permissions, token] parameters exist, movie to menu
  useEffect(() => {
    let user = sessionStorage.getItem('username');
    let permissions = sessionStorage.getItem('permissions');
    let token = sessionStorage.getItem('token');
    if (user && permissions && token) {
      navigate('/menu');
    };
  }, []);
  

  const quickLogin = (user, pass) => {
    setCreds({username: user, password: pass});
  };
  

  const fillCredentials = (key) => {
    setCreds({username: key, password: key + "1234"});
  };


  return (
    <div className="App" style={ {width: "600px"} }>
      <h2>Login Page</h2>
      <input type="text" value={creds.username} placeholder="Username" onChange={e => setCreds({...creds, username: e.target.value})} /> <br/>
      <input type="text" value={creds.password} placeholder="Password" onChange={e => setCreds({...creds, password: e.target.value})} /> <br/>
      <input type="button" value="Login" onClick={() => props.loginFunc("login", creds)} /> <br/>
      New User?  <Link to={"/create/"}>Create Account</Link><br/><br/>
      Test version. Click below to auto fill credetials for different permissions access:<br/>
      <input type="button" value="Admin" onClick={() => quickLogin("admin", "admin1234")} /> <br/>
      <input type="button" value="Movies Only" onClick={() => quickLogin("0_vcdu", "0_vcdu")} /> <br/>
      <input type="button" value="Members Only" onClick={() => quickLogin("vcdu_0", "vcdu_0")} /> <br/>
    </div>
  );
};

export default LoginPageComp;
