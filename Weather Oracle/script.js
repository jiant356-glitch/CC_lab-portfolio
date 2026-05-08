const generateBtn = document.getElementById("gen-btn");
const container = document.getElementById("fortune-container");

// 12张塔罗牌
const tarotCards = [
  { name: "The Fool", message: "A new path is opening.", image: "images/fool.png" },
  { name: "The Magician", message: "You have the tools you need.", image: "images/magician.png" },
  { name: "The High Priestess", message: "Trust your intuition.", image: "images/high-priestess.png" },
  { name: "The Empress", message: "Be patient and let things grow.", image: "images/empress.png" },
  { name: "The Emperor", message: "You may need structure.", image: "images/emperor.png" },
  { name: "The Hierophant", message: "Look for guidance, tradition, or advice.", image: "images/hierophant.png" },
  { name: "The Lovers", message: "This is about choices and values.", image: "images/lovers.png" },
  { name: "The Chariot", message: "Move forward with focus.", image: "images/chariot.png" },
  { name: "Strength", message: "Stay calm and strong.", image: "images/strength.png" },
  { name: "The Hermit", message: "Take time to reflect.", image: "images/hermit.png" },
  { name: "Wheel of Fortune", message: "Change is coming.", image: "images/wheel-of-fortune.png" },
  { name: "Justice", message: "Be honest with yourself before choosing.", image: "images/justice.png" },
  { name: "The Hanged Man", message: "Pause and look from another angle.", image: "images/hanged-man.png" },
  { name: "Death", message: "An ending creates a new beginning.", image: "images/death.png" },
  { name: "Temperance", message: "Find balance before you act.", image: "images/temperance.png" },
  { name: "The Devil", message: "Notice what is holding you back.", image: "images/devil.png" },
  { name: "The Tower", message: "Something unstable may need to fall.", image: "images/tower.png" },
  { name: "The Star", message: "Hope is still there.", image: "images/star.png" },
  { name: "The Moon", message: "Things are unclear. Trust your intuition.", image: "images/moon.png" },
  { name: "The Sun", message: "Clarity and joy are close.", image: "images/sun.png" },
  { name: "Judgement", message: "It may be time to wake up to a truth.", image: "images/judgement.png" },
  { name: "The World", message: "A cycle is completing.", image: "images/world.png" }
];

async function generateFortune() {

  // 获取天气
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current_weather=true"
  );

  const data = await response.json();
  const weather = data.current_weather;

  const temperature = weather.temperature;
  const weatherCode = weather.weathercode;

  // 天气/mood
  let mood = "";

  if (weatherCode === 0) {
    mood = "The sky is clear.";
  } else if (weatherCode <= 3) {
    mood = "Clouds are present.";
  } else if (weatherCode >= 51 && weatherCode <= 67) {
    mood = "Rain is falling.";
  } else {
    mood = "The weather is unstable.";
  }

  // 随机抽塔罗牌
  const randomIndex = Math.floor(Math.random() * tarotCards.length);
  const card = tarotCards[randomIndex];

  // 清空容器
  container.innerHTML = "";

  // 创建元素

  const title = document.createElement("h2");
  title.innerText = "Message from the Sky";

  const tempText = document.createElement("p");
  tempText.innerText = "Temperature: " + temperature + "°C";

  const moodText = document.createElement("p");
  moodText.innerText = mood;

  const cardImg = document.createElement("img");
cardImg.src = card.image;
cardImg.alt = card.name;
cardImg.classList.add("tarot-card");

  const cardName = document.createElement("h3");
  cardName.innerText = card.name;

  const cardMsg = document.createElement("p");
  cardMsg.innerText = card.message;

  // 加到页面上
 container.appendChild(title);
container.appendChild(tempText);
container.appendChild(moodText);
container.appendChild(cardImg);
container.appendChild(cardName);
container.appendChild(cardMsg);
}

// 点击按钮触发
generateBtn.addEventListener("click", generateFortune);