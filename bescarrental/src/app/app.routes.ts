import { Routes } from '@angular/router';
import { HomeComponent } from './_components/home/home.component';
import { AboutComponent } from './_components/about/about.component';
import { FooterComponent } from './_components/footer/footer.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component:HomeComponent},
    { path: 'navbar', component:HomeComponent},
    { path: 'about', component:AboutComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'login', component:LoginComponent},
    { path: 'register', component: RegisterComponent}

];
