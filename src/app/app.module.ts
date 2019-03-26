import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContactContainerComponent } from './contact/contact-container/contact-container.component';
import { ContactListComponent } from './contact/components/contact-list.component';
import { ContactListPaginationComponent } from './contact/components/contact-list-pagination/contact-list-pagination.component';
import { ContactListSearchComponent } from './contact/components/contact-list-search/contact-list-search.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactContainerComponent,
    ContactListComponent,
    ContactListPaginationComponent,
    ContactListSearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
