import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MycartComponent } from './pages/mycart/mycart.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { LoginComponent } from '../pages/login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RecoveryComponent } from '../pages/recovery/recovery.component';
import { RegisterComponent } from '../pages/register/register.component';
import { AuthGuard } from '../guards/auth.guard';
import { ExitGuard } from '../guards/exit.guard';

const routes: Routes = [
  {
    path:'',
    component: LayoutComponent,
    children:[
      {
        path:'',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path:'home',
        component: HomeComponent
      },
      {
        path:'notFound',
        component: NotFoundComponent
      },
      {
        path: 'category/:id',
        loadChildren: () => import('./pages/category/category.module').then(m => m.CategoryModule)
      },
      {
        path:'product/:id', //parámetro por url
        component: ProductDetailComponent
      },
      {
        path:'myCart',
        component: MycartComponent
      },
      {
        path:'login',
        component: LoginComponent
      },
      {
        path:'register',
        component: RegisterComponent,
        canDeactivate : [ExitGuard]
      },
      {
        path:'recovery',
        component: RecoveryComponent
      },
      {
        path:'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent
      },
      // {
      //   path: '**',
      //   redirectTo: '/home',
      //   pathMatch: 'full',
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
