import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import AddMemberPageComp from "./AddMemberPage";
import AllMembersComp from "./AllMembers";


// The global page for members department

function MembersPageComp() {
  
  const navigate = useNavigate();
  
  const params = useParams();
  
  const [showMembers, setShowMembers] = useState(true);
  
  
  return (
    <div className="App" style={ {width: "600px"} }>
      <h2>Manage Members</h2>
      <input type="button" value="Menu" onClick={() => navigate("/menu")} />
      <input type="button" value="All Members" onClick={() => setShowMembers(true)} />
      {
        sessionStorage.getItem('permissions').includes('Create Members') &&
        <input type="button" value="Add Member" onClick={() => setShowMembers(false)} />
      }
      <br/><br/>
      {
        showMembers && <AllMembersComp propsData={params}/>
      }
      {
        !showMembers && <AddMemberPageComp callBack={() => setShowMembers(true)}/>
      }
    </div>
  );
};

export default MembersPageComp;
