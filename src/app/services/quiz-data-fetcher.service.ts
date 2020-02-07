import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizDataFetcherService {

  constructor(private http: HttpClient) { }

  getDataList() {
    let queryURL = "/assets/quiz.json";
    return this.http.get<any>(queryURL);
  }
}
