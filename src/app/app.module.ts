import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http';
import { TvProgramsComponent } from './components/tv-programs/tv-programs.component';
import { MoviesComponent } from './components/movies/movies.component';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';
import { SliderModule } from 'primeng/slider';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { HomeComponent } from './components/home/home.component';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TvProgramsComponent,
    MoviesComponent,
    DetailsComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    HttpClientModule,
    RatingModule,
    FormsModule,
    SliderModule,
    VirtualScrollerModule,
    SelectButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
