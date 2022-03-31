import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from './footer/footer.component';
import { DateTimeComponent } from './date-time/date-time.component';
import { IconLinkComponent } from './icon-link/icon-link.component';
import { SectionButtonComponent } from './section-button/section-button.component';
import { ProfileComponent } from './profile/profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsFilterComponent } from './projects-filter/projects-filter.component';

const siteRoutes: Routes = [
  { path: "", redirectTo: "/projects", pathMatch: "full"},
  { path: "projects", component: ProjectsComponent },
  { path: "profile", component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DateTimeComponent,
    IconLinkComponent,
    SectionButtonComponent,
    ProfileComponent,
    ProjectsComponent,
    ProjectsFilterComponent
  ],
  imports: [
    RouterModule.forRoot(siteRoutes),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
