import {Link} from 'react-router-dom';


// Show members subscribed to specific movie

function MovieSubsPageComp(props) {

  
  return (
    <div className="App" style={ {left: "50%", transform: "translateX(-50%)", width: "350px", border: "solid", position: "relative" } }>
      { props.propsData.length > 0 && <h3>Subscriptions</h3> }
      { props.propsData.length === 0 && <h3>No Subscriptions Yet</h3> }
      {
        sessionStorage.getItem('permissions').includes('View Members') && props.propsData.map(sub => {
          return <li key={sub.member_id}><Link to={"/member/" + sub.member_id}>{sub.name}</Link>, Date: {sub.date}</li>
        })
      }
      {
        !sessionStorage.getItem('permissions').includes('View Members') && props.propsData.map(sub => {
          return <li key={sub.member_id}>{sub.name}, Date: {sub.date}</li>
        })
      }
      {
        props.propsData.length > 0 && <br/>
      }
    </div>
  );
};

export default MovieSubsPageComp;
