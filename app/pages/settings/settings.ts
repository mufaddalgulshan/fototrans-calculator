import {Page, NavController} from 'ionic-angular';
import {ControlGroup, Control, FormBuilder, Validators} from 'angular2/common';
import {FirebaseService} from '../../providers/firebase-service/firebase-service';

/*
  Generated class for the SettingsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Page({
  templateUrl: 'build/pages/settings/settings.html',
  providers: [FirebaseService]
})
export class SettingsPage {

  // form
  settingsForm: ControlGroup;

  // form inputs
  glassCost: Control;
  laminationCost: Control;

  data: any;

  constructor(public nav: NavController, private builder: FormBuilder, private firebaseService: FirebaseService) {

  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  ngOnInit() {
    console.log('ngOnInit');

    this.firebaseService.getDataObs()
      .subscribe(
      (data: any) => {
        this.data = data;
        console.log(this.data.glass.costPerSqInch);
        console.log(this.data.lamination.costPerSqInch);
        console.log(JSON.stringify(data));

        this.glassCost = new Control(this.data.glass.costPerSqInch, Validators.required);
        this.laminationCost = new Control(this.data.lamination.costPerSqInch, Validators.required);

        this.settingsForm = this.builder.group({

          glassCost: this.glassCost,
          laminationCost: this.laminationCost

        });

      });
  }
}
