import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpsDataComponent } from './gps-data.component';

describe('GpsDataComponent', () => {
	let component: GpsDataComponent;
	let fixture: ComponentFixture<GpsDataComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GpsDataComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GpsDataComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
