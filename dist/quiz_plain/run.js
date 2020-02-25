const questionAmount = 10;

var submitted = false;
var email = "";
var name = "";
var questionBase;
var questionToDo;
var timeLeft = 120;
var currQuestionId = 0;

window.onload = function() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "./assets/quiz.json", true);
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == XMLHttpRequest.DONE && xhttp.status == 200) {
      questionBase = JSON.parse(xhttp.responseText);

      console.log("All questions", questionBase);
      chooseQuestions();
    }
  };
  xhttp.send();

  const form = document.getElementById("form");
  form.addEventListener("change", () => {
    console.log("Form valid? ", form.checkValidity());

    document.getElementById("infoSubmit").disabled = !form.checkValidity();
  });

  const emailField = document.getElementById("email_input");
  const nameField = document.getElementById("name_input");
  const emailError = document.getElementById("email_error");
  const nameError = document.getElementById("name_error");

  // console.log(emailField);
  emailField.addEventListener("blur", function(event) {
    isValidEmail = emailField.checkValidity();
    if (!isValidEmail) {
      emailField.style.borderColor = "red";
      emailError.style.display = "block";
    } else {
      emailField.style.borderColor = "#ccc";
      emailError.style.display = "none";
    }
  });


  nameField.addEventListener("blur", function(event) {
    isValidName = nameField.checkValidity();
    console.log("Name valid? ", isValidName);
    if (!isValidName) {
        nameField.style.borderColor = "red";
        nameError.style.display = "block";
    } else {
        nameField.style.borderColor = "#ccc";
        nameError.style.display = "none";
    }
  });
};


function submitForm(e) {
  submitted = true;
  // stop here if form is invalid
  // if (this.loginForm.invalid) {
  //   return;
  // }

  let emailField = document.getElementById("email_input");
  let nameField = document.getElementById("name_input");
  let submitBtn = document.getElementById("infoSubmit");

  email = emailField.value;
  name = nameField.value;

  console.log(email);
  console.log(name);
  document.getElementById("loginbox").style.display = "none";
  startTimer();

  let quizContent = document.getElementById("quizContent");

  let quiz_content_html = "";
  questionToDo.forEach(function(q) {
    if (questionToDo.indexOf(q) != 0) {
      quiz_content_html +=
        "<div class='qBoxB' id='qbox" + questionToDo.indexOf(q) + "' style='display : none;'>";
    } else {
      quiz_content_html += "<div class='qBoxB' id='qbox" + questionToDo.indexOf(q) + "' style='display : inherit;'>";
    }

    quiz_content_html += "<div class='qrow' style='background-color : #f4f4f4;'><p>Question " + (questionToDo.indexOf(q) + 1) + " (" + getQuestionType(q.type) + ")</p></div>";
    let q_content_html = "<div class='qrow'>";
    let q_content = q.question_content;
    q_content.forEach(function(q_sub) {
      if (q_sub.type == "text") {
        q_content_html += "<p>" + q_sub.content + "</p>";
      } else if (q_sub.type == "image") {
        q_content_html += "<img class='qImgBorder' height='120px' style='margin-left: 2em' src='" + q_sub.content + "' />";
      } else if (q_sub.type == "code") {
        q_content_html +=
          "<span><pre><xmp>" + q_sub.content + "</xmp></pre></span>";
      }
    });
    q_content_html += "</div>";
    quiz_content_html += q_content_html;

    let option_html = "<div class='qrowOpt'>";
    let options = q.options;
    if (q.type == "tf") {
      options.forEach(function(option) {
        option_html += "<div style='display: flex; align-items: flex-start; margin-bottom: 1em;'>";
        option_html += "<input type='radio' name='" + q.question_id +"' value='" + option.option_id + "' onclick='handleOptionClick(this," + questionToDo.indexOf(q) + ")'/>";
        option_html += "<div style='display: flex; flex-direction: column; margin-left: 0.5em;'>";
        option_html += option.option_content == true ? "True" : "False";
        option_html += "</div></div>";
      });
    } else if (q.type == "sc") {
      options.forEach(function(option) {
        option_html += "<div style='display: flex; align-items: center; margin-bottom: 1em;'>";
        option_html += "<input type='radio' name='" + q.question_id +"' value='" + option.option_id + "' onclick='handleOptionClick(this," + questionToDo.indexOf(q) + ")' />";
        option_html += "<div style='display: flex; flex-direction: column; margin-left: 0.5em;'>";
        let option_sub_html = "";
        let option_contents = option.option_content;
        option_contents.forEach(function(opt_sub) {
          if (opt_sub.type == "text") {
            option_sub_html += "<p>" + opt_sub.content + "</p>";
          } else if (opt_sub.type == "image") {
            option_sub_html += "<img class='qImgBorder' height='120px' src='" + opt_sub.content + "' />";
          } else if (opt_sub.type == "code") {
            option_sub_html += "<p><xmp>" + opt_sub.content + "</xmp></p>";
          }
        });
        option_html += option_sub_html;
        option_html += "</div></div>";
      });
    } else if (q.type == "mc") {
      options.forEach(function(option) {
        option_html += "<div style='display: flex; align-items: center; margin-bottom: 1em;'>";
        option_html += "<input type='checkbox' value='" + option.option_id + "' onclick='handleOptionClick(this," + questionToDo.indexOf(q) + ")' />";
        option_html += "<div style='display: flex; flex-direction: column; margin-left: 0.5em;'>";
        let option_sub_html = "";
        let option_contents = option.option_content;
        option_contents.forEach(function(opt_sub) {
          if (opt_sub.type == "text") {
            option_sub_html += "<p>" + opt_sub.content + "</p>";
          } else if (opt_sub.type == "image") {
            option_sub_html += "<img class='qImgBorder' height='120px' src='" + opt_sub.content + "' />";
          } else if (opt_sub.type == "code") {
            option_sub_html += "<p><xmp>" + opt_sub.content + "</xmp></p>";
          }
        });
        option_html += option_sub_html;
        option_html += "</div></div>";
      });
    }
    option_html += "</div>";
    quiz_content_html += option_html;
    quiz_content_html += "</div>";
  });

  quiz_content_html += "<div style='margin-top: 2em; display: flex; justify-content: center;'>";
  quiz_content_html += "<button class='ui-button prevbtn' style='margin-right: .5em; width:6.5em' onclick='questionSwitch(false)' disabled><i class='fas fa-arrow-left'></i> Previous</button>";
  quiz_content_html += "<button class='ui-button nextbtn' style='margin-right: .5em; width:6.5em' onclick='questionSwitch(true)' disabled><i class='fas fa-arrow-right'></i> Next</button>";
  quiz_content_html += "<button class='ui-button skipbtn' style='margin-right: .5em; width:6.5em' onclick='questionSwitch(true)'><i class='fas fa-fast-forward'></i> Skip</button>";
  quiz_content_html += "<button class='ui-button submbtn' style='margin-right: .5em; width:6.5em; display : none' onclick='submitQuiz()'><i class='fas fa-upload'></i> Submit</button></div>";

  quizContent.innerHTML += quiz_content_html;

  document.getElementById("quizbox").style.display = "inherit";

  showFetchedInput();

  return false;
}

function showFetchedInput() {
  document.getElementById("emailFetched").innerHTML = email;
  document.getElementById("nameFetched").innerHTML = name;
}

function questionSwitch(forward) {
  let prev_id = "qbox" + currQuestionId;
  document.getElementById(prev_id).style.display = "none";
  if (forward) {
    currQuestionId++;
  } else {
    currQuestionId--;
  }
  if (currQuestionId == 9) {
    document.getElementById(prev_id).style.display = "none";
  }
  let ele_id = "qbox" + currQuestionId;
  document.getElementById(ele_id).style.display = "inherit";

  let doneQ = getQuestionTouched();
  let doneQList_html = "";
  doneQ.forEach(function(doneQ_sub) {
    doneQList_html += doneQ_sub + " ";
  });
  document.getElementById("doneQList").innerHTML = doneQList_html;
  document.getElementById("doneQNum").innerHTML = getQuestionTouched().length;


  let prevbtns = document.getElementsByClassName("prevbtn");
  let nextbtns = document.getElementsByClassName("nextbtn");
  let skipbtns = document.getElementsByClassName("skipbtn");
  let submbtns = document.getElementsByClassName("submbtn");

  if (currQuestionId != 0) {
    for (let i = 0; i < prevbtns.length; i++) {
      prevbtns[i].disabled = false;
    }
  } else {
    for (let i = 0; i < prevbtns.length; i++) {
      prevbtns[i].disabled = true;
    }
  }
  if (currQuestionId == 9) {
    for (let i = 0; i < nextbtns.length; i++) {
      nextbtns[i].disabled = true;
    }
    for (let i = 0; i < nextbtns.length; i++) {
      skipbtns[i].disabled = true;
    }
    for (let i = 0; i < submbtns.length; i++) {
      submbtns[i].style.display = "inline-block";
    }
  } else {
    for (let i = 0; i < nextbtns.length; i++) {
      nextbtns[i].disabled = false;
    }
    for (let i = 0; i < nextbtns.length; i++) {
      skipbtns[i].disabled = false;
    }
    for (let i = 0; i < submbtns.length; i++) {
      submbtns[i].style.display = "none";
    }
  }

  if (currQuestionId !== 9) {
    toggleBtnDisable(currQuestionId);
  }
}

var interval;

function startTimer() {
  let timeSpan = document.getElementById("curTime");
  let now = new Date().getTime();
  let deadline = timeLeft * 1000 + now;

  interval = setInterval(() => {
    let currentTime = new Date().getTime();
    let distance = deadline - currentTime;

    if (distance <= 60 * 1000) {
      // this.messageService.add({ severity: 'error', summary: '1 MINUTE LEFT!', life: 10000, detail: 'You have only one minute left for this quiz!' });
      document.getElementById("timer").style.color = "red";
    }
    // if (timeLeft > 0) {
    //     timeLeft--;
    // } else {
    //     // this.timeLeft = 600;
    //     // location.reload();
    //     submitQuiz();
    // }

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeSpan.innerHTML = minutes.toString().padStart(2, '0') + " : " + seconds.toString().padStart(2, '0') + " left";

    if (distance <= 0) {
      submitQuiz();
    }
  }, 200);
}

function submitQuiz() {
  quizSubmitted = true;
  // timeLeft = 0;
  clearInterval(interval);
  document.getElementById("curTime").innerHTML = "00 : 00 left";
  document.getElementById("timer").style.color = "red";
  document.getElementById("quizContent").style.display = "none";
  document.getElementById("summaryBox").style.display = "block";
  document.getElementById("doneQNum").innerHTML = getQuestionTouched().length;

  document.getElementById("score").innerHTML = getScore();

  let sumBox = document.getElementById("summaryBox");
  let sumBox_html = "";

  questionToDo.forEach(function(q) {
    sumBox_html += "<div style='margin-bottom:1em;' class='qBoxB'>";

    sumBox_html += "<div class='qrow' style='font-weight: bold; background-color : #f4f4f4'><p>Question " + (questionToDo.indexOf(q) + 1) + " (" + getQuestionType(q.type) + ")";
    sumBox_html += "<span style='color : " + (validateAns(questionToDo.indexOf(q)) ? "green" : "red") + "'>" + (validateAns(questionToDo.indexOf(q)) ? " Correct" : " Wrong") + "</span></p></div>";

    let q_content_html = "<div style='font-weight : bold' class='qrow'>";
    let q_content = q.question_content;
    q_content.forEach(function(q_sub) {
      if (q_sub.type == "text") {
        q_content_html += "<p>" + q_sub.content + "</p>";
      } else if (q_sub.type == "image") {
        q_content_html +=
          "<img class='qImgBorder' height='120px' style='margin-left: 2em' src='" +
          q_sub.content +
          "' />";
      } else if (q_sub.type == "code") {
        q_content_html +=
          "<span><pre><xmp>" + q_sub.content + "</xmp></pre></span>";
      }
    });
    q_content_html += "</div>";
    sumBox_html += q_content_html;

    let option_html = "<div class='qrowOpt'>";
    let options = q.options;
    if (q.type == "tf") {
      options.forEach(function(option) {
        option_html += "<div style='display: flex; align-items: flex-start; margin-bottom: 1em;'>";
        option_html += "<input type='radio' value='" + option.option_id + "' disabled " + (q.selected == option.option_id ? "checked" : "") + "/>";
        option_html += "<div style='display: flex; flex-direction: column; margin-left: 0.5em;'>";
        option_html +=
          "<span style='color : " +
          getSumOptColor(questionToDo.indexOf(q), option.option_id) +
          "; font-weight : " +
          getSumOptWeight(questionToDo.indexOf(q), option.option_id) +
          ";'>";
        option_html += option.option_content == true ? "True" : "False";
        option_html += "</span></div></div>";
      });
    } else if (q.type == "sc") {
      options.forEach(function(option) {
        option_html +=
          "<div style='display: flex; align-items: center; margin-bottom: 1em;'>";
        option_html +=
          "<input type='radio' value='" + option.option_id + "' disabled " + (q.selected == option.option_id ? "checked" : "") + " />";
        option_html +=
          "<div style='display: flex; flex-direction: column; margin-left: 0.5em; color : " +
          getSumOptColor(questionToDo.indexOf(q), option.option_id) +
          "; font-weight : " +
          getSumOptWeight(questionToDo.indexOf(q), option.option_id) +
          ";'>";
        let option_sub_html = "";
        let option_contents = option.option_content;
        option_contents.forEach(function(opt_sub) {
          if (opt_sub.type == "text") {
            option_sub_html += "<p>" + opt_sub.content + "</p>";
          } else if (opt_sub.type == "image") {
            option_sub_html += "<img class='qImgBorder' height='120px' src='" + opt_sub.content + "' style='border-color :" + (getSumOptColor(questionToDo.indexOf(q), option.option_id) == "inherit" ? "grey" : getSumOptColor(questionToDo.indexOf(q), option.option_id)) + ";' />";
          } else if (opt_sub.type == "code") {
            option_sub_html += "<p><xmp>" + opt_sub.content + "</xmp></p>";
          }
        });
        option_html += option_sub_html;
        option_html += "</div></div>";
      });
    } else if (q.type == "mc") {
      options.forEach(function(option) {
        option_html +=
          "<div style='display: flex; align-items: center; margin-bottom: 1em;'>";
        option_html +=
          "<input type='checkbox' value='" + option.option_id + "' disabled " + (q.selected.includes((option.option_id).toString()) ? "checked" : "") + " />";
        option_html +=
          "<div style='display: flex; flex-direction: column; margin-left: 0.5em; color : " +
          getSumOptColor(questionToDo.indexOf(q), option.option_id) +
          "; font-weight : " +
          getSumOptWeight(questionToDo.indexOf(q), option.option_id) +
          ";'>";
        let option_sub_html = "";
        let option_contents = option.option_content;
        option_contents.forEach(function(opt_sub) {
          if (opt_sub.type == "text") {
            option_sub_html += "<p>" + opt_sub.content + "</p>";
          } else if (opt_sub.type == "image") {
            option_sub_html += "<img class='qImgBorder' height='120px' src='" + opt_sub.content + "' style='border-color :" + (getSumOptColor(questionToDo.indexOf(q), option.option_id) == "inherit" ? "grey" : getSumOptColor(questionToDo.indexOf(q), option.option_id)) + ";' />";
          } else if (opt_sub.type == "code") {
            option_sub_html += "<p><xmp>" + opt_sub.content + "</xmp></p>";
          }
        });
        option_html += option_sub_html;
        option_html += "</div></div>";
      });
    }
    option_html += "</div>";
    sumBox_html += option_html;

    sumBox_html += "</div>";
  });

  sumBox_html +=
    "<div style='text-align: center; margin-bottom: 120px;' class='doNotPrint'>";
  sumBox_html +=
    "<button type='button' class='ui-button' onclick='printComponent()' style='width:6em;'><i class='fas fa-print'></i> Print</button>";
  sumBox_html +=
    "<button type='button' class='ui-button' onclick='reDoTest()' style='margin-left: 0.5em; width:6em;'><i class='fas fa-redo'></i> Retry</button></div>";

  sumBox.innerHTML += sumBox_html;

  let doneQ = getQuestionTouched();
  let doneQList_html = "";
  doneQ.forEach(function(doneQ_sub) {
    doneQList_html += doneQ_sub + " ";
  });
  document.getElementById("doneQList").innerHTML = doneQList_html;
  document.getElementById("doneQNum").innerHTML = getQuestionTouched().length;
}

function reloadTest() {
  location.reload();
}

function chooseQuestions() {
  let res = [];
  let len = questionBase.length;

  let tfs = questionBase.filter(q => q.type == "tf");
  let scs = questionBase.filter(q => q.type == "sc");
  let mcs = questionBase.filter(q => q.type == "mc");

  res.push(tfs[getRandomInt(tfs.length)]);
  res.push(scs[getRandomInt(tfs.length)]);
  res.push(mcs[getRandomInt(tfs.length)]);

  res.forEach(item => {
    if (item.type != "mc") {
      item.selected = null;
    } else {
      item.selected = [];
    }
    item.options = shuffle(item.options);
  });

  let idsNow = res.map(item => item.question_id);
  let leftQuestions = questionBase.filter(
    item => !idsNow.includes(item.question_id)
  );

  let res2 = [];

  for (let i = 0; i < len - 3; i++) {
    // let cur_num = questionBase[i];
    let cur_num = leftQuestions[i];
    if (cur_num.type != "mc") {
      cur_num.selected = null;
    } else {
      cur_num.selected = [];
    }

    cur_num.options = shuffle(cur_num.options);
    // let cur_num = i;
    if (i < questionAmount - 3) {
      res2.push(cur_num);
    } else {
      let tmp = getRandomInt(len - 3);
      if (tmp < questionAmount - 3) {
        res2[tmp] = cur_num;
      }
    }
  }

  res2.forEach(item => {
    res.push(item);
  });

  res = shuffle(res);
  console.log("Index for questions", res);
  questionToDo = res;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randRange(min, max) {
  return Math.floor(Math.random() * Math.floor(max - min) + min);
}

function swapAt(i, j, array) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}

function shuffle(array) {
  for (let i = 0; i < array.length; i++) {
    swapAt(i, randRange(i, array.length), array);
  }
  console.log("Shuffled options", array);
  return array;
}

function getQuestionType(type) {
  let res;
  if (type == "tf") {
    res = "True/False";
  } else if (type == "sc") {
    res = "Single choice";
  } else if (type == "mc") {
    res = "Multiple choice";
  } else {
    res = "Invalid type";
  }
  return res;
}

function getFuncForSubmit() {
  let qNotDone = [];
  for (let i = 0; i < questionAmount; i++) {
    if (questionToDo[i].type == "mc") {
      if (questionToDo[i].selected.length === 0) {
        qNotDone.push(i);
      }
    } else {
      if (!questionToDo[i].selected) {
        qNotDone.push(i);
      }
    }
  }
  qNotDone.length === 0 ? submitQuiz() : confirmToSubmitQuiz(qNotDone);
}

function getQuestionTouched() {
  let res = [];
  for (let i = 0; i < questionAmount; i++) {
    if (questionToDo[i].type == "mc") {
      if (questionToDo[i].selected.length !== 0) {
        // if (i !== questionAmount - 1) {
          res.push(i + 1);
        // }
      }
    } else {
      if (questionToDo[i].selected) {
        // if (i !== questionAmount - 1) {
          res.push(i + 1);
        // }
      }
    }
  }
//   console.log("Questions have been done", res);
  return res;
}

function validateAns(index) {
  let keys = questionToDo[index].options.filter(opt => opt.option_answer).map(opt => (opt.option_id).toString());

  console.log("Q" + index, questionToDo[index].selected);
  
  if (questionToDo[index].type == "mc") {
    for (let i = 0; i < keys.length; i++) {
      if (!questionToDo[index].selected.includes(keys[i])) {
        return false;
      }
    }

    for (let i = 0; i < questionToDo[index].selected.length; i++) {
      if (!keys.includes(questionToDo[index].selected[i])) {
        return false;
      }
    }
  } else {
    if (questionToDo[index].selected !== keys[0]) {
      return false;
    }
  }

  return true;
}

function getScore() {
  let score = 0;

  for (let i = 0; i < questionAmount; i++) {
    if (validateAns(i)) {
      score++;
    }
  }

  return score;
}

function printComponent() {
  // let printContents = document.getElementById(cmpName).innerHTML;
  // let originalContents = document.body.innerHTML;
  // document.body.innerHTML = printContents;

  window.print();

  // document.body.innerHTML = originalContents;
}

function getSumOptColor(q_id, opt_id) {
  let option = questionToDo[q_id].options.filter(
    opt => opt.option_id == opt_id
  );
  if (option[0].option_answer) {
    return "green";
  } else {
    if (
      questionToDo[q_id].type == "mc" &&
      questionToDo[q_id].selected.includes(opt_id.toString())
    ) {
      return "red";
    } else if (
      questionToDo[q_id].type != "mc" &&
      questionToDo[q_id].selected == opt_id.toString()
    ) {
      return "red";
    } else {
      return "inherit";
    }
  }
}

function getSumOptWeight(q_id, opt_id) {
  let option = questionToDo[q_id].options.filter(
    opt => opt.option_id == opt_id
  );
  if (option[0].option_answer) {
    return "bold";
  } else {
    if (
      questionToDo[q_id].type == "mc" &&
      questionToDo[q_id].selected.includes(opt_id.toString())
    ) {
      return "bold";
    } else if (
      questionToDo[q_id].type != "mc" &&
      questionToDo[q_id].selected == opt_id.toString()
    ) {
      return "bold";
    } else {
      return "inherit";
    }
  }
}

function handleOptionClick(ele, q_index) {
    console.log("See param", ele.value, ele.checked, ele.type, "Question ID: ", q_index);
    let nextbtns = document.getElementsByClassName("nextbtn");
    let skipbtns = document.getElementsByClassName("skipbtn");

    if (ele.type == "checkbox") {
        ele.checked ? questionToDo[q_index].selected.push(ele.value) : questionToDo[q_index].selected = questionToDo[q_index].selected.filter(opt => opt != ele.value);
        if (q_index !== 9) {
            if (questionToDo[q_index].selected.length === 0) {
                nextbtns[0].disabled = true;
                skipbtns[0].disabled = false;

            } else {
                nextbtns[0].disabled = false;
                skipbtns[0].disabled = true;
            }
        }
    } else if (ele.type == "radio") {
        questionToDo[q_index].selected = ele.value;
        if (q_index !== 9) {
            if (questionToDo[q_index].selected) {
                nextbtns[0].disabled = false;
                skipbtns[0].disabled = true;
            } else {
                nextbtns[0].disabled = true;
                skipbtns[0].disabled = false;
            }
        }
    }

    let doneQ = getQuestionTouched();
    let doneQList_html = "";
    doneQ.forEach(function(doneQ_sub) {
      doneQList_html += doneQ_sub + " ";
    });
    document.getElementById("doneQList").innerHTML = doneQList_html;
    document.getElementById("doneQNum").innerHTML = getQuestionTouched().length;
}

function toggleBtnDisable(q_id) {
    let nextbtns = document.getElementsByClassName("nextbtn");
    let skipbtns = document.getElementsByClassName("skipbtn");

    if (questionToDo[q_id].type == "mc") {
        if (questionToDo[q_id].selected.length === 0) {
            nextbtns[0].disabled = true;
            skipbtns[0].disabled = false;

        } else {
            nextbtns[0].disabled = false;
            skipbtns[0].disabled = true;
        }
    } else {
        if (questionToDo[q_id].selected == null) {
            nextbtns[0].disabled = true;
            skipbtns[0].disabled = false;
        } else {
            nextbtns[0].disabled = false;
            skipbtns[0].disabled = true;
        }
    }
}

function reDoTest() {
    submitted = true;
    timeLeft = 120;
    quizSubmitted = false;
    // clearInterval(interval);
    chooseQuestions();
    currQuestionId = 0;

    document.getElementById("quizbox").style.display = "block";
    document.getElementById("quizContent").innerHTML = "";
    submitForm();
    document.getElementById("doneQList").innerHTML = "";
    document.getElementById("doneQNum").innerHTML = 0;
    document.getElementById("quizContent").style.display = "block";
    document.getElementById("summaryBox").innerHTML = "<h1 style='font-style: italic; text-align: center;'>Score <span id='score'>0</span>/10</h1>";
    document.getElementById("summaryBox").style.display = "none";
}
