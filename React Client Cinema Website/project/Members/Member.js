import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMember } from '../Reducers/MemberSlice';
import { deleteSubscription } from '../Reducers/SubscriptionSlice';
import MoviesWatchedComp from "./MoviesWatched";
import { v4 as uuidv4 } from 'uuid';


// Individual member component

function MemberComp(props) {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const subSelector = useSelector(state => state.subscriptions);


  // Delete a member and his/her subscriptions
  const deleteMemberAndFetch = () => {
    if (!subSelector) {
      alert("Cannot apply action because data was not loaded properly");
      return;
    }
    dispatch(deleteMember(props.propsData._id));
    subSelector.forEach(sub => {
      if (sub.member_id === props.propsData._id) {
        dispatch(deleteSubscription(sub._id));
      }
    })
    props.callBack();
  };


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h3>{props.propsData.name}</h3>
      Email: {props.propsData.email} <br/>
      City: {props.propsData.city} <br/><br/>
      {
        props.perms.includes('View Members') && 
        <div>
          <MoviesWatchedComp key={uuidv4()} propsData={props.propsData._id} />
          <br/>
        </div>
      }
      {
        props.perms.includes('Update Members') &&
        <input type="button" value="Edit" onClick={() => navigate('/member/edit/' + props.propsData._id)} />
      }
      {
        props.perms.includes('Delete Members') &&
        <input type="button" value="Delete" onClick={() => deleteMemberAndFetch()}/>
      }
      {
        (props.perms.includes('Update Members') || props.perms.includes('Delete Members')) 
        && <div><br/></div> 
      }    
    </div>
  );
};

export default MemberComp;
