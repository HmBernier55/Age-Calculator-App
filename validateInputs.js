function checkMissing(inputCheck) {
  let missing = false;
  if (inputCheck.value === "") {
    let temp = document.getElementById(inputCheck.id + "-error");
    temp.textContent = "This field is required";

    const badInput = document.getElementById(inputCheck.id);
    badInput.classList.add("red-border");
    missing = true;
  }
  return missing;
}

function checkInputValues(regexVal, input, errorMess) {
  let badValue = false;
  if (!regexVal.test(input.value)) {
    let temp = document.getElementById(input.id + "-error");
    temp.textContent = errorMess;

    const badInput = document.getElementById(input.id);
    badInput.classList.add("red-border");
    badValue = true;
  }
  return badValue;
}

function validDate(maxDays, inputs) {
  let invalidDate = false;
  if (Number(inputs[0].value) > maxDays[Number(inputs[1].value)]) {
    const badDate = document.getElementById("day-date-error");
    if (
      inputs[1].value === "02" &&
      Number(inputs[2].value) % 4 === 0 &&
      Number(inputs[0].value) === 29
    ) {
      return;
    }
    badDate.textContent = "Must be a valid date";

    const badInput = document.querySelectorAll("input");
    badInput.forEach((ele) => {
      ele.classList.add("red-border");
    });
    invalidDate = true;
  }
  return invalidDate;
}

function futureDate(inputs) {
  let futDate = false;
  const inputDate = new Date(
    `${inputs[1].value} ${inputs[0].value} ${inputs[2].value}`
  );
  const todayDate = new Date();
  if (todayDate - inputDate < 0) {
    const year = document.getElementById("year-date-error");
    year.textContent = "Must be in the past";

    const badInput = document.querySelectorAll("input");
    badInput.forEach((ele) => {
      ele.classList.add("red-border");
    });
    futDate = true;
  }
  return futDate;
}
