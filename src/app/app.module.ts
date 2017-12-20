import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchResultSingleComponent } from './search-result-single/search-result-single.component';
import {FormsModule} from '@angular/forms';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { BookComponent } from './book/book.component';
import {HttpClientModule} from '@angular/common/http';
import {EmailService} from './email.service';
import { ShareComponent } from './share/share.component';
import {SmsService} from './sms.service';


// Application Routes
const appRoutes: Routes = [
  { path: 'search', component: SearchComponent},
  { path: 'book/:id', component: BookComponent },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    SearchComponent,
    SearchResultComponent,
    SearchResultSingleComponent,
    BookComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    Ng4LoadingSpinnerModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    EmailService,
    SmsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
