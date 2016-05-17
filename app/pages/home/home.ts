import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators, AbstractControl} from 'angular2/common';
import {SettingsPage} from '../settings/settings'

@Page({
  templateUrl: 'build/pages/home/home.html',
  directives: [FORM_DIRECTIVES]
})
export class HomePage {

  messagesRef: Firebase; // Initialized Firebase object
  isLoggedIn: boolean;   // Was authentification sucesfull
  authData: any;         // Object that holds Twitter authentification data (displayName, imageURL, etc.)

  authDataProfileName: string;        // Profile name
  authDataProfileImage: string;       // Profile image

  calculatorForm: ControlGroup;
  height: AbstractControl;
  width: AbstractControl;
  mouldingSize: AbstractControl;
  onGlass: AbstractControl;
  needsLamination: AbstractControl;
  isCollage: AbstractControl;
  totalSnaps: AbstractControl;
  totalAmount: AbstractControl;
  frameCost: AbstractControl;

  settingsPage: any;

  constructor(fb: FormBuilder) {
    this.messagesRef = new Firebase("https://fototrans-calculator.firebaseio.com/");

    this.messagesRef.onAuth((user) => {
      if (user) {
        this.authData = user; // Set retrieved Twitter profile data

        this.authDataProfileImage = this.authData.google.profileImageURL.replace(/\_normal/, "");   // Get profile name
        this.authDataProfileName = this.authData.google.displayName;                                // Get profile image

        this.isLoggedIn = true; // Set authentification was sucesfull
      }
    });

    this.calculatorForm = fb.group({
      'height': ['', Validators.compose([Validators.required])],
      'width': ['', Validators.compose([Validators.required])],
      'mouldingSize': ['', Validators.compose([Validators.required])],
      'onGlass': ['false'],
      'needsLamination': ['false'],
      'isCollage': ['false'],
      'totalSnaps': ['', Validators.compose([Validators.required])]
    });

    this.height = this.calculatorForm.controls['height'];
    this.width = this.calculatorForm.controls['width'];
    this.mouldingSize = this.calculatorForm.controls['mouldingSize'];
    this.onGlass = this.calculatorForm.controls['onGlass'];
    this.needsLamination = this.calculatorForm.controls['needsLamination'];
    this.isCollage = this.calculatorForm.controls['isCollage'];
    this.totalSnaps = this.calculatorForm.controls['totalSnaps'];

    this.settingsPage = SettingsPage;
  }

  authWithGoogle() {
    this.messagesRef.authWithOAuthPopup("google", (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  unauthWithGoogle() {
    this.messagesRef.unauth();
    this.isLoggedIn = false;
  }

  onSubmit(value: string): void {
    if (this.calculatorForm.valid) {
      console.log('Submitted value: ', value);
    }
  }
}
