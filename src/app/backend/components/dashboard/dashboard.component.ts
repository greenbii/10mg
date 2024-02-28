import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartComponent } from 'angular2-chartjs';
import { AppService } from 'src/app/services/app.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  //@ViewChild(BaseChartDirective) private _chart;
  @ViewChild("myChart") myChart! : ChartComponent

  chart_category = 'revenue';
  chart_period = 'monthly';

  headings = [
    {key: "loan", label: "Loans"},
    {key: "revenue", label: "Revenues"},
    {key: "order", label: "Orders"},
    {key: "healthcare", label: "Healthcare Providers"}
  ]

  selected_filter_item: string = 'revenue';
  selected_filter_period: string = 'monthly';
  is_loading_chart_data: boolean = false;

  supplier = {
    income: 0,
    quantity_sold: 0,
    orders: 0,
    expiring_licences: 0
  }

  orders = {
    total_orders: 35,
    shipped: 21,
    unshipped: 14
  }

  summary: any = null;

  type = 'line';
  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    datasets: [
      // {
      //   label: "App Installations",
      //   data: [0, 0, 0, 0, 0, 0, 0, 0,0,0,0,0,0],
      //   borderColor: 'rgb(75, 192, 192)'
      // },
      {
        label: "Revenue",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0,0,0,0]   ,
        borderColor: 'rgb(0, 0, 255)',
        borderWidth: 2
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };
  constructor(private route: ActivatedRoute, private appService: AppService) { }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    //console.log(this.myChart.data);
  }

  ngOnInit(): void {
    const dt: any = this.route.snapshot.data;

    if(dt.summary) {
      this.summary = dt.summary;

      //get total orders 
      //this.orders.total_orders = this.summary.total_orders.length;

      //this.orders.shipped = this.summary.total_orders.filter((f:any)=> f.status.toLowerCase() === "unshipped" || f.status.toLowerCase() === "paid").length;

      //this.orders.shipped = this.summary.total_orders.filter((f: any)=> f.status.toLowerCase() === "shipped").length;

    }

  }

  async smart() {
    try {
      const token = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('get', '/admin', undefined, token).toPromise();
      console.log(rs);
    }
    catch(e) {
      console.log(e);
    }
  }

  async getChartData() {
    try {
    //this should enable the user to get the chart data
      this.is_loading_chart_data = true;
      const t = await this.appService.getCurrentUserToken();
      const rs = await this.appService.initiateHttpRequest('get', '/admin/analytics/filter?category='+this.chart_category+"&period="+this.chart_period, undefined, t).toPromise();
      this.is_loading_chart_data = false;
      if(rs?.status === true) {
        //handle the display of the record here
        const heading = (this.chart_period === 'monthly') ? ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] : ['2021', '2022', '2023'];
        if(this.myChart) {
          this.myChart.data.labels = heading;
          this.myChart.data.datasets[0].label = this.chart_category+"("+this.chart_period+")";
          this.myChart.data.datasets[0].data = rs.data;
          this.myChart.chart.update();
        }

      }
      else {
        throw rs?.message;
      }
    }
    catch(ee) {
      console.log(ee);
      this.is_loading_chart_data = false;
    }
  }

}
