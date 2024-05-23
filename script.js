const submitButton = document.querySelector(".search-button");
const form = document.querySelector(".ageform");
const dayInput = document.getElementById("Day");
const monthInput = document.getElementById("month");
const yearInput = document.querySelector("#year");
const yearOutput = document.querySelector(".yearview");
const monthOutput = document.querySelector(".monthsview");
const daysOutput = document.querySelector(".daysview");
const ageYears = monthInput.textContent;

form.addEventListener("submit", (e) => {
  //prevent reload page on Submit
  e.preventDefault();
  //Variables

  const birthDate = new Date(
    `${yearInput.value}/${monthInput.value}/${dayInput.value}`
  );
  const age = calculateAge(birthDate);
  let currentDay = 0;
  let currentMonth = 0;
  let currentYear = 0;
  const animationDelay = 50;

  const inputday = document.querySelector("#Day");

  //pass calculated numbers in outputs

  if (dayInput.value >= 31 && dayInput.value < 1) {
    daysOutput.innerHTML = "error";
    e.preventDefault();
  } else {
    daysOutput.innerHTML = age.days;
  }

  yearOutput.innerHTML = age.years;
  monthOutput.innerHTML = age.months;

  //Animate outputs

  function animateDays() {
    if (currentDay < age.days) {
      currentDay++;
      daysOutput.textContent = currentDay;
      setTimeout(animateDays, animationDelay + 70);
    }
  }
  function animateMonths() {
    if (currentMonth < age.months) {
      currentMonth++;
      monthOutput.textContent = currentMonth;
      setTimeout(animateMonths, animationDelay + 30);
    }
  }
  function animateYears() {
    if (currentYear < age.years) {
      currentYear++;
      yearOutput.textContent = currentYear;
      setTimeout(animateYears, animationDelay);
    }
  }
  animateDays();
  animateMonths();
  animateYears();

  //Clear Form inputs

  yearInput.value = dayInput.value = monthInput.value = "";

  //Form Error Handling
  dayInput.addEventListener("invalid", (e) => {
    // document.getElementById("Day").textContent = "fail";
    console.log("hiii");
  });
});

function calculateAge(birthDate) {
  // Get today's date
  const today = new Date();

  // Check if birthDate is a valid date object
  if (!birthDate instanceof Date) {
    throw new Error("Invalid birth date provided.");
  }

  // Calculate milliseconds in a year, month, and day
  const millisecondsPerYear = 365 * 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = 30 * 24 * 60 * 60 * 1000;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  // Calculate the difference in milliseconds between today and birth date
  const ageInMilliseconds = today.getTime() - birthDate.getTime();

  // Calculate age in years
  const years = Math.floor(ageInMilliseconds / millisecondsPerYear);

  // Calculate remaining milliseconds after removing years
  const remainingMilliseconds = ageInMilliseconds % millisecondsPerYear;

  // Calculate age in months
  const months = Math.floor(remainingMilliseconds / millisecondsPerMonth);

  // Calculate remaining milliseconds after removing months
  const remainingDays = remainingMilliseconds % millisecondsPerMonth;

  // Calculate age in days
  const days = Math.floor(remainingDays / millisecondsPerDay);

  // Return the age object
  return {
    years,
    months,
    days,
  };
}
