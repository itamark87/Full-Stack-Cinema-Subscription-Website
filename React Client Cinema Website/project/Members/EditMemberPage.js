import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateMember } from '../Reducers/MemberSlice';


// Edit member details page

function EditMemberPageComp() {

  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const memberSelector = useSelector(state => state.members);

  const [member, setMember] = useState({});


  const updateMemberAndReturn = () => {
    dispatch(updateMember(member));
    navigate('/members');
  }


  // Check user has permission to update members
  useEffect(() => {
    if (!sessionStorage.getItem('permissions').includes("Update Members")) {
      navigate('/members');
    }
    if (memberSelector && memberSelector.length > 0) {
      let tempMember = memberSelector.filter(member => member._id === params.id);
      setMember(tempMember[0]);
    }
  }, [memberSelector]);


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h2>Edit Member: {member.name}</h2>
      {'Name: '}
      <input type="text" value={member.name} onChange={e => setMember({...member, name: e.target.value})} /> <br/> 
      {'Email: '}
      <input type="text" value={member.email} onChange={e => setMember({...member, email: e.target.value})} /> <br/>
      {'City: '}
      <input type="text" value={member.city} onChange={e => setMember({...member, city: e.target.value})} /> <br/>
      <input type="button" value="Update" onClick={() => updateMemberAndReturn()} />
      <input type="button" value="Cancel" onClick={() => navigate('/members')} /> <br/>
    </div>
  );
};

export default EditMemberPageComp;
