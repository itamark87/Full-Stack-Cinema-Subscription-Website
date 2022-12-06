import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteUser } from '../Reducers/UserSlice'


// Individual user component

function UserComp(props) {

  const navigate = useNavigate();
  const dispatch = useDispatch()


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h4>Name: {props.propsData.fname + " " + props.propsData.lname}</h4>
      Username: {props.propsData.username} <br/>
      Session Timeout (Minutes): {props.propsData.session_timeout} <br/>
      Creation Date: {props.propsData.creation_date} <br/>
      Permissions: {props.propsData.permissions.join(", ")} <br/><br/>
      <input type="button" value="Edit" onClick={() => navigate('/user/edit/' + props.propsData._id)} />
      <input type="button" value="Delete" onClick={() => dispatch(deleteUser(props.propsData._id))
      } /><br/><br/>
    </div>
  );
}

export default UserComp;
