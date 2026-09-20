const activityLevels = [
  { label: "Restful", description: "Little to no exercise", factor: 1.2 },
  { label: "Lightly active", description: "Light exercise 1–3 days per week", factor: 1.375 },
  { label: "Moderately active", description: "Moderate exercise 3–5 days per week", factor: 1.55 },
  { label: "Very active", description: "Hard exercise 6–7 days per week", factor: 1.725 },
  { label: "Intensely active", description: "Hard training or a physical job", factor: 1.9 },
];

const form = document.querySelector("#calorie-form");
const activity = document.querySelector("#activity");
const activityValue = document.querySelector("#activity-value");
const activityDescription = document.querySelector("#activity-description");
const results = document.querySelector("#results");
const formMessage = document.querySelector("#form-message");

function updateActivity() {
  const selected = activityLevels[Number(activity.value) - 1];
  activityValue.textContent = selected.label;
  activityDescription.textContent = selected.description;
}

function readNumber(id) {
  return Number(document.querySelector(`#${id}`).value);
}

function calculateCalories(event) {
  event.preventDefault();
  const age = readNumber("age");
  const height = readNumber("height");
  const weight = readNumber("weight");
  const gender = document.querySelector("input[name='gender']:checked").value;
  const level = activityLevels[Number(activity.value) - 1];

  if (!age || !height || !weight || age < 15 || age > 100 || height < 100 || height > 250 || weight < 30 || weight > 300) {
    formMessage.textContent = "Enter realistic values: age 15–100, height 100–250 cm, and weight 30–300 kg.";
    return;
  }

  formMessage.textContent = "";
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + (gender === "male" ? 5 : -161);
  const maintain = Math.round(bmr * level.factor);
  const values = { maintain, lose: Math.round(maintain * 0.85), gain: Math.round(maintain * 1.15) };

  Object.entries(values).forEach(([key, value]) => {
    document.querySelector(`#${key}-calories`).textContent = value.toLocaleString();
  });
  results.hidden = false;
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

activity.addEventListener("input", updateActivity);
form.addEventListener("submit", calculateCalories);
document.querySelector("#reset-button").addEventListener("click", () => {
  form.reset();
  activity.value = "2";
  updateActivity();
  results.hidden = true;
  formMessage.textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
});

updateActivity();
