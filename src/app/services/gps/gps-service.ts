import { ActivityRecord } from '../../models/activity-record.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class GpsService {
	private apiUrl = environment.apiUrl;

	public gpsData$ = new BehaviorSubject<ActivityRecord[]>([]);

	constructor(private http: HttpClient) {
	}

	public getGpsData(): void {
		const params = new HttpParams();
		this.http.get<ActivityRecord[]>(`${this.apiUrl}Gps/GetGpsData`, { params })
			.subscribe(data => {
				this.gpsData$.next(data);
				console.log('Gps data:', data);
			}, error => console.error(error));
	}
}
