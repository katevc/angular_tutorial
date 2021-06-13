import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


/* "Routes" tells router which view to display when user clicks link / pastes URL into browser */
const routes: Routes = [
  /* 
    Path - string for URL address in browser bar
    Component - component that router needs to create when corresponding path is visited
  */
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, //default route => goes to dashboard (has to fully match path w/ dashboard name)
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent }, // :id is a placeholder for a heroes id
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], //configure router at application's root level
  exports: [RouterModule] //make RouterModule available throughout the application
})
export class AppRoutingModule { }
