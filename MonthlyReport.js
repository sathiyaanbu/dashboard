  import React, {Component} from 'react';
  import  { Line } from 'react-chartjs-2';
  import '../App.css';

  class MonthlyReport extends Component{
    constructor (props){
     super(props);
     this.state = {
      monthlytData : []

      }

  }


  componentWillMount(){

    this.getMonthlyData();
  }

static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        year:'2017'

      }

  getMonthlyData(){
      // Ajax calls here
      this.setState({
        monthlyData:{
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','July','Aug','Sep','Oct'],
          
          datasets:[
          {
                     label:'Users',
                      data:[18,23,23,21,23,12,21,33,80,121],
           backgroundColor:'rgba(74, 462, 35, 0.2)'

          }
          ]
        }
      });
    }

    render(){

     return (
       <div className = "MonthlyReport">

       <Line data = {this.state.monthlyData}

       options  = { {
         title : {
            display: this.props.displayTitle,
              text : 'Monthly report in ' + this.props.year,
          fontSize : 25
        },

        legend : {
          display : this.props.displayLegend,
          position : this.props.legendPosition
        }

      }}
      legendPosition="bottom"

      />
      </div>

      )
    }

  }

  export default MonthlyReport;


