import React, {Component} from 'react';
import  {Bar, Line} from 'react-chartjs-2';
import BarChart from './BarChart';
import MonthlyReport from './MonthlyReport';
import { Tab,Row,Col,Nav,NavItem } from 'react-bootstrap';
import  '../App.css';



class Dashboard extends Component{

  constructor(props){
    super(props);
    this.state = { 
      userAccount_created: [],
      active_users_count  :"",
      message_count : "",
      chartData:[],
      monthlyData :[]

    };

  }


  componentDidMount(){
   fetch('http://localhost:8778/api/totalUserCount')
   .then(result => {
    return result.json();
  });
 } 
 render(){
  const {userAccount_created} = this.state;
  return (
   <div className ="Dashboard">
   <h1 className="title">Onerva dashboard </h1>
   <div className= "container">

   <div>
   <h1 className ="Accounts">Total Accounts</h1>
   <div className="ac_count"><p >{this.state.userAccount_created} </p></div>
   </div>

   <div>
   <h1 className ="Active">Active Accounts</h1> 
   <div className="active_count" ><p >{this.state.active_users_count}56</p></div> 
   </div>
   
   <div>
   <h1 className ="Msg"> Messages</h1>
   <div className="msg_count"><p >{this.state.message_count}67</p></div>
   </div>

   </div>

   <Tab.Container id="left-tabs-example" defaultActiveKey="first">
   <Row className="clearfix">
   <Col sm={3}>
   <div  className = "outer_SideBox">
   <Nav bsStyle="pills" stacked>
   <NavItem eventKey="first">
   month
   </NavItem>
   <NavItem eventKey="second">
   year
   </NavItem>
   <NavItem eventKey="third">
   Home
   </NavItem>
   </Nav>
   </div>
   </Col>
   <Col sm={9}>
   <Tab.Content animation>
   <Tab.Pane eventKey="first">
   <BarChart />
   </Tab.Pane>
   <Tab.Pane eventKey="second">
   <MonthlyReport />
   </Tab.Pane>
   <Tab.Pane eventKey="third">
   <MonthlyReport />
   </Tab.Pane>
   </Tab.Content>
   </Col>
   </Row>
   </Tab.Container>


   </div>


   );           
}

}




export default Dashboard;


