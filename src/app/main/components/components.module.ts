import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AnimalItemComponent } from './animal-item/animal-item.component';



@NgModule({
  declarations: [AnimalItemComponent],
  imports: [
    SharedModule
  ],
  exports: [AnimalItemComponent]
})
export class ComponentsModule { }
