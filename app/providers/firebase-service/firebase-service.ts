import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the FirebaseService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FirebaseService {

  baseRef = new Firebase('https://fototrans-calculator.firebaseio.com/');
  authData: any;
  data: any = null;

  constructor(public http: Http) {

    this.baseRef.onAuth((authData) => {
      if (authData) {
        this.authData = authData;
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      }
      else {
        this.authData = null;
        console.log("User is logged out");
      }
    });
  }

  logout() {
    this.baseRef.unauth()
  }

  login() {
    this.baseRef.authWithOAuthPopup("google", (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  getDataPrivate(_id, _callback) {
    var ref = this.baseRef.child('public-messages')
    ref = ref.child(_id)

    ref.on('value',
      (snapshot) => {
        let result = snapshot.val()
        _callback(result)
      },
      (error) => {
        console.log("ERROR:", error)
        _callback(error)
      });
  }


  getData(_id, _callback) {
    var ref = this.baseRef.child('bookItems')
    //  ref = ref.child(_id)

    ref.on('value',
      (snapshot) => {
        var arr = []

        snapshot.forEach(function (childSnapshot) {
          arr.push({
            id: childSnapshot.key(),
            data: childSnapshot.val()
          });
        });
        _callback(arr)
      },
      (error) => {
        console.log("ERROR:", error)
        _callback(error)
      });
  }

  getDataObs() {
    var ref = this.baseRef.child('settings')
    var that = this

    return new Observable(observer => {
      ref.on('value',
        (snapshot) => {
          
          var settings = snapshot.val();
          observer.next(settings)
          
        },
        (error) => {
          console.log("ERROR:", error)
          observer.error(error)
        });
    });
  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }

    // don't have the data yet
    return new Promise(resolve => {
      // We're using Angular Http provider to request the data,
      // then on the response it'll map the JSON data to a parsed JS object.
      // Next we process the data and resolve the promise with the new data.
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(data => {
          // we've got back the raw data, now generate the core schedule data
          // and save the data for later reference
          this.data = data;
          resolve(this.data);
        });
    });
  }
}

