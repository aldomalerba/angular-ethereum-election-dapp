import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EthereumModule } from './shared/ethereum/ethereum.module';
import { ElectionComponent } from './election/election.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import { MatTableModule} from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { EthereumBrowserAlertComponent } from './ethereum-browser-alert/ethereum-browser-alert.component';

@NgModule({
  declarations: [
    AppComponent,
    ElectionComponent,
    EthereumBrowserAlertComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EthereumModule, 
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatListModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
