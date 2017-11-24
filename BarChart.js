
    import React, {Component} from 'react';
    import  {Bar} from 'react-chartjs-2';
    import '../App.css';


    class BarChart extends Component{
      constructor (){
        super();
        this.state = {
          chartData : []     
      }
    }
    componentWillMount(){

    this.getChartData();
    
  }

        static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        year:'2017'

      }
  getChartData(){
    // Ajax calls here
    this.setState({
      chartData:{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June','July','Aug','Sep','Oct'],
        datasets:[
          {
           
            data:[42,109,93,79,67,33,92,126,411,702],
              label:'Activities',
            backgroundColor:
              'rgba(54, 162, 335, 0.5)'
          }
        ]
      }
    });
  }

      render(){

        return (
          <div className = "chart">

          <Bar 
          data ={this.state.chartData}

          options={{
            title : {
             display: this.props.displayTitle,
             text : 'Number of activities in  ' + this.props.year,
             fontSize : 25
           },
           legend : {
             display : this.props.displayLegend,
             position : this.props.legendPosition
           }

         }}

         legendPosition="top"

         />
         </div>

         )
       }
     }

     export default BarChart;


