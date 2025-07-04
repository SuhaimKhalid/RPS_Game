//  Intro Screen Variables START
// -----------------------------------
// Variable to get Intro Section Div
var intro_div = document.getElementById("intro");

// Variable to Show Number in Div
var number_show = document.getElementById("NS");

// Variable to Get dial_pad Div
var dial_pad = document.getElementById("dial_pad");

// Variable to Get Dial Pad Box
var Dial_pad_box = document.querySelectorAll(".Dial_box");

// Dial Pad Array
var Dial_pad_array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Virable to Start Game
var Start_game = document.getElementById("Start");
// -------------------------------------
//  Intro Screen Variables END

// -----------------------------------------------------------------------------------------------

//  Game Screen Variables START
// -----------------------
// Variable to Get Wrap Area Section
var wrap_area = document.getElementById("wrap");

// Variable to get Cancel Button
var cancel = document.getElementById("cancel");

// Variable to Show Round Number ON the Screen
var Round_number = document.getElementById("RoundNumber");

var buttonList = document.getElementById("button_list");

var Image_area = document.getElementById("Image_area");

var user_choice_img = document.getElementById("user_choice");
var computer_Choice_img = document.getElementById("computer_Choice");

// Image Sorces for Left Hand
var leftpaper = "Assets/Images/Left Hand/Left_Paper.png";
var leftrock = "Assets/Images/Left Hand/Left_Rock.png";
var leftscissor = "Assets/Images/Left Hand/Left_Scissors.png";
var leftstand = "Assets/Images/Left Hand/Left_stand.png";

// Image Sorces for Righ Hand
var rightpaper = "Assets/Images/Right Hand/Right_Paper.png";
var rightrock = "Assets/Images/Right Hand/Right_Rock.png";
var rightscissor = "Assets/Images/Right Hand/Right_Scissors.png";
var rightstand = "Assets/Images/Right Hand/Right_Stand.png";

var ComputerArray = ["Rock", "Paper", "Scissors"];

// variable to show Who Win
var Results = document.getElementById("Results");

// variabel to get Number of Rounds
var round = 5;

// array to store user Choice List
var user_choice_list = [];

// array to store computer Choice List
var computer_choice_list = [];

var result_list = [];

var Mix_array = [user_choice_list, computer_choice_list, result_list];

var lastnumber = 0;

// Variable to get Table Section
var table_section = document.getElementById("table_section");

var Table_headings = ["User Choice", "Computer Choice", "Wins"];

var t = 0;
var result = false;

// Assing Number Round To The Game Section Screen
var Round_number_Value;

// Number of wins and loses
var wins = 0;
var lose = 0;

// Varaible to increment user and computer wins
var C_N = document.getElementsByClassName("C_N")[0];
var U_N = document.getElementsByClassName("U_N")[0];

// Function Fo Button
buttonList.addEventListener("click", (event) => {
  // Check if the clicked button has the 'disabled' class, if yes, return immediately
  if (event.target.classList.contains("disabled")) {
    return;
  } else if (Round_number_Value > 0) {
    var user_Choice = event.target.getAttribute("data-index");
    var Computer_Choice =
      ComputerArray[Math.floor(Math.random() * ComputerArray.length)];

    imageRuner(user_Choice, Computer_Choice);
    disableAllDivs();
    var timer = setInterval(() => {
      t++;
      if (t === 25) {
        clearInterval(timer);
        result = true;
        enableAllDivs();
      }
      if (result == true) {
        result = false;
        t = 0;

        if (
          user_Choice == "Rock" ||
          user_Choice == "Paper" ||
          user_Choice == "Scissors"
        ) {
          user_choice_list.push(user_Choice);
          computer_choice_list.push(Computer_Choice);
          if (
            (user_Choice == "Rock" && Computer_Choice == "Scissors") ||
            (user_Choice == "Scissors" && Computer_Choice == "Paper") ||
            (user_Choice == "Paper" && Computer_Choice == "Rock")
          ) {
            Results.textContent = "You Win";
            wins++;
            round--;
            U_N.textContent = wins;
            console.log("win", wins);
          } else if (
            (user_Choice == "Rock" && Computer_Choice == "Paper") ||
            (user_Choice == "Scissors" && Computer_Choice == "Rock") ||
            (user_Choice == "Paper" && Computer_Choice == "Scissors")
          ) {
            Results.textContent = "You Lose";
            lose++;
            round--;
            C_N.textContent = lose;
            console.log("lose", lose);
          } else if (user_Choice == Computer_Choice) {
            Results.textContent = "Tie!";
            round--;
            wins++;
            lose++;
            U_N.textContent = wins;
            C_N.textContent = lose;
          }

          result_list.push(Results.textContent);

          // If Table Has No Child ELements
          if (!table_section.hasChildNodes()) {
            var table = document.createElement("table");

            table.className = "table"; //Give Table A class

            // Create A For Loop To Create Table Headings
            for (var th = 0; th < Table_headings.length; th++) {
              var table_heading = document.createElement("th"); //Create TH
              table_heading.setAttribute("data-index", th); //Set Attribute to TH
              table_heading.textContent = Table_headings[th]; //Assing the Text of the TH
              table_heading.className = "table_heading"; //Giving CLass Name to TH
              table.appendChild(table_heading); //Append TH to Main Table Tag
            }
            table_section.appendChild(table); //Append Table to Table Section

            // Create For Loop to Create Table Row
            for (var tr = 0; tr < result_list.length; tr++) {
              var table_row = document.createElement("tr");
              for (var td = 0; td < Table_headings.length; td++) {
                var table_item = document.createElement("td");
                table_item.textContent = Mix_array[td][tr];
                table_row.appendChild(table_item);
              }
              table.appendChild(table_row);
              lastnumber = tr + 1;
            }
          } else {
            var table = table_section.querySelector("table");
            for (var tr = lastnumber; tr < result_list.length; tr++) {
              var table_row = document.createElement("tr");
              for (var td = 0; td < Table_headings.length; td++) {
                var table_item = document.createElement("td");
                table_item.textContent = Mix_array[td][tr];
                table_row.appendChild(table_item);
              }

              table.appendChild(table_row);
            }
            lastnumber = result_list.length;
          }
          Round_number_Value--;
          Round_number.textContent = Round_number_Value;
          resultFunction();
        }
      }
    }, 100);
  } else {
    showModal("Game Over", "You have finished all rounds!");
  }
});

// Result Function

function resultFunction() {
  if (Round_number_Value == 0) {
    console.log("result show modal", Round_number_Value);

    var word;
    if (wins > lose) {
      word = "Win";
    } else {
      word = "Lose";
    }
    Resultmodal("Results", "You Have " + word + " The Game");
  }
}

// Function to show modal to present result of game
function Resultmodal(title, bodyText) {
  // Check if modal already exists, if yes, remove it before appending a new one
  const existingModal = document.getElementById("resultmodal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create Modal HTML
  const modalHTML = `
        <div class="modal fade" id="resultmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>${bodyText}</p>
              </div>
              <div class="modal-footer">
                <button type="button" id="Start_again" class="btn btn-secondary" data-bs-dismiss="modal">Start Again</button>
              </div>
            </div>
          </div>
        </div>
    `;

  // Append Modal to the Body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Trigger the Modal using Bootstrap's Modal API
  const modalElement = new bootstrap.Modal(
    document.getElementById("resultmodal")
  );
  modalElement.show();

  document.getElementById("Start_again").addEventListener("click", () => {
    document.body.focus();
    console.log("Start Again clicked");
    setTimeout(() => {
      location.reload();
    }, 100);
  });
}

// Function to Show Modal for when rounds end
function showModal(title, bodyText) {
  // Check if modal already exists, if yes, remove it before appending a new one
  const existingModal = document.getElementById("gameEndModal");
  if (existingModal) {
    existingModal.remove();
  }

  // Create Modal HTML
  const modalHTML = `
         <div class="modal fade" id="resultmodal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <p>${bodyText}</p>
              </div>
              <div class="modal-footer">
                <button type="button" id="Start_again" class="btn btn-secondary" data-bs-dismiss="modal">Start Again</button>
              </div>
            </div>
          </div>
        </div>
    `;

  // Append Modal to the Body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Trigger the Modal using Bootstrap's Modal API
  const modalElement = new bootstrap.Modal(
    document.getElementById("gameEndModal")
  );
  modalElement.show();

  // Function to start again game on end
  document.getElementById("Start_again").addEventListener("click", () => {
    // Move focus to body before modal closes
    document.body.focus();
    console.log("Start Again clicked");
    setTimeout(() => {
      location.reload();
    }, 100); // 100ms delay to allow log and focus change
  });
}

// Function to get Images on the Screen
function imageRuner(user_Choice, Computer_Choice) {
  user_choice_img.setAttribute("src", rightstand);
  computer_Choice_img.setAttribute("src", leftstand);

  var timer_image = 0;
  var leftRotate = 0;
  var rightrotate = 0;

  var timer = setInterval(() => {
    timer_image++;
    leftRotate += 20;
    rightrotate -= 20;

    user_choice_img.style.transform =
      "rotate(" + leftRotate + "deg) translate(0px, 0px)";
    computer_Choice_img.style.transform =
      "rotate(" + rightrotate + "deg) translate(0px, 0px)";

    if (leftRotate >= 120) {
      leftRotate = 0;
    }

    if (rightrotate <= -120) {
      rightrotate = 0;
    }

    if (timer_image >= 25) {
      switch (user_Choice) {
        case "Rock":
          user_choice_img.setAttribute("src", leftrock);
          break;
        case "Paper":
          user_choice_img.setAttribute("src", leftpaper);
          break;
        case "Scissors":
          user_choice_img.setAttribute("src", leftscissor);
          break;
      }

      switch (Computer_Choice) {
        case "Rock":
          computer_Choice_img.setAttribute("src", rightrock);
          break;
        case "Paper":
          computer_Choice_img.setAttribute("src", rightpaper);
          break;
        case "Scissors":
          computer_Choice_img.setAttribute("src", rightscissor);
          break;
      }
      clearInterval(timer);
    }
  }, 100);
}

// Function to Create Dial Pads
function DialPad_Show() {
  // Reverse Array
  var Reverse_Dial_Array = Dial_pad_array.reverse();

  // Create Multiple Dial Box
  for (var i = 0; i < Dial_pad_array.length; i++) {
    // Make Dial Boxes For Numbers
    var Dial_box = document.createElement("div");
    Dial_box.textContent = Reverse_Dial_Array[i];
    dial_pad.appendChild(Dial_box);
    Dial_box.className = "Dial_box item-" + i;
  }
}
DialPad_Show();

// Function to add Value from dial pad to Number Screen
dial_pad.addEventListener("click", (event) => {
  if (event.target.classList.contains("Dial_box")) {
    if (number_show.textContent == "Number of Rounds") {
      number_show.textContent = "";
    }
    number_show.textContent = event.target.textContent;
  }
});

// Function To Start Game
Start_game.addEventListener("click", () => {
  if (number_show.textContent != "Number of Rounds") {
    intro_div.className = "hide";
    wrap_area.className = "wrap";
    Round_number_Value = parseInt(number_show.textContent, 10);
    Round_number.textContent = Round_number_Value;
  } else {
    alert("Please Enter Number oF Rounds!");
  }
});

// Function to Go Back to Home Screen
cancel.addEventListener("click", () => {
  location.reload();
});

// Function to disable all divs
function disableAllDivs() {
  const divs = document.querySelectorAll(".RPS_btn");
  buttonList.classList.add("disabled");
  divs.forEach((div) => {
    div.classList.add("disabled");
    div.style.pointerEvents = "none"; // Disable interaction for all divs
    div.style.opacity = "0.5";
  });
}

// Function to enable all divs
function enableAllDivs() {
  const divs = document.querySelectorAll(".RPS_btn");
  buttonList.classList.remove("disabled");
  divs.forEach((div) => {
    div.classList.remove("disabled");
    div.style.pointerEvents = "auto"; // Enable interaction for all divs
    div.style.opacity = "1";
  });
}
