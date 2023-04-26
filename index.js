/**
 * TODO:
 * Clear board of all error messages at the beginning of the calculateAge function
 * Validate each number to ensure they are possible
 * -> Day: No numbers greater than 31 or less than or equal to zero
 * -> Month: No numbers greater than 12 or less than or equal to zero
 * -> Year: No numbers greater than present year or less than or equal to zero
 * Validate the date:
 * -> Make sure the date inputted is an actual date
 * Handle residual errors throughout code
 */

function calculateAge() {
  // Clears the residual error messages and colors
  const errorMess = document.querySelectorAll(".display-error");
  const removeBorder = document.querySelectorAll(".red-border");

  errorMess.forEach((ele) => {
    ele.textContent = "";
  });

  removeBorder.forEach((ele) => {
    ele.classList.remove("red-border");
  });

  // Global Variables
  const regexArr = [
    /(^0[1-9]$)|(^[1-2][0-9]$)|(^3[0-1]$)/,
    /(^0[1-9]$)|(^1[0-2]$)/,
    /[0-9]{4}/,
  ];

  const dateErrorMess = [
    "Must be a valid day",
    "Must be a valid month",
    "Must be four numbers",
  ];

  const maxDays = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };

  const inputs = document.querySelectorAll("input");

  /**
   * TASK 1: Check the values of the inputs and displays an error message if they are empty
   *                                    and
   * TASK 2: Validate each input and displays an error message if they are not plausible
   * -> Making sure the user inputs numbers
   * -> Making sure the user inputs feasible numbers for day (1 <= x <= 31) and month (1 <= x <= 12)
   * -> Making sure the user enters 4 numbers for the year
   */

  let count = 0;
  for (let i = 0; i < inputs.length; i++) {
    if (checkMissing(inputs[i])) {
      count++;
      continue;
    }
    if (checkInputValues(regexArr[i], inputs[i], dateErrorMess[i])) {
      count++;
    }
  }

  // Stops the function if there are any missing or bad values input
  if (count > 0) {
    return;
  }

  /**
   * TASK 3: Validates that the date is a real date and displays an error if it is not plausible
   * -> Different than TASK 2 because the number of days might be feasible for some months but not others
   * -> For example, entering "31" in the days input is a feasible day in a calendar month, but some months don't have 31 days
   * -> Also taking into consideration leap years for the month of February
   */

  if (validDate(maxDays, inputs)) {
    return;
  }

  /**
   * TASK 4: Validate that the date entered is in the past
   */
  if (futureDate(inputs)) {
    return;
  }

  /**
   * TASK 5: Take inputs, calculate the age, and display it on the webpage
   */
  let [inputDay, inputMonth, inputYear] = [
    Number(inputs[0].value),
    Number(inputs[1].value),
    Number(inputs[2].value),
  ];
  const todayDate = new Date();
  let [todayDay, todayMonth, todayYear] = [
    todayDate.getDate(),
    todayDate.getMonth() + 1,
    todayDate.getFullYear(),
  ];

  let numYear, numMonth, numDay;

  // Calculate age if today's month is less than input month
  if (todayMonth < inputMonth) {
    if (todayDay < inputDay) {
      numYear = todayYear - inputYear - 1;
      numMonth = 12 - inputMonth + todayMonth - 1;
      if (todayMonth === 1) {
        numDay = maxDays[12] - inputDay + todayDay;
      } else if (todayMonth === 3 && todayYear % 4 === 0) {
        numDay = maxDays[todayMonth - 1] - inputDay + todayDay + 1;
      } else {
        numDay = maxDays[todayMonth - 1] - inputDay + todayDay;
      }
    } else {
      numYear = todayYear - inputYear - 1;
      numMonth = 12 - inputMonth + todayMonth;
      numDay = todayDay - inputDay;
    }
    // Calculate age if today's month is equal to input month
  } else if (todayMonth === inputMonth) {
    if (todayDay < inputDay) {
      numYear = todayYear - inputYear - 1;
      numMonth = 12 - inputMonth + todayMonth - 1;
      if (todayMonth === 1) {
        numDay = maxDays[12] - inputDay + todayDay;
      } else if (todayMonth === 3 && todayYear % 4 === 0) {
        numDay = maxDays[todayMonth - 1] - inputDay + todayDay + 1;
      } else {
        numDay = maxDays[todayMonth - 1] - inputDay + todayDay;
      }
    } else {
      numYear = todayYear - inputYear;
      numMonth = todayMonth - inputMonth;
      numDay = todayDay - inputDay;
    }
    // Calculate age if today's month is greater than input month
  } else {
    if (todayDay < inputDay) {
      numYear = todayYear - inputYear;
      numMonth = todayMonth - inputMonth - 1;
      if (todayMonth === 1) {
        numDay = maxDays[12] - inputDay + todayDay;
      } else if (todayMonth === 3 && todayYear % 4 === 0) {
        numDay = maxDays[todayMonth - 1] - inputDay + todayDay + 1;
      } else {
        numDay = maxDays[todayMonth - 1] - inputDay + todayDay;
      }
    } else {
      numYear = todayYear - inputYear;
      numMonth = todayMonth - inputMonth;
      numDay = todayDay - inputDay;
    }
  }

  // Changing the display values
  const yearDisplay = document.getElementById("year-display");
  const monthDisplay = document.getElementById("month-display");
  const dayDisplay = document.getElementById("day-display");

  yearDisplay.textContent = String(numYear);
  monthDisplay.textContent = String(numMonth);
  dayDisplay.textContent = String(numDay);

  if (numMonth === 0 && numDay === 0) {
    alert("HAPPY BIRTHDAY!!!");
  }
}
