import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { revertSubscriptions } from './Reducers/SubscriptionSlice';
import { revertMembers } from './Reducers/MemberSlice';
import { revertMovies } from './Reducers/MovieSlice';
import { revertUsers } from './Reducers/UserSlice';


// Main menu of the app

function MenuPageComp() {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // If logout button is pressed, remove all user's parameters and all data from redux states
  const logout = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('permissions');
    sessionStorage.removeItem('token');
    dispatch(revertUsers());
    dispatch(revertMembers());
    dispatch(revertMovies());
    dispatch(revertSubscriptions());
    navigate('/login');
  };


  return (
    <div className="App" style={ {width: "600px"} }>
      {
        sessionStorage.getItem('permissions').includes("View Movies") &&
        <input type="button" value="Movies" onClick={() => navigate('/movies')} />
      }
      {
        sessionStorage.getItem('permissions').includes("View Members") &&
        <input type="button" value="Members" onClick={() => navigate('/members')} />
      }
      { sessionStorage.getItem('username')==="admin" && 
        <input type="button" value="User Management" onClick={() => navigate('/users')} />
      }
      <br/><br/>
      <input type="button" value="Log Out" onClick={() => logout()} />
    </div>
  );
};

export default MenuPageComp;
