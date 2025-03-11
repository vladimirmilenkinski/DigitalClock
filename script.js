function updateTime() {
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const amPmElement = document.getElementById('am-pm');
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

    const amPm = now.getHours() >= 12 ? 'PM' : 'AM'; 
    amPmElement.textContent = amPm; 

    const numbers = document.getElementsByClassName("number");
    let i = 0;
    timeString.split("").forEach((s) => {
        if (s.match(/^[0-9]$/)) {
            numbers[i++].src = `img/digit-${s}.png`;
        }
    });

    dateElement.textContent = dateString; 
}

let alarmTime = null;
let alarmTimeout = null;
let vibrateTime = null;
let vibrateTimeout = null;

function settingVibration() {
    const vibrationInput = document.getElementById('alarm-time');
    vibrateTime = new Date(vibrationInput.value);

    if (isNaN(vibrateTime.getTime())) {
        document.getElementById('vibration-notice').textContent = 'Некоректен формат на времето. Моля, въведете правилен формат.';
        document.getElementById('vibration-notice').style.display = 'block';
        return;
    }

    if (vibrateTime > new Date()) {
        document.getElementById('vibration-notice').textContent = 'Вибрацията е зададена';
        document.getElementById('vibration-notice').style.display = 'block';
        clearTimeout(vibrateTimeout);
        vibrateTimeout = setTimeout(startVibration, vibrateTime - new Date());
    } else {
        document.getElementById('vibration-notice').textContent = 'Моля, задайте време.';
        document.getElementById('vibration-notice').style.display = 'block';
    }
}

function startVibration() {
    const vibrationPattern = [200, 100, 200];
    if (navigator.vibrate) {
        navigator.vibrate(vibrationPattern);
        document.getElementById('vibration-notice').textContent = 'Алармата вибрира';
        document.getElementById('vibration-notice').style.display = 'block';
        document.getElementById('stop-vibration').style.display = 'block';
    } else {
        document.getElementById('vibration-notice').textContent = 'Вашето устройство не поддържа вибрация';
        document.getElementById('vibration-notice').style.display = 'block';
    }
}

function stopVibration() {
    if (navigator.vibrate) {
        navigator.vibrate(0);
        document.getElementById('vibration-notice').style.display = 'none';
        document.getElementById('stop-vibration').style.display = 'block';
    } else {
        document.getElementById('vibration-notice').textContent = 'Вашието устройство не поддържа вибрация';
        document.getElementById('vibration-notice').style.display = 'block';
    }
}
function setAlarmSound(){
    const alarmDropdown = document.getElementById('alarm-sound-dropdown');
    const alarmSound = document.getElementById('alarm-sound');
    const selectedSound = alarmDropdown.value;
    alarmSound.src = selectedSound;
    alarmSound.load();
    
   // alert(`Звукът е зададен: ${alarmDropdown.options[alarmDropdown.selectedIndex].text}`)
}


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
        clearTimeout(alarmTimeout);
        alarmTimeout = setTimeout(checkAlarm, alarmTime - new Date());
    } else {
        document.getElementById('alarm-notice').textContent = 'Моля, задайте време.';
        document.getElementById('alarm-notice').style.display = 'block';
    }
}

function stopAlarm() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    alarmTime = null;
    document.getElementById('alarm-notice').style.display = 'none';
    
}

function checkAlarm() {
    if (alarmTime && new Date().getTime() >= alarmTime.getTime()) {
        const alarmSound = document.getElementById('alarm-sound');
        alarmSound.play();

        document.getElementById('alarm-notice').textContent = 'Алармата звъни!';
        document.getElementById('alarm-notice').style.display = 'block';

        clearTimeout(alarmTimeout);
    }
}

setInterval(updateTime, 1000);
