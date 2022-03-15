import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import{ HttpClientModule} from '@angular/common/http';
import { AgeCountPipe } from './header/age-count.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageBoxComponent } from './header/message-box/message-box.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AgeCountPipe,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,ToastrModule.forRoot({
      timeOut:4000,
      progressBar:true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
