import { useState } from "react";
import { useNavigate } from "react-router-dom";


// Create an account page

function CreateAccountComp(props) {
  
  const [creds, setCreds] = useState({username: "", password: ""});
  
  const navigate = useNavigate();


  return (
    <div className="App" style={ {width: "600px"} }>
      <h2>Create An Account</h2>
      <input type="text" value={creds.username} placeholder="Username" onChange={e => setCreds({...creds, username: e.target.value})} /> <br/>
      <input type="text" value={creds.password} placeholder="Password" onChange={e => setCreds({...creds, password: e.target.value})} /> <br/><br/>
      <input type="button" value="Create" onClick={() => props.createFunc("create", creds)} />
      <input type="button" value="Cancel" onClick={() => navigate("/login")} />
    </div>
  );
};

export default CreateAccountComp;
