import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  weather: any;
  location:{
    city: string,
    state: string,
  }

  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,
    private storage: Storage) {

  }
  ionViewWillEnter(){
    //get something from starage this.storage.get();
    //set something from storage this.storage.set();
    this.storage.get('location').then((val) =>{
      if (val != null){
    //change string to JSON fomart to read val
        this.location = JSON.parse(val);

        } else  {
                  this.location ={
                  city: 'Los Angeles',
                  state: 'CA'  
                }
        }
              this.weatherProvider.getWeather(this.location.city, 
              this.location.state).subscribe(weather => {
              this.weather = weather.current_observation;
           });
    });
  }
}
