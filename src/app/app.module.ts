import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactContainerComponent } from './contact/contact-container/contact-container.component';
import { ContactListComponent } from './contact/components/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactContainerComponent,
    ContactListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
