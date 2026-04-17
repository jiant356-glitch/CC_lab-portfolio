// ------- QUESTION 1 -----------

let q1 = document.getElementById("q1_submit");

if (q1 != undefined) {
  q1.addEventListener("click", () => {
    let selected = document.querySelector('input[name="q1"]:checked');

    if (selected) {
      localStorage.setItem("q1", selected.value);

      // 跳到下一页
      window.location.href = "page2.html";
    } 
  });
}

// ------- QUESTION 2 -----------

let q2 = document.getElementById("q2_submit");

if (q2 != undefined) {
  q2.addEventListener("click", () => {
    let selected = document.querySelector('input[name="q2"]:checked');

    if (selected) {
      localStorage.setItem("q2", selected.value);

      // 跳到下一页
      window.location.href = "page3.html";
    } 
  });
}

// ------- QUESTION 3 -----------

let q3 = document.getElementById("q3_submit");

if (q3 != undefined) {
  q3.addEventListener("click", () => {
    let q3_answer = document.getElementById("q3").value.toLowerCase().trim();

    localStorage.setItem("q3", q3_answer);

    // 跳到下一页
    window.location.href = "page4.html";
  });
}

// ------- QUESTION 4 -----------

let q4 = document.getElementById("q4_submit");

if (q4 != undefined) {
  q4.addEventListener("click", () => {
    let q4_answer = document.getElementById("q4").value;

    
    localStorage.setItem("q4", q4_answer);

    window.location.href = "page5.html";
    
  });
}
// ------- QUESTION 5 -----------


let q5 = document.getElementById("q5_submit");

if (q5 != undefined) {
  q5.addEventListener("click", () => {
    let selected = document.querySelector('input[name="q5"]:checked');

    if (selected) {
      localStorage.setItem("q5", selected.value);

      // 跳到下一页
      window.location.href = "page6.html";
    } 
  });
}

// ------- QUESTION 6 -----------


let q6 = document.getElementById("q6_submit");

if (q6 != undefined) {
  q6.addEventListener("click", () => {
    let selected = document.querySelector('input[name="q6"]:checked');

    if (selected) {
      localStorage.setItem("q6", selected.value);

      // 跳到下一页
      window.location.href = "page7.html";
    } 
  });
}

// ------- QUESTION 7 -----------
let q7 = document.getElementById("q7_submit");

if (q7 != undefined) {
  q7.addEventListener("click", () => {
    let selected = document.querySelector('input[name="q7"]:checked');

    if (selected) {
      localStorage.setItem("q7", selected.value);

      // 跳到下一页
      window.location.href = "page8.html";
    } 
  });
}

// ------- QUESTION 8-----------

let q8 = document.getElementById("q8_submit");

if (q8 != undefined) {
  q8.addEventListener("click", () => {

    let checkedOptions = document.querySelectorAll('input[name="q8"]:checked');

    

    let values = [];

    checkedOptions.forEach((item) => {
      values.push(item.value);
    });

    localStorage.setItem("q8", JSON.stringify(values));

    // 跳到结果页
    window.location.href = "results.html";
  });
}


/// ------- ANSWER -----------

let results = document.getElementById("results");

if (results != undefined) {
  let q1 = localStorage.getItem("q1");
  let q2 = localStorage.getItem("q2");
  let q3 = localStorage.getItem("q3");
  let q4 = localStorage.getItem("q4");
  let q5 = localStorage.getItem("q5");
  let q6 = localStorage.getItem("q6");
  let q7 = localStorage.getItem("q7");
  let q8 = JSON.parse(localStorage.getItem("q8"));

  let points = 0;

  function addPoints(answer) {
    if (answer == "green") {
      points -= 5;
    } else if (answer == "red") {
      points += 15;
    } else {
      points += 5;
    }
  }

  // 单选题计分
  addPoints(q1);
  addPoints(q2);
  addPoints(q5);
  addPoints(q6);
  addPoints(q7);

  // q8 计分
  if (q8) {
    q8.forEach((value) => {
      addPoints(value);
    });
  }

  // 记分系统
  let resultText = "";

  if (points <= 10) {
    resultText = "🕊 You are a peaceful pigeon. In New York, that’s honestly suspicious. I’m genuinely impressed you’re still alive.";
  } else if (points <= 35) {
    resultText = "You are an Opportunist Pigeon. You wait, observe, and strike when the timing is right.";
  } else if (points <= 60) {
    resultText = "You are a Street Pigeon. You know how to survive, adapt, and make the city work for you.";
  } else {
    resultText = "👹 You’re basically a demon! You don’t just survive in chaos—you create it. At this point, you’re not even a pigeon… you’re a problem.";
  }

  document.getElementById("results").innerHTML =
    `Score: ${points} <br><br> ${resultText}`;

  // 附加信息
  document.getElementById("extra").innerText =
    `You described yourself as "${q3}". Interesting choice. ` +
    `You flew ${q4} steps today and still achieved nothing. ` +
    `You also admitted to ${q8 ? q8.length : 0} crimes.`;
}


//restart
let reset = document.getElementById("reset");

if (reset) {
  reset.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}