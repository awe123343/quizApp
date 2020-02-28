const questionAmount = 10;

var email = "";
var name = "";
var questionBase;
var questionToDo;
var timeLeft = 120;
var currQuestionId = 0;


$(document).ready(function() {
  $.ajax({
    url: "./assets/quiz.json",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    type: "GET",
    success: function(result) {
      questionBase = result;
      console.log("All questions", questionBase);
      chooseQuestions();
    }
  });

  const form = $("#form")[0];
  $("#form").change(function() {
    console.log("Form valid? ", form.checkValidity());
    $("#infoSubmit").prop("disabled", !form.checkValidity());
  });

  const emailField = $("#email_input")[0];
  const nameField = $("#name_input")[0];
  const emailError = $("#email_error")[0];
  const nameError = $("#name_error")[0];

  $("#email_input").blur(function() {
    isValidEmail = emailField.checkValidity();
    if (!isValidEmail) {
      emailField.style.borderColor = "red";
      emailError.style.display = "block";
    } else {
      emailField.style.borderColor = "#ccc";
      emailError.style.display = "none";
    }
  });

  $("#name_input").blur(function() {
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
});


function showFetchedInput() {
  $("#emailFetched").html(email);
  $("#nameFetched").html(name);
}

function questionSwitch(forward) {
  let prev_id = "qbox" + currQuestionId;
  $("#" + prev_id).css("display", "none");
  if (forward) {
    currQuestionId++;
  } else {
    currQuestionId--;
  }
  if (currQuestionId == 9) {
    $("#" + prev_id).css("display", "none");
  }
  let ele_id = "qbox" + currQuestionId;
  $("#" + ele_id).css("display", "inherit");

  let doneQ = getQuestionTouched();
  let doneQList_html = "";
  doneQ.forEach(function(doneQ_sub) {
    doneQList_html += doneQ_sub + " ";
  });
  $("#doneQList").html(doneQList_html);
  $("#doneQNum").html(getQuestionTouched().length);

  let prevbtn = $(".prevbtn")[0];
  let nextbtn = $(".nextbtn")[0];
  let skipbtn = $(".skipbtn")[0];
  let submbtn = $(".submbtn")[0];

  if (currQuestionId != 0) {
      prevbtn.disabled = false;
  } else {
      prevbtn.disabled = true;
  }
  if (currQuestionId == 9) {
      nextbtn.disabled = true;
      skipbtn.disabled = true;
      submbtn.style.display = "inline-block";
  } else {
      nextbtn.disabled = false;
      skipbtn.disabled = false;
      submbtn.style.display = "none";
  }

  if (currQuestionId !== 9) {
    toggleBtnDisable(currQuestionId);
  }
}

var interval;

function startTimer() {
  let now = new Date().getTime();
  let deadline = timeLeft * 1000 + now;

  interval = setInterval(() => {
    let currentTime = new Date().getTime();
    let distance = deadline - currentTime;

    if (distance <= 60 * 1000) {
      $("#timer").css("color", "red");
    }

    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $("#curTime").html(minutes.toString().padStart(2, '0') + " : " + seconds.toString().padStart(2, '0') + " left");

    if (distance <= 0) {
      submitQuiz();
    }
  }, 200);
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
    let cur_num = leftQuestions[i];
    if (cur_num.type != "mc") {
      cur_num.selected = null;
    } else {
      cur_num.selected = [];
    }

    cur_num.options = shuffle(cur_num.options);

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

function getQuestionTouched() {
  let res = [];
  for (let i = 0; i < questionAmount; i++) {
    if (questionToDo[i].type == "mc") {
      if (questionToDo[i].selected.length !== 0) {
        res.push(i + 1);
      }
    } else {
      if (questionToDo[i].selected) {
        res.push(i + 1);
      }
    }
  }
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
  window.print();
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
    let nextbtns = $(".nextbtn");
    let skipbtns = $(".skipbtn");

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
    $("#doneQList").html(doneQList_html);
    $("#doneQNum").html(getQuestionTouched().length);
}

function toggleBtnDisable(q_id) {
    let nextbtns = $(".nextbtn");
    let skipbtns = $(".skipbtn");

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

function submitForm(e) {

  let emailField = $("#email_input");
  let nameField = $("#name_input");

  email = emailField.val();
  name = nameField.val();

  console.log(email);
  console.log(name);
  $("#loginbox").css("display", "none");
  startTimer();

  let quizContent = $("#quizContent")[0];

  questionToDo.forEach(function(q) {
    let qbox = document.createElement("div");
    qbox.className = "qBoxB";
    qbox.id = "qbox" + questionToDo.indexOf(q);
    if (questionToDo.indexOf(q) != 0) {
      qbox.style = "display : none";
    } else {
      qbox.style = "display : inherit";
    }
    
    let qTitle = document.createElement("div");
    qTitle.className = "qrow";
    qTitle.style = "background-color : #f4f4f4";
    qTitle.innerHTML = "<p>Question " + (questionToDo.indexOf(q) + 1) + " (" + getQuestionType(q.type) + ")</p>";
    qbox.appendChild(qTitle);

    let q_content_node = document.createElement("div");
    q_content_node.className = "qrow";
    let q_content = q.question_content;
    q_content.forEach(function(q_sub) {
      if (q_sub.type == "text") {
        let textNode = document.createElement("p");
        textNode.innerHTML = q_sub.content;
        q_content_node.appendChild(textNode);
      } else if (q_sub.type == "image") {
        let imgNode = document.createElement("img");
        imgNode.className = "qImgBorder";
        imgNode.height = 120;
        imgNode.style = "margin-left : 2em";
        imgNode.src = q_sub.content;
        q_content_node.appendChild(imgNode);
      } else if (q_sub.type == "code") {
        let codeNode = document.createElement("span");
        codeNode.innerHTML = "<pre><xmp>" + q_sub.content + "</xmp></pre>";
        q_content_node.appendChild(codeNode);
      }
    });
    qbox.appendChild(q_content_node);

    let optionNode = document.createElement("div");
    optionNode.className = "qrowOpt";
    let options = q.options;
    if (q.type == "tf") {
      options.forEach(function(option) {
        let optionContentNode = document.createElement("div");
        optionContentNode.style = "display :flex; align-items: center; margin-bottom: 1em;"
        let optionInputNode = document.createElement("input");
        optionInputNode.type = "radio";
        optionInputNode.name = q.question_id;
        optionInputNode.value = option.option_id;
        optionInputNode.setAttribute("onclick", "handleOptionClick(this, " + questionToDo.indexOf(q) + ")");
        optionContentNode.appendChild(optionInputNode);
        let suboptionNode = document.createElement("div");
        suboptionNode.style = "display: flex; flex-direction: column; margin-left: 0.5em;";
        suboptionNode.innerHTML = option.option_content == true ? "True" : "False";
        optionContentNode.appendChild(suboptionNode);
        optionNode.appendChild(optionContentNode);
      });
    } else {
      options.forEach(function(option) {
        let optionContentNode = document.createElement("div");
        optionContentNode.style = "display :flex; align-items: center; margin-bottom: 1em;"
        let optionInputNode = document.createElement("input");
        if (q.type == "sc") optionInputNode.type = "radio";
        else if (q.type == "mc") optionInputNode.type = "checkbox";
        optionInputNode.name = q.question_id;
        optionInputNode.value = option.option_id;
        optionInputNode.setAttribute("onclick", "handleOptionClick(this, " + questionToDo.indexOf(q) + ")");
        optionContentNode.appendChild(optionInputNode);
        let suboptionNode = document.createElement("div");
        suboptionNode.style = "display: flex; flex-direction: column; margin-left: 0.5em;";

        let option_contents = option.option_content;
        option_contents.forEach(function(opt_sub) {
          if (opt_sub.type == "text") {
            let textNode = document.createElement("p");
            textNode.innerHTML = opt_sub.content;
            suboptionNode.appendChild(textNode);
          } else if (opt_sub.type == "image") {
            let imgNode = document.createElement("img");
            imgNode.className = "qImgBorder";
            imgNode.height = 120;
            imgNode.src = opt_sub.content;
            suboptionNode.appendChild(imgNode);
          } else if (opt_sub.type == "code") {
            let codeNode = document.createElement("p");
            codeNode.innerHTML = "<xmp>" + opt_sub.content + "</xmp>";
            suboptionNode.appendChild(codeNode);
          }
        });

        optionContentNode.appendChild(suboptionNode);
        optionNode.appendChild(optionContentNode);
      });
    }
    qbox.appendChild(optionNode);
    quizContent.append(qbox);
  });

  let btns = document.createElement("div");
  btns.style = "margin-top: 2em; display: flex; justify-content: center;";
  let prevbtnNode = document.createElement("button");
  prevbtnNode.className = "ui-button prevbtn";
  prevbtnNode.style = "margin-right: .5em; width:6.5em";
  prevbtnNode.setAttribute("onclick", "questionSwitch(false)");
  prevbtnNode.disabled = true;
  prevbtnNode.innerHTML = "<i class='fas fa-arrow-left'></i> Previous";
  btns.appendChild(prevbtnNode);
  let nextbtnNode = document.createElement("button");
  nextbtnNode.className = "ui-button nextbtn";
  nextbtnNode.style = "margin-right: .5em; width:6.5em";
  nextbtnNode.setAttribute("onclick", "questionSwitch(true)");
  nextbtnNode.disabled = true;
  nextbtnNode.innerHTML = "<i class='fas fa-arrow-right'></i> Next";
  btns.appendChild(nextbtnNode);
  let skipbtnNode = document.createElement("button");
  skipbtnNode.className = "ui-button skipbtn";
  skipbtnNode.style = "margin-right: .5em; width:6.5em";
  skipbtnNode.setAttribute("onclick", "questionSwitch(true)");
  skipbtnNode.innerHTML = "<i class='fas fa-fast-forward'></i> Skip";
  btns.appendChild(skipbtnNode);
  let submbtnNode = document.createElement("button");
  submbtnNode.className = "ui-button submbtn";
  submbtnNode.style = "margin-right: .5em; width:6.5em; display : none";

  submbtnNode.setAttribute("onclick", "submitQuiz()");
  submbtnNode.innerHTML = "<i class='fas fa-upload'></i> Submit";
  btns.appendChild(submbtnNode);

  quizContent.append(btns);
  $("#quizbox").css("display", "inherit");
  showFetchedInput();

  return false;
}

function submitQuiz() {
  clearInterval(interval);
  $("#curTime").html("00 : 00 left");
  $("#timer").css("color", "red");
  $("#quizContent").css("display", "none");
  $("#summaryBox").css("display", "block");
  $("#doneQNum").html(getQuestionTouched().length);

  $("#score").html(getScore());

  let sumBox = $("#summaryBox")[0];

  questionToDo.forEach(function(q) {
    let qbox = document.createElement("div");
    qbox.className = "qBoxB";
    qbox.style = "margin-bottom:1em;";

    let qTitle = document.createElement("div");
    qTitle.className = "qrow";
    qTitle.style = "background-color : #f4f4f4";
    let qTitleIdx = document.createElement("p");
    qTitleIdx.innerHTML = "Question " + (questionToDo.indexOf(q) + 1) + " (" + getQuestionType(q.type) + ")";
    let qTitleRes = document.createElement("span");
    qTitleRes.style.color = validateAns(questionToDo.indexOf(q)) ? "green" : "red";
    qTitleRes.innerHTML = validateAns(questionToDo.indexOf(q)) ? " Correct" : " Wrong";
    qTitleIdx.appendChild(qTitleRes);
    qTitle.append(qTitleIdx);
    qbox.appendChild(qTitle);

    let q_content_node = document.createElement("div");
    q_content_node.className = "qrow";
    let q_content = q.question_content;
    q_content.forEach(function(q_sub) {
      if (q_sub.type == "text") {
        let textNode = document.createElement("p");
        textNode.innerHTML = q_sub.content;
        q_content_node.appendChild(textNode);
      } else if (q_sub.type == "image") {
        let imgNode = document.createElement("img");
        imgNode.className = "qImgBorder";
        imgNode.height = 120;
        imgNode.style = "margin-left : 2em";
        imgNode.src = q_sub.content;
        q_content_node.appendChild(imgNode);
      } else if (q_sub.type == "code") {
        let codeNode = document.createElement("span");
        codeNode.innerHTML = "<pre><xmp>" + q_sub.content + "</xmp></pre>";
        q_content_node.appendChild(codeNode);
      }
    });
    qbox.appendChild(q_content_node);

    let optionNode = document.createElement("div");
    optionNode.className = "qrowOpt";
    let options = q.options;
    if (q.type == "tf") {
      options.forEach(function(option) {
        let optionContentNode = document.createElement("div");
        optionContentNode.style = "display :flex; align-items: center; margin-bottom: 1em;"
        let optionInputNode = document.createElement("input");
        optionInputNode.type = "radio";
        optionInputNode.disabled = true;
        optionInputNode.checked = q.selected == option.option_id;
        optionInputNode.value = option.option_id;
        optionContentNode.appendChild(optionInputNode);
        let suboptionNode = document.createElement("div");
        suboptionNode.style = "display: flex; flex-direction: column; margin-left: 0.5em;";
        let optionTextNode = document.createElement("span");
        optionTextNode.style.color = getSumOptColor(questionToDo.indexOf(q), option.option_id);
        optionTextNode.style.fontWeight = getSumOptWeight(questionToDo.indexOf(q), option.option_id);
        optionTextNode.innerHTML = option.option_content == true ? "True" : "False";
        suboptionNode.appendChild(optionTextNode);
        optionContentNode.appendChild(suboptionNode);
        optionNode.appendChild(optionContentNode);
      });
    } else {
      options.forEach(function(option) {
        let optionContentNode = document.createElement("div");
        optionContentNode.style = "display :flex; align-items: center; margin-bottom: 1em;"
        let optionInputNode = document.createElement("input");
        if (q.type == "sc") optionInputNode.type = "radio";
        else if (q.type == "mc") optionInputNode.type = "checkbox";
        optionInputNode.disabled = true;
        optionInputNode.checked = q.selected == option.option_id;
        optionInputNode.value = option.option_id;
        optionContentNode.appendChild(optionInputNode);
        let suboptionNode = document.createElement("div");
        suboptionNode.style = "display: flex; flex-direction: column; margin-left: 0.5em;";
        suboptionNode.style.color = getSumOptColor(questionToDo.indexOf(q), option.option_id);
        suboptionNode.style.fontWeight = getSumOptWeight(questionToDo.indexOf(q), option.option_id);
        let option_contents = option.option_content;
        option_contents.forEach(function(opt_sub) {
          if (opt_sub.type == "text") {
            let textNode = document.createElement("p");
            textNode.innerHTML = opt_sub.content;
            suboptionNode.appendChild(textNode);
          } else if (opt_sub.type == "image") {
            let imgNode = document.createElement("img");
            imgNode.className = "qImgBorder";
            imgNode.height = 120;
            imgNode.src = opt_sub.content;
            imgNode.style.borderColor = getSumOptColor(questionToDo.indexOf(q), option.option_id) == "inherit" ? "grey" : getSumOptColor(questionToDo.indexOf(q), option.option_id);
            suboptionNode.appendChild(imgNode);
          } else if (opt_sub.type == "code") {
            let codeNode = document.createElement("p");
            codeNode.innerHTML = "<xmp>" + opt_sub.content + "</xmp>";
            suboptionNode.appendChild(codeNode);
          }
        });

        optionContentNode.appendChild(suboptionNode);
        optionNode.appendChild(optionContentNode);
      });
    }
    qbox.appendChild(optionNode);
    sumBox.append(qbox);
  });

  let btns = document.createElement("div");
  btns.style = "text-align: center; margin-bottom: 120px;";
  btns.className = "doNotPrint";
  let printBtn = document.createElement("button");
  printBtn.className = "ui-button";
  printBtn.style = "width:6em";
  printBtn.setAttribute("onclick", "printComponent()");
  printBtn.innerHTML = "<i class='fas fa-print'></i> Print";
  btns.appendChild(printBtn);
  let retryBtn = document.createElement("button");
  retryBtn.className = "ui-button";
  retryBtn.style = "margin-left: .5em; width:6em";
  retryBtn.setAttribute("onclick", "reDoTest()");
  retryBtn.innerHTML = "<i class='fas fa-redo'></i> Retry";
  btns.appendChild(retryBtn);
  
  sumBox.append(btns);

  let doneQ = getQuestionTouched();
  let doneQList_html = "";
  doneQ.forEach(function(doneQ_sub) {
    doneQList_html += doneQ_sub + " ";
  });
  $("#doneQList").html(doneQList_html);
  $("#doneQNum").html(getQuestionTouched().length);
}

function reDoTest() {
    timeLeft = 120;
    chooseQuestions();
    currQuestionId = 0;

    $("#quizbox").css("css", "block");
    $("#quizContent").html("");
    submitForm();
    $("#doneQList").html("");
    $("#doneQNum").html("0");
    $("#quizContent").css("display", "block");
    $("#score").html("0");
    $("#summaryBox").css("display", "none");
}
