import { Component, Input } from '@angular/core';
import { CurrenciesService } from './../../services/currencies.service';
import * as Highcharts from 'highcharts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  @Input()
  baseCurrency!: string;

  @Input()
  counterCurrency!: string;

  constructor(private currenciesService: CurrenciesService) { }

  Highcharts: typeof Highcharts = Highcharts;
  public chartOptions: any = {
    plotOptions: {
      series: {
          threshold: null
      }
    },
    chart: {
      plotBorderWidth: 1,
      type: 'area',
    },
    colors: ['#cd0863'],
    title: {
      text: null
    },
    series: [{
      showInLegend: false,
      data: [],
 
    }],
    xAxis:{
      categories:[],
      gridLineWidth: 1,
    },
    yAxis: {
      title: {
          text: null
      }
    },
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false
    },
  };

  ngOnChanges() {
    this.currenciesService.loadCurrencies(this.baseCurrency, this.counterCurrency)
      .subscribe((data) => {
        let rates = data.rates;

        let dateValues = Object.keys(rates).map((key) => {
          let datePipe = new DatePipe('en-US');

          const [year, month, day] = key.split('-');

          return datePipe.transform(new Date(+year, +month - 1, +day),"dd MMM")
        });

        let rateValues = Object.keys(rates).map((key) => rates[key as any][this.counterCurrency]);

        this.chartOptions.xAxis.categories = dateValues;
        this.chartOptions.series[0].data = rateValues;

        Highcharts.chart('container', this.chartOptions);
      }
    );
  }
}
