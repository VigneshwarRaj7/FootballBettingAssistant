import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AIComponent } from './ai/ai.component';
import { StandingsComponent } from './standings/standings.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'AI/:id', component: AIComponent},
    { path: 'standing/:id/:season', component: StandingsComponent},
    { path: 'detail/:id', component: DetailsComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
