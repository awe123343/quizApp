import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { first, single } from 'rxjs/operators';
import { Data } from '@angular/router';

import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { QuizDataFetcherService } from '../services/quiz-data-fetcher.service';

const questionAmount = 10;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [ConfirmationService, MessageService],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  quizSubmitted = false;
  email: string;
  name: string;

  timeLeft: number;
  interval;

  questionBase: any;
  questionToDo: any;
  currQuestionId: number;

  msgs: Message[] = [];

  constructor(
    private fb: FormBuilder,
    private dataFetcher: QuizDataFetcherService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      // 'email': new FormControl('', Validators.email),
      'email': new FormControl('', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      'name': new FormControl('', Validators.required),
    });
    this.dataFetcher.getDataList().pipe(first()).subscribe(data => {
      this.questionBase = data;
      console.log("All questions", this.questionBase);

      this.chooseQuestions();

    });
    this.timeLeft = 600;
    this.currQuestionId = 0;
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }
    this.email = this.f.email.value;
    this.name = this.f.name.value;
    console.log(this.email);
    console.log(this.name);
    this.startTimer();

  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        // this.timeLeft = 600;
        // location.reload();
        this.submitQuiz();
      }
    }, 1000)
  }

  chooseQuestions() {
    // console.log(this.questionBase);
    let res = [];
    let len = this.questionBase.length;

    let tfs = this.questionBase.filter(q => q.type == "tf");
    let scs = this.questionBase.filter(q => q.type == "sc");
    let mcs = this.questionBase.filter(q => q.type == "mc");

    res.push(tfs[this.getRandomInt(tfs.length)]);
    res.push(scs[this.getRandomInt(tfs.length)]);
    res.push(mcs[this.getRandomInt(tfs.length)]);

    res.forEach(item => {
      if (item.type != "mc") {
        item.selected = null;
      } else {
        item.selected = [];
      }
      item.options = this.shuffle(item.options);
    });

    let idsNow = res.map(item => item.question_id);
    let leftQuestions = this.questionBase.filter(item => !idsNow.includes(item.question_id));

    let res2 = [];

    for (let i = 0; i < len - 3; i++) {
      // let cur_num = this.questionBase[i];
      let cur_num = leftQuestions[i];
      if (cur_num.type != "mc") {
        cur_num.selected = null;
      } else {
        cur_num.selected = [];
      }

      cur_num.options = this.shuffle(cur_num.options);
      // let cur_num = i;
      if (i < questionAmount - 3) {
        res2.push(cur_num);
      } else {
        let tmp = this.getRandomInt(len - 3);
        if (tmp < questionAmount - 3) {
          res2[tmp] = cur_num;
        }
      }
    }

    res2.forEach(item => {
      res.push(item);
    });
    console.log("Index for questions", res);
    this.questionToDo = res;
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  randRange(min: number, max: number) {
    return Math.floor(Math.random() * Math.floor(max - min) + min);
  }

  swapAt(i: number, j: number, array) {
    let temp: number = array[i];
    array[i] = array[j];
    array[j] = temp;
  }


  shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      this.swapAt(i, this.randRange(i, array.length), array);
    }
    console.log("Shuffled options", array);
    return array;
  }

  questionSwitch(forward: boolean) {

    if (forward) {
      this.currQuestionId++;
    } else {
      this.currQuestionId--;
    }
  }

  getQuestionType(type) {
    let res: string;
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
    let option = this.questionToDo[question_index].options.filter(opt => opt.option_id == id);
    // console.log("ID", id);
    // console.log("MC", option);

    if (option.length > 0) {
      return option[0].option_content;
    }
  }

  confirmToSubmitQuiz(qUndone) {
    let qUndoneStr = "";
    qUndone.forEach(element => {
      qUndoneStr += element + 1 + ", ";
    });
    qUndoneStr = qUndoneStr.substring(0, qUndoneStr.length - 2);

    this.confirmationService.confirm({
      message: 'Are you sure that you want to submit the Quiz?\n' + 'Question ' + qUndoneStr + ' have not been answered yet',
      header: 'Confirm to submit',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'warn', summary: 'Skipped', detail: 'You have chose to submit the quiz' });
        this.submitQuiz();
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected to submit the quiz' });
      }
    });
  }

  getFuncForSubmit() {
    let qNotDone = [];
    for (let i = 0; i < questionAmount; i++) {
      if (this.questionToDo[i].type == "mc") {
        if (this.questionToDo[i].selected.length === 0) {
          qNotDone.push(i);
        }
      } else {
        if (!this.questionToDo[i].selected) {
          qNotDone.push(i);
        }
      }
    }
    qNotDone.length === 0 ? this.submitQuiz() : this.confirmToSubmitQuiz(qNotDone);
  }

  confirmToNext() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to go to next question without any option selected?',
      header: 'Confirm to skip',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'warn', summary: 'Skipped', detail: 'You have moved one question forward without selecting any option' });
        this.questionSwitch(true);
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected to move to next question' });
      }
    });
  }

  getFuncForNext(type, sel) {
    if (!sel) {
      this.confirmToNext();
    } else if (type == "mc" && sel.length === 0) {
      this.confirmToNext();
    } else {
      this.questionSwitch(true);
    }
  }

  getSumOptColor(q_id, opt_id) {
    let option = this.questionToDo[q_id].options.filter(opt => opt.option_id == opt_id);
    if (option[0].option_answer) {
      return "green";
    } else {
      if (this.questionToDo[q_id].type == "mc" && this.questionToDo[q_id].selected.includes(opt_id)) {
        return "red";
      } else if (this.questionToDo[q_id].type != "mc" && this.questionToDo[q_id].selected == opt_id) {
        return "red";
      } else {
        return "inherit";
      }
    }
  }

  getSumOptWeight(q_id, opt_id) {
    let option = this.questionToDo[q_id].options.filter(opt => opt.option_id == opt_id);
    if (option[0].option_answer) {
      return "bold";
    } else {
      if (this.questionToDo[q_id].type == "mc" && this.questionToDo[q_id].selected.includes(opt_id)) {
        return "bold";
      } else if (this.questionToDo[q_id].type != "mc" && this.questionToDo[q_id].selected == opt_id) {
        return "bold";
      } else {
        return "inherit";
      }
    }
  }

  submitQuiz() {
    this.quizSubmitted = true;
    this.timeLeft = 0;
  }

  printComponent() {
    // let printContents = document.getElementById(cmpName).innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;

    window.print();

    // document.body.innerHTML = originalContents;
  }

  getQuestionTouched() {
    let res = [];
    for (let i = 0; i < questionAmount; i++) {
      if (this.questionToDo[i].type == "mc") {
        if (this.questionToDo[i].selected.length !== 0) {
          if (i !== questionAmount - 1) {
            res.push(i + 1);
          }
        }
      } else {
        if (this.questionToDo[i].selected) {
          if (i !== questionAmount - 1) {
            res.push(i + 1);
          }
        }
      }
    }
    return res;
  }

  validateAns(index) {
    let keys = this.questionToDo[index].options.filter(opt => opt.option_answer).map(opt => opt.option_id);

    if (this.questionToDo[index].type == "mc") {
      for (let i = 0; i < keys.length; i++) {
        if (!this.questionToDo[index].selected.includes(keys[i])) {
          return false;
        }
      }

      for (let i = 0; i < this.questionToDo[index].selected.length; i++) {
        if (!keys.includes(this.questionToDo[index].selected[i])) {
          return false;
        }
      }
    } else {
      if (this.questionToDo[index].selected !== keys[0]) {
        return false;
      }
    }

    return true;
  }

  getScore() {
    let score: number = 0;

    for (let i = 0; i < questionAmount; i++) {
      if (this.validateAns(i)) {
        score++;
      }
    }

    return score;
  }

  reDoTest() {
    location.reload();
  }
}
