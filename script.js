
const gameContainer = document.getElementById("game-container");
const result = document.getElementById("result");
const timerInput = document.getElementById("timer");
const startGameButton = document.getElementById("start-game");
const countdownDisplay = document.getElementById("countdown");
const playButton = document.getElementById("play-button");
const aboutButton = document.getElementById("about-button");
const aboutModal = document.getElementById("about-modal");
const closeModal = document.getElementById("close-modal");
const mainMenu = document.getElementById("main-menu");
const settings = document.getElementById("settings");

let circles = [];
let timer;
let circleIndex = 1; // لترقيم الدوائر
let isGameActive = false; // حالة اللعبة
let countdown; // المتغير الخاص بالعد التنازلي
const maxCircles = 2; // الحد الأقصى للدوائر

// بدء اللعبة
playButton.addEventListener("click", () => {
    mainMenu.style.display = "none"; // إخفاء القائمة الرئيسية
    settings.style.display = "block"; // إظهار إعدادات اللعبة
});

// إظهار نافذة المعلومات
aboutButton.addEventListener("click", () => {
    aboutModal.style.display = "block";
});

// إغلاق نافذة المعلومات
closeModal.addEventListener("click", () => {
    aboutModal.style.display = "none";
});

// بدء اللعبة من إعداداتها
startGameButton.addEventListener("click", () => {
    startGame();
});

// بدء العد التنازلي
function startGame() {
    result.textContent = ""; // إعادة تعيين الرسالة
    circles = []; // إعادة تعيين الدوائر
    circleIndex = 1; // إعادة تعيين عد الدوائر
    isGameActive = false; // إعادة تعيين حالة اللعبة
    countdownDisplay.textContent = "20"; // تعيين الوقت للعد التنازلي
    gameContainer.innerHTML = ""; // إفراغ منطقة اللعبة
    gameContainer.style.display = "block"; // إظهار منطقة اللعبة

    let timeLeft = 20; // مدة العد التنازلي

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(countdown); // إنهاء العد التنازلي
            countdownDisplay.textContent = "ابدأ! برك فاي بلاصة!";
            isGameActive = true; // تفعيل اللعبة
            const duration = parseInt(timerInput.value) * 1000;
            timer = setTimeout(() => {
                pickWinner();
                isGameActive = false; // إنهاء اللعبة بعد اختيار الفائز
            }, duration);
        } else {
            countdownDisplay.textContent = timeLeft;
            timeLeft--;
        }
    }, 1000); // كل ثانية
}

// إنشاء دائرة عند الضغط
gameContainer.addEventListener("touchstart", (event) => {
    event.preventDefault(); // منع السحب الافتراضي

    // التحقق مما إذا كانت اللعبة نشطة
    if (isGameActive) {
        // التحقق من عدد الدوائر المسموح بها
        if (circles.length < maxCircles) {
            const rect = gameContainer.getBoundingClientRect();
            const x = event.touches[0].clientX - rect.left - 25; // -25 لنصف قطر الدائرة
            const y = event.touches[0].clientY - rect.top - 25;

            // التحقق من عدم الضغط في نفس المكان
            if (!circles.some(circle => {
                const circleRect = circle.getBoundingClientRect();
                return (
                    x < circleRect.right &&
                    x + 50 > circleRect.left &&
                    y < circleRect.bottom &&
                    y + 50 > circleRect.top
                );
            })) {
                // إنشاء دائرة جديدة
                const circle = document.createElement("div");
                circle.classList.add("circle");

                circle.style.left = `${x}px`;
                circle.style.top = `${y}px`;

                // إضافة الترقيم على الدائرة
                circle.textContent = circleIndex;
                circleIndex++;

                // إضافة الدائرة إلى منطقة اللعبة والمصفوفة
                gameContainer.appendChild(circle);
                circles.push(circle); // إضافة الدائرة إلى المصفوفة
            }
        }
    }
});

// دالة اختيار الفائز (يجب أن تكون هنا)
function pickWinner() {
    // منطق اختيار الفائز
    if (circles.length > 0) {
        const winnerIndex = Math.floor(Math.random() * circles.length);
        result.textContent = `رابح هو الدائرة رقم: ${circles[winnerIndex].textContent}`;
    } else {
        result.textContent = "ماكاينيش الدوائر!";
    }
}