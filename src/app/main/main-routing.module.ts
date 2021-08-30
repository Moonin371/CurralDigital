import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create-female',
        loadChildren: () => import('./animals-save/animals-save.module').then( m => m.AnimalsSavePageModule)
      },
      {
        path: 'edit-female/:id',
        loadChildren: () => import('./animals-save/animals-save.module').then( m => m.AnimalsSavePageModule)
      },
      {
        path: 'female-list',
        loadChildren: () => import('./animal-list/animal-list.module').then( m => m.AnimalListPageModule)
      },
      {
        path: 'male-list',
        loadChildren: () => import('./macho-list/macho-list.module').then( m => m.MachoListPageModule)
      },
      {
        path: 'create-male',
        loadChildren: () => import('./macho-save/macho-save.module').then( m => m.MachoSavePageModule)
      },
      {
        path: 'edit-male/:id',
        loadChildren: () => import('./macho-save/macho-save.module').then( m => m.MachoSavePageModule)
      },
      {
        path: '',
        loadChildren: () => import('src/app/main/page/main.module').then((m) => m.MainPageModule)
      },
    ]
  },
  {
    path: 'vacinas',
    loadChildren: () => import('./vacinas/vacinas.module').then( m => m.VacinasPageModule)
  },
  {
    path: 'monta-parto',
    loadChildren: () => import('./monta-parto/monta-parto.module').then( m => m.MontaPartoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
