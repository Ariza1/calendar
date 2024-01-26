import { Component } from '@angular/core';


const DATA = [
  {
    "title": "maria carmen",
    "start": "2023-12-16T06:30:00-05:00",
    "end": "2023-12-16T13:30:00-05:00",
    "backgroundColor": "#df1111",
    "id": "1"
  },
  {
    "title": "maria carmen",
    "start": "2023-12-17T06:30:00-05:00",
    "end": "2023-12-17T13:30:00-05:00",
    "backgroundColor": "#df1111",
    "id": "2"
  },
  {
    "title": "maria carmen",
    "start": "2023-12-18T06:30:00-05:00",
    "end": "2023-12-18T13:30:00-05:00",
    "backgroundColor": "#df1111",
    "id": "3"
  },
  {
    "title": "maria carmen",
    "start": "2023-12-19T06:30:00-05:00",
    "end": "2023-12-19T13:30:00-05:00",
    "backgroundColor": "#df1111",
    "id": "4"
  },
  {
    "title": "maria carmen",
    "start": "2023-12-20T06:30:00-05:00",
    "end": "2023-12-20T13:30:00-05:00",
    "backgroundColor": "#df1111",
    "id": "5"
  },
  {
    "title": "maria carmen",
    "start": "2023-12-21T06:30:00-05:00",
    "end": "2023-12-21T13:30:00-05:00",
    "backgroundColor": "#df1111",
    "id": "6"
  },
  {
    "title": "mohcine",
    "start": "2023-12-18T17:00:00-05:00",
    "end": "2023-12-18T22:00:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "7"
  },
  {
    "title": "mohcine",
    "start": "2023-12-20T08:30:00-05:00",
    "end": "2023-12-20T12:30:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "8"
  },
  {
    "title": "mohcine",
    "start": "2023-12-20T18:00:00-05:00",
    "end": "2023-12-20T22:00:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "9"
  },
  {
    "title": "mohcine",
    "start": "2023-12-21T09:00:00-05:00",
    "end": "2023-12-21T13:30:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "10"
  },
  {
    "title": "mohcine",
    "start": "2023-12-21T18:00:00-05:00",
    "end": "2023-12-21T21:30:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "11"
  },
  {
    "title": "mohcine",
    "start": "2023-12-22T17:30:00-05:00",
    "end": "2023-12-22T22:00:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "12"
  },
  {
    "title": "mohcine",
    "start": "2023-12-16T09:00:00-05:00",
    "end": "2023-12-16T13:30:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "13"
  },
  {
    "title": "mohcine",
    "start": "2023-12-16T17:00:00-05:00",
    "end": "2023-12-16T21:00:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "14"
  },
  {
    "title": "mohcine",
    "start": "2023-12-17T18:30:00-05:00",
    "end": "2023-12-17T22:00:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "15"
  },
  {
    "title": "mohcine",
    "start": "2023-12-17T09:00:00-05:00",
    "end": "2023-12-17T13:30:00-05:00",
    "backgroundColor": "#d214a9",
    "id": "16"
  },
  {
    "title": "maria",
    "start": "2023-12-18T07:00:00-05:00",
    "end": "2023-12-18T13:00:00-05:00",
    "backgroundColor": "#1509b3",
    "id": "17"
  },
  {
    "title": "maria",
    "start": "2023-12-19T07:00:00-05:00",
    "end": "2023-12-19T13:00:00-05:00",
    "backgroundColor": "#1509b3",
    "id": "18"
  },
  {
    "title": "maria",
    "start": "2023-12-20T07:00:00-05:00",
    "end": "2023-12-20T13:00:00-05:00",
    "backgroundColor": "#1509b3",
    "id": "19"
  },
  {
    "title": "maria",
    "start": "2023-12-21T07:00:00-05:00",
    "end": "2023-12-21T13:00:00-05:00",
    "backgroundColor": "#1509b3",
    "id": "20"
  },
  {
    "title": "maria",
    "start": "2023-12-22T07:00:00-05:00",
    "end": "2023-12-22T13:00:00-05:00",
    "backgroundColor": "#1509b3",
    "id": "21"
  },
  {
    "title": "alex",
    "start": "2023-12-18T18:00:00-05:00",
    "end": "2023-12-18T20:00:00-05:00",
    "backgroundColor": "#09be48",
    "id": "22"
  },
  {
    "title": "Jorge",
    "start": "2023-12-18T09:30:00-05:00",
    "end": "2023-12-18T12:30:00-05:00",
    "backgroundColor": "#0893af",
    "id": "23"
  },
  {
    "title": "Jorge",
    "start": "2023-12-18T17:00:00-05:00",
    "end": "2023-12-18T22:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "24"
  },
  {
    "title": "Jorge",
    "start": "2023-12-19T17:00:00-05:00",
    "end": "2023-12-19T22:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "25"
  },
  {
    "title": "Jorge",
    "start": "2023-12-19T09:30:00-05:00",
    "end": "2023-12-19T12:30:00-05:00",
    "backgroundColor": "#0893af",
    "id": "26"
  },
  {
    "title": "Jorge",
    "start": "2023-12-21T17:00:00-05:00",
    "end": "2023-12-21T22:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "27"
  },
  {
    "title": "Jorge",
    "start": "2023-12-22T17:00:00-05:00",
    "end": "2023-12-22T22:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "28"
  },
  {
    "title": "Jorge",
    "start": "2023-12-22T06:30:00-05:00",
    "end": "2023-12-22T13:30:00-05:00",
    "backgroundColor": "#0893af",
    "id": "29"
  },
  {
    "title": "Jorge",
    "start": "2023-12-16T08:30:00-05:00",
    "end": "2023-12-16T13:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "30"
  },
  {
    "title": "Jorge",
    "start": "2023-12-16T17:00:00-05:00",
    "end": "2023-12-16T22:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "31"
  },
  {
    "title": "Jorge",
    "start": "2023-12-17T08:00:00-05:00",
    "end": "2023-12-17T13:00:00-05:00",
    "backgroundColor": "#0893af",
    "id": "32"
  },
  {
    "title": "carla",
    "start": "2023-12-19T16:00:00-05:00",
    "end": "2023-12-19T21:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "33"
  },
  {
    "title": "carla",
    "start": "2023-12-20T17:00:00-05:00",
    "end": "2023-12-20T21:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "34"
  },
  {
    "title": "carla",
    "start": "2023-12-21T17:00:00-05:00",
    "end": "2023-12-21T21:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "35"
  },
  {
    "title": "carla",
    "start": "2023-12-22T09:00:00-05:00",
    "end": "2023-12-22T12:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "36"
  },
  {
    "title": "carla",
    "start": "2023-12-22T17:00:00-05:00",
    "end": "2023-12-22T20:30:00-05:00",
    "backgroundColor": "#63d408",
    "id": "37"
  },
  {
    "title": "carla",
    "start": "2023-12-16T07:30:00-05:00",
    "end": "2023-12-16T11:30:00-05:00",
    "backgroundColor": "#63d408",
    "id": "38"
  },
  {
    "title": "carla",
    "start": "2023-12-17T07:30:00-05:00",
    "end": "2023-12-17T12:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "39"
  },
  {
    "title": "carla",
    "start": "2023-12-16T18:00:00-05:00",
    "end": "2023-12-16T21:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "40"
  },
  {
    "title": "carla",
    "start": "2023-12-17T18:00:00-05:00",
    "end": "2023-12-17T21:00:00-05:00",
    "backgroundColor": "#63d408",
    "id": "41"
  },
  {
    "title": "lina",
    "start": "2023-12-19T17:00:00-05:00",
    "end": "2023-12-19T22:00:00-05:00",
    "backgroundColor": "#e1da0e",
    "id": "42"
  },
  {
    "title": "lina",
    "start": "2023-12-20T18:00:00-05:00",
    "end": "2023-12-20T22:00:00-05:00",
    "backgroundColor": "#e1da0e",
    "id": "43"
  },
  {
    "title": "lina",
    "start": "2023-12-21T08:00:00-05:00",
    "end": "2023-12-21T12:00:00-05:00",
    "backgroundColor": "#e1da0e",
    "id": "44"
  },
  {
    "title": "lina",
    "start": "2023-12-21T18:00:00-05:00",
    "end": "2023-12-21T22:00:00-05:00",
    "backgroundColor": "#e1da0e",
    "id": "45"
  },
  {
    "title": "lina",
    "start": "2023-12-16T18:00:00-05:00",
    "end": "2023-12-16T22:00:00-05:00",
    "backgroundColor": "#e1da0e",
    "id": "46"
  }
]
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

}
