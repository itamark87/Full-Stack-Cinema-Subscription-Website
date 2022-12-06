import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { addNewMember } from '../Reducers/MemberSlice';


// Add a new member page component

function AddMemberPageComp(props) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [member, setMember] = useState({name: '', email: '', city: ''});


  const addMemberAndReturn = () => {
    dispatch(addNewMember(member));
    props.callBack();
  };


  // Check user has permission to create members
  useEffect(() => {
    if (!sessionStorage.getItem('permissions').includes("Create Members")) {
      navigate('/members');
    }
  }, []);


  return (
    <div className="App" style={ {width: "600px", border: "solid"} }>
      <h2>Add New Member</h2>
      {'Name: '}
      <input type="text" value={member.name} onChange={e => setMember({...member, name: e.target.value})} /> <br/> 
      {'City: '}
      <input type="text" value={member.city} onChange={e => setMember({...member, city: e.target.value})} /> <br/> 
      {'Email: '}
      <input type="text" value={member.email} onChange={e => setMember({...member, email: e.target.value})} /> <br/><br/>
      <input type="button" value="Save" onClick={() => addMemberAndReturn()} />
      <input type="button" value="Cancel" onClick={() => props.callBack()} /> <br/><br/>
    </div>
  );
};

export default AddMemberPageComp;
