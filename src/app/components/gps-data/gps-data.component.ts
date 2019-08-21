import { ActivityRecord } from './../../models/activity-record.model';
import { GpsService } from './../../services/gps/gps-service';
import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
	selector: 'app-gps-data',
	templateUrl: './gps-data.component.html',
	styleUrls: ['./gps-data.component.scss']
})
export class GpsDataComponent implements OnInit {
	private gpsData: ActivityRecord[] = [];

	public objectKeys = Object.keys;
	public toggleData = {
		show100m: true,
		show500m: true,
		show1k: true,
		show5k: true,
		show10k: true,
	};
	public startDate = new Date(2014, 1, 1);
	public endDate = new Date();

	public lineChartData: ChartDataSets[] = [];
	public lineChartLabels: Label[] = [];
	public lineChartOptions: ChartOptions = {
		responsive: true,
		spanGaps: true,
		scales: {
			yAxes: [
				{
					ticks: {
						callback: (v) => this.formatSecsAsMins(v),
						stepSize: 300
					}
				}
			]
		},
		tooltips: {
			callbacks: {
				label: (item, data) => this.formatSecsAsMins(item.value)
			}
		}
	};

	private subscribe = true;

	constructor(private gpsService: GpsService) { }

	ngOnInit() {
		this.gpsService.getGpsData();
		this.gpsService.gpsData$.pipe(takeWhile(() => this.subscribe)).subscribe(gpsData => {
			this.gpsData = gpsData;
			this.populateChart();
		});
	}

	public populateChart(): void {
		const gpsData = this.gpsData.filter(data => {
			const date = Date.parse(data.dateTime);
			return date >= this.startDate.getTime() && date <= this.endDate.getTime();
		});


		this.lineChartData = [

		];

		if (this.toggleData.show100m) {
			this.lineChartData.push({ data: gpsData.map(record => record.time100M), label: '100M' });
		}
		if (this.toggleData.show500m) {
			this.lineChartData.push({ data: gpsData.map(record => record.time500M), label: '500M' });
		}
		if (this.toggleData.show1k) {
			this.lineChartData.push({ data: gpsData.map(record => record.time1K), label: '1K' });
		}
		if (this.toggleData.show5k) {
			this.lineChartData.push({ data: gpsData.map(record => record.time5K), label: '5K' });
		}
		if (this.toggleData.show10k) {
			this.lineChartData.push({ data: gpsData.map(record => record.time10K), label: '10K' });
		}

		this.lineChartLabels = gpsData.map(record => record.dateTime.toString());
	}

	public getDate(event: string): Date {
		return new Date(event);
	}

	private formatSecsAsMins(v: number | string): string {
		v = parseFloat(v.toString());
		const mins = Math.floor(v / 60);
		const secs = v % 60;
		const secsPrefix = secs < 10 ? '0' : '';
		return `${mins}:${secsPrefix}${secs}`;
	}
}
