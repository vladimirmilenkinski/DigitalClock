function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const now = new Date();
    const timeString = now.toLocaleTimeString('bg-BG', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    const dateString = now.toLocaleDateString('bg-BG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const numbers = document.getElementsByClassName("number");
    let i = 0;
    timeString.split("").forEach((s)=> {
        if(s.match(/^[0-9]$/)){
            numbers[i++].src = `img/digit-${s}.png`;
        }
    });

    dateElement.textContent = dateString;
}

let alarmTime = null;
let vibrateTime = null;
let alarmTimeout = null;

function settingAlarm() {
    const alarmInput = document.getElementById('alarm-time');
    alarmTime = new Date(alarmInput.value);

    if (isNaN(alarmTime.getTime())) {
        document.getElementById('alarm-notice').textContent = 'Некоректен формат на времето. Моля, въведете правилен формат.';
        document.getElementById('alarm-notice').style.display = 'block';
        return;
    }

    if (alarmTime > new Date()) {
        document.getElementById('alarm-notice').textContent = 'Алармата е зададена';
        document.getElementById('alarm-notice').style.display = 'block';
        clearTimeout(alarmTimeout); // Изчистване на предишния таймер (ако има)
        alarmTimeout = setTimeout(checkAlarm, alarmTime - new Date()); // Настройване на нов таймер
    } else {
        document.getElementById('alarm-notice').textContent = 'Моля, задайте време.';
        document.getElementById('alarm-notice').style.display = 'block';
    }
}
function settingVibration() {
    const vibrationPattern = [200, 100, 200]; // Примерен модел на вибрация: вибрация за 200ms, пауза за 100ms, вибрация за 200ms
    if (navigator.vibrate) {
        navigator.vibrate(vibrationPattern);
        document.getElementById('vibration-notice').textContent = 'Вибрацията е зададена';
        document.getElementById('vibration-notice').style.display = 'block';
    } else {
        document.getElementById('vibration-notice').textContent = 'Вашият браузър не поддържа вибрация';
        document.getElementById('vibration-notice').style.display = 'block';
    }
}
function stopAlarm() {
            const alarmSound = document.getElementById('alarm-sound');
            alarmSound.pause(); // Спиране на звука
            alarmSound.currentTime = 0; // Нулиране на времето на звука
            alarmTime = null; // Нулиране на алармата
            document.getElementById('alarm-notice').style.display = 'none'; // Скриване на известяването
        }
function stopVibration(){
    const vibration = document.getElementById('stop-vibration');
    vibration.pause(); // Спиране на звука
    vibration.currentTime = 0; // Нулиране на времето на звука
    vibrationTime = null; // Нулиране на алармата
    document.getElementById('vibration-notice').style.display = 'none'; // Скриване на известяването
}

        function checkAlarm() {
            if (alarmTime && new Date() >= alarmTime) {
                const alarmSound = document.getElementById('alarm-sound');
                alarmSound.play();
                document.getElementById('alarm-notice').textContent = 'Алармата звъни';
            } else {
                const alarmVibrate = document.getElementById('alarm-vibrate');
                vibrateTime.play();
                document.getElementById('alarm-notice').textContent = 'Алармата вибрира';
                document.getElementById('alarm-notice').style.display = 'block';
                document.getElementById('stop-vibration').style.display = 'block';

            }
        }
setInterval(updateTime, 1000);
