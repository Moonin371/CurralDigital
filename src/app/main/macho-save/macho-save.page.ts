/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { MachoService } from 'src/app/main/services/macho.service';
import { VacinasPage } from '../vacinas/vacinas.page';

@Component({
  selector: 'app-macho-save',
  templateUrl: './macho-save.page.html',
  styleUrls: ['./macho-save.page.scss'],
})
export class MachoSavePage implements OnInit {

  maleForm: FormGroup;
  pageTitle = '...';
  maleId: string = undefined;

  constructor(private fb: FormBuilder, private navCtrl: NavController, private modalCtrl: ModalController, private overlayService: OverlayService, private route: ActivatedRoute, private machoService: MachoService) { }

  ngOnInit(): void {
    this.createForm();
    this.init();
  }
   init(): void{
     const maleId = this.route.snapshot.paramMap.get('id');
     if(!maleId){
      this.pageTitle = 'Novo Animal';
      return;
     }
     this.maleId = maleId;
     this.pageTitle = 'Editar Dados';
     this.machoService
      .get(maleId)
      .pipe(take(1))
      .subscribe(({ brinco, peso, nascimento, apartação})=>{
        this.maleForm.get('brinco').setValue(brinco);
        this.maleForm.get('peso').setValue(peso);
        this.maleForm.get('nascimento').setValue(nascimento);
        this.maleForm.get('apartação').setValue(apartação);
      });
   }

  private createForm(): void{
    this.maleForm = this.fb.group({
      brinco: ['',[Validators.required, Validators.minLength(3)]],
      peso: ['', [Validators.required, Validators.min(0)]],
      nascimento: ['', [Validators.required, Validators.minLength(6)]],
      apartação: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void>{
    const loading = await this.overlayService.loading({
      message: 'Salvando..'
    });
    try {
      const animal = !this.maleId
      ? await this.machoService.create(this.maleForm.value)
      : await this.machoService.update({
        id: this.maleId,
        ...this.maleForm.value
      });
      this.navCtrl.navigateBack('/main/male-list');
    } catch (error) {
      console.log('Erro salvando animal ', error);
      await this.overlayService.toast({
        message: error.message
      });
    } finally{
      loading.dismiss();
    }
  }

  async saveVacinas(){
    const modal = await this.modalCtrl.create({
      component: VacinasPage
      });

      await modal.present();

      const data = await modal.onDidDismiss();
      console.log(data);

    }

}
