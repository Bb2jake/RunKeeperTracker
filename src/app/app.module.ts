import { GpsService } from './services/gps/gps-service';
import { GpsDataComponent } from './components/gps-data/gps-data.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		GpsDataComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ChartsModule,
		HttpClientModule,
		FormsModule
	],
	providers: [GpsService],
	bootstrap: [AppComponent]
})
export class AppModule { }
