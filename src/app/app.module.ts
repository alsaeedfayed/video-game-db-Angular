import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTabsModule } from '@angular/material/tabs'
import { SearchBarComponent } from './components/search-bar/search-bar.component'
import { HomeComponent } from './components/home/home.component'
import { HEADER_INTERCEPTOR } from './interceptors/http-headers.interceptor'
import { ERROR_INTERCEPTOR } from './interceptors/http-errors.interceptor'
import { NgxSpinnerModule } from 'ngx-spinner'
import { DetailsComponent } from './components/details/details.component'
import { NgxStarRatingModule } from 'ngx-star-rating'
import { StarRatingModule } from 'angular-star-rating'

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HomeComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatTabsModule,
    NgxSpinnerModule,
    NgxStarRatingModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
  ],
  providers: [HEADER_INTERCEPTOR, ERROR_INTERCEPTOR],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
