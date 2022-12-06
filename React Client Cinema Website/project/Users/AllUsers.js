import { useState } from "react";
import UserComp from "./User";
import { useSelector } from 'react-redux'


// Parent to all individual user components, providing each with specific user information via props

function AllUsersComp() {

  const [users, setUsers] = useState([]);

  const usersSelector = useSelector(state => state.users)


  const searchUser = (val) => {
    if (val && usersSelector && usersSelector.length > 0) {
      let filtered_users = usersSelector.filter(user => user.fname.toLowerCase().includes(val) || user.lname.toLowerCase().includes(val))
      setUsers(filtered_users)
    } else {
      setUsers([]) 
    }
  }


  return (
    <div className="App" style={ {width: "600px"} }>
      {'Search: '}<input type="text" onChange={e => searchUser(e.target.value)} />
      <input type="button" value="X" onClick={() => searchUser("")} /> <br/> <br/>
      {
        users.length === 0 && usersSelector && usersSelector.length > 0 && usersSelector.map(user =>
          {
            return <UserComp propsData={user} key={user._id} />
          })
      }
      {
        users.length > 0 && users.map(user =>
          {
            return <UserComp propsData={user} key={user._id} />
          })
      }
      <br/>
      <input type="button" value="Back to Top" onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} />
      <br/><br/>
    </div>
  );
}

export default AllUsersComp;
