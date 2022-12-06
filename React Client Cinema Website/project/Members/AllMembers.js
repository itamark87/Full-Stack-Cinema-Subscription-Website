import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import MemberComp from "./Member";


// Parent to all individual member components, providing each with specific member information via props

function AllMembersComp(props) {

  const [members, setMembers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const memberSelector = useSelector(state => state.members);

  
  const searchMember = (val) => {
    setSearchValue(val);
    if (val && memberSelector && memberSelector.length > 0) {
      let filtered_members = memberSelector.filter(member => member.name.toLowerCase().includes(val));
      setMembers(filtered_members);
    } else {
      setMembers([]);
    }
  };


  // If an ID is given through the URL, find the specific member with the ID and show it only
  useEffect(() => {
    if ("id" in props.propsData && memberSelector && memberSelector.length > 0) {
      let member_from_url = memberSelector.filter(member => member._id === props.propsData.id);
      if (Object.keys(member_from_url).length > 0) {
        setMembers(member_from_url);
        setSearchValue(member_from_url[0].name);
      } else {
        searchMember("");
      }
    }
  }, [memberSelector]);


  return (
    <div className="App" style={ {width: "600px"} }>
      {'Search: '}
      <input type="text" value={searchValue} onChange={e => searchMember(e.target.value)} />
      <input type="button" value="X" onClick={() => searchMember("")} /> <br/> <br/>
      {
        members.length === 0 && memberSelector && memberSelector.length > 0 && memberSelector.map(member =>
          {
            return <MemberComp propsData={member} perms={sessionStorage.getItem('permissions')} callBack={() => searchMember("")} key={member._id} />
          })
      }
      {
        members.length > 0 && members.map(member =>
          {
            return <MemberComp propsData={member} perms={sessionStorage.getItem('permissions')} callBack={() => searchMember("")} key={member._id} />
          })
      }
      <br/>
      <input type="button" value="Back to Top" onClick={() => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})} />
      <br/><br/>
    </div>
  );
};

export default AllMembersComp;
