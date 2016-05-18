import {Page} from 'ionic-angular';
import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Control, Validators} from 'angular2/common';
import {SettingsPage} from '../settings/settings'
import {FirebaseService} from '../../providers/firebase-service/firebase-service';

@Page({
  templateUrl: 'build/pages/home/home.html',
  providers: [FirebaseService]
})
export class HomePage {

  // messagesRef: Firebase; // Initialized Firebase object
  isLoggedIn: boolean;   // Was authentification sucesfull
  // authData: any;         // Object that holds Twitter authentification data (displayName, imageURL, etc.)

  authDataProfileName: string;        // Profile name
  authDataProfileImage: string;       // Profile image

  calculatorForm: ControlGroup;
  height: Control;
  width: Control;
  mouldingSize: Control;
  onGlass: Control;
  needsLamination: Control;
  isCollage: Control;
  totalSnaps: Control;
  totalAmount: Control;
  frameCost: Control;

  settingsPage: any;

  // submitted = false;
  // calculator = new Calculator(0, 0, 0, false, true, false, 0, 0, 0);
  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.isCollage.value); }

  // constructor() {
  constructor(private builder: FormBuilder, private firebaseService: FirebaseService) {

    
    
    this.height = new Control('', Validators.required);
    this.width = new Control('', Validators.required);
    this.mouldingSize = new Control('', Validators.required);
    this.onGlass = new Control(false);
    this.needsLamination = new Control(false);
    this.isCollage = new Control(false);
    this.totalSnaps = new Control();
    this.totalAmount = new Control();

    this.calculatorForm = builder.group({
      height: this.height,
      width: this.width,
      mouldingSize: this.mouldingSize,
      onGlass: this.onGlass,
      needsLamination: this.needsLamination,
      isCollage: this.isCollage,
      totalSnaps: this.totalSnaps,
      totalAmount: this.totalAmount
    });

    this.settingsPage = SettingsPage;
  }

  authWithGoogle() {
    this.firebaseService.login();
    this.isLoggedIn = true;
    this.authDataProfileImage = this.firebaseService.authData.google.profileImageURL.replace(/\_normal/, "");
    this.authDataProfileName = this.firebaseService.authData.google.displayName;
  }

  unauthWithGoogle() {
    this.firebaseService.logout();
    this.isLoggedIn = false;
  }

  onSubmit(value: string): void {
    if (this.calculatorForm.valid) {
      console.log('Submitted value: ', JSON.stringify(value));
    }
  }
}
