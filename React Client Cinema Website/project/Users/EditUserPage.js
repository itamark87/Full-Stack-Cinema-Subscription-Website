import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../Reducers/UserSlice'


// Edit user details page

function EditUserPageComp() {

  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch()

  const userSelector = useSelector(state => state.users)

  const [user, setUser] = useState({});

  const allPermissionsPossible = ["View Members", "Create Members", "Delete Members", "Update Members", "View Movies", "Create Movies", "Delete Movies", "Update Movies"]


  // Handle changes in permission checkboxes, update user accordingly
  const handleChange = (e) => {
    const isChecked = e.target.checked
    const value = e.target.value
    let permissions = [...user.permissions];
    if (isChecked && !permissions.includes(value)) {
      permissions.push(value)
      const moviePermissions = ["Create Movies", "Delete Movies", "Update Movies"]
      const membersPermissions = ["Create Members", "Delete Members", "Update Members"]
      if (moviePermissions.includes(value) && !permissions.includes("View Movies")) {
        permissions.push("View Movies");
      } else if (membersPermissions.includes(value) && !permissions.includes("View Members")) {
        permissions.push("View Members");
      }
    } else if (!isChecked && permissions.includes(value)) {
      permissions = permissions.filter(perm => perm !== value)
    }
    setUser({...user, permissions: permissions})
  }


  const updateUserAndReturn = () => {
    dispatch(updateUser(user))
    navigate('/users')
  }


  // Check user is an admin
  useEffect(() => {
    if (!sessionStorage.getItem('username') === "admin") {
      navigate('/menu')
    }
    if (userSelector && userSelector.length > 0) {
      let tempUser = userSelector.filter(user => user._id === params.id)
      setUser(tempUser[0])
    }
  }, [userSelector])


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h2>Edit User: {user.username}</h2>
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
          <input value={perm} checked={Object.keys(user).length > 0 && 'permissions' in user && user.permissions.includes(perm)} onChange={(e) => handleChange(e)} type="checkbox" />
          <span>{perm}</span>
        </div>
        ))}
        <br/>
        <input type="button" value="Update" onClick={() => updateUserAndReturn()} />
        <input type="button" value="Cancel" onClick={() => navigate('/users')} /> <br/><br/>
    </div>
  );
}

export default EditUserPageComp;
