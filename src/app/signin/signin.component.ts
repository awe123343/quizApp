import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first, single } from 'rxjs/operators';
import { Data } from '@angular/router';

import { QuizDataFetcherService } from '../services/quiz-data-fetcher.service';

const questionAmount = 10;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  email : string;
  name : string;

  timeLeft: number;
  interval;

  questionBase : any;
  questionToDo : any;
  currQuestionId:number;

  constructor(
    private fb: FormBuilder,
    private dataFetcher: QuizDataFetcherService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      'email': new FormControl('', Validators.email),
      'name': new FormControl('', Validators.required),
    });
    this.dataFetcher.getDataList().pipe(first()).subscribe(data => {
      this.questionBase = data;
      console.log("All questions", this.questionBase);

      this.chooseQuestions();

    });
    this.timeLeft = 600;
    this.startTimer();
    this.currQuestionId = 0;
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.email = this.f.email.value;
    this.name = this.f.name.value;
    console.log(this.email);
    console.log(this.name);
    
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timeLeft = 600;
        location.reload();
      }
    },1000)
  }

  chooseQuestions() {
    // console.log(this.questionBase);
    let res = [];
    let len = this.questionBase.length;

    for (let i = 0; i < len; i++) {
      let cur_num = this.questionBase[i];
      if (cur_num.type != "mc") {
        cur_num.selected = null;
      } else {
        cur_num.selected = [];
      }
      // let cur_num = i;
      if (i < questionAmount) {
        res.push(cur_num);
      } else {
        let tmp = this.getRandomInt(len);
        if (tmp < questionAmount) {
          res[tmp] = cur_num;
        }
      }
    }
    console.log("Index for questions", res);
    this.questionToDo = res;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  questionSwitch(forward : boolean) {
    if (forward) {
      this.currQuestionId++;
    } else {
      this.currQuestionId--;
    }
  }

  getQuestionType(type) {
    let res : string;
    if (type == "tf") {
      res = "True/False"
    } else if (type == "sc") {
      res = "Single choice";
    } else if (type == "mc") {
      res = "Multiple choice";
    } else {
      res = "Invalid type";
    } 
    return res;
  }

  getTfSelectedContent(question_index, id) {
    let option = this.questionToDo[question_index].options.filter(opt => opt.option_id == id);
    if (option.length > 0) {
      return option[0].option_content ? "True" : "False"; 
    }
    return "None";
    // console.log(option);
  }

  getScContent(question_index, id) {
    let option = this.questionToDo[question_index].options.filter(opt => opt.option_id == id);
    if (option.length > 0) {
      return option[0].option_content; 
    }
    return "None";
  }

  getMcContent(question_index, id) {
    let res = [];
    let option = this.questionToDo[question_index].options.filter(opt => opt.option_id == id);
    if (option.length > 0) {
      option.forEach(element => {
        res.push(element.option_content);
      });
      return res;
    }
    return "None";
  }
}
