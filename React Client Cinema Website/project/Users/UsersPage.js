import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import AddUserPageComp from "./AddUserPage";
import {useParams} from 'react-router-dom';
import AllUsersComp from "./AllUsers";


// The global page for users department

function UsersPageComp() {
  
  const navigate = useNavigate();

  const params = useParams();

  const [showUsers, setShowUsers] = useState(true)


  // Check user is an admin
  useEffect(() => {
    if (!sessionStorage.getItem('username') === "admin") {
      navigate('/menu')
    }
  }, [])

  
  return (
    <div className="App" style={ {width: "600px"} }>
      <h2>Manage Users</h2>
      <input type="button" value="Menu" onClick={() => navigate("/menu")} />
      <input type="button" value="All Users" onClick={() => setShowUsers(true)} />
      <input type="button" value="Add User" onClick={() => setShowUsers(false)} />
      <br/><br/>
      {
        showUsers && <AllUsersComp propsData={params}/>
      }
      {
        !showUsers && <AddUserPageComp callBack={() => setShowUsers(true)}/>
      }
    </div>
  );
}

export default UsersPageComp;
