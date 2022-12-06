import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
import { addNewUser } from '../Reducers/UserSlice'


// Add a new member page component

function AddUserPageComp(props) {

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const currDate = new Date().toLocaleDateString();

  const [user, setUser] = useState({fname: '', lname: '', username: '', session_timeout: 0, permissions: [], creation_date: currDate});

  const allPermissionsPossible = ["View Members", "Create Members", "Delete Members", "Update Members", "View Movies", "Create Movies", "Delete Movies", "Update Movies"]


  // Handle changes in permission checkboxes, update user accordingly
  const handleChange = (e) => {
    const isChecked = e.target.checked
    const value = e.target.value
    let permissions = user.permissions;
    const moviePermissions = ["Create Movies", "Delete Movies", "Update Movies"]
    const membersPermissions = ["Create Members", "Delete Members", "Update Members"]
    if (isChecked && !permissions.includes(value)) {
      permissions.push(value)
      if (moviePermissions.includes(value) && !permissions.includes("View Movies")) {
        permissions.push("View Movies");
      } else if (membersPermissions.includes(value) && !permissions.includes("View Members")) {
        permissions.push("View Members");
      }
    } else if (!isChecked && permissions.includes(value)) {
      if (value === "View Movies") {
        const contains = permissions.some(perm => {
          return moviePermissions.includes(perm);
        });
        if (contains) {
          alert("Cannot remove 'View Movies' if other movies actions are permitted")
          return
        }
      } else if (value === "View Members") {
        const contains = permissions.some(perm => {
          return membersPermissions.includes(perm);
        });
        if (contains) {
          alert("Cannot remove 'View Members' if other members actions are permitted")
          return
        }
      }
      permissions = permissions.filter(perm => perm !== value)
    }
    setUser({...user, permissions: permissions})
  }


  const addUserAndReturn = () => {
    dispatch(addNewUser(user))
    props.callBack()
  }


  // Check user is an admin
  useEffect(() => {
    if (!sessionStorage.getItem('username') === "admin") {
      navigate('/menu')
    }
  }, [])


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h2>Add New User</h2>
      {'First Name: '}
      <input type="text" value={user.fname} onChange={e => setUser({...user, fname: e.target.value})} /> <br/> 
      {'Last Name: '}
      <input type="text" value={user.lname} onChange={e => setUser({...user, lname: e.target.value})} /> <br/> 
      {'Username: '}
      <input type="text" value={user.username} onChange={e => setUser({...user, username: e.target.value})} /> <br/>
      {'Session Timeout (Minutes): '}
      <input type="text" value={user.session_timeout} onChange={e => setUser({...user, session_timeout: e.target.value})} /> <br/>
      {'Permissions: '}
      {Object.keys(user).length > 0 && allPermissionsPossible.map((perm, index) => (
        <div key={index}>
          <input value={perm} checked={user.permissions.includes(perm)} onChange={(e) => handleChange(e)} type="checkbox" />
          <span>{perm}</span>
        </div>
      ))}<br/>
      <input type="button" value="Save" onClick={() => addUserAndReturn()} />
      <input type="button" value="Cancel" onClick={() => props.callBack()} /> <br/><br/>
    </div>
  );
}

export default AddUserPageComp;
