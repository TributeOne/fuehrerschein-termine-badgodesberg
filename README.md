# Fuehrerschein-Termine-Badgodesberg

## _English:_
"Fuehrerschein-Termine-Badgodesberg" is a small project I created out of personal interest to be automatically notified about free appointments at the Stadthaus Bad Godesberg. The project uses a webscraper to check the appointment calendar of the website "https://termine.bonn.de/m/DLZ/extern/calendar/?uid=1f4c5347-ccf5-43c5-8325-5c5c4461d121" for free appointments.

The project is intended for demonstration purposes only and I do not recommend using it for any other purpose, as it may violate the terms of use of the city of Bonn.

## Installation
You can install the project by using:
```sh
git clone https://github.com/TributeOne/fuehrerschein-termine-badgodesberg
```

For the notifications you need an API token and a user ID from Telegram. You need to create an .env file in the root directory and store the above data in it according to the following scheme:

```sh
TELEGRAM_BOT_API_KEY="1234567890:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
TELEGRAM_USER_ID="123456789"
```

## Usage
Run the script once and compile it to the build directory with:
```sh
yarn start
```

To keep the script running permanently in the loop, I recommend running the script with pm2.

For more information, please read the documentation of PM2 and install it:
https://pm2.keymetrics.io/docs/usage/quick-start/


You can then start the script with the command:
```sh
pm2 start build/src/index.js
```

In /config/settings.json, you can decide whether the web scraper should be started in headless mode.

---

## _German:_
"Fuehrerschein-Termine-Badgodesberg" ist ein kleines Projekt, das ich aus persönlichem Interesse erstellt habe, um automatisch über freie Termine im Stadthaus Bad Godesberg benachrichtigt zu werden. Das Projekt verwendet einen Webscraper, um den Terminkalender der Webseite "https://termine.bonn.de/m/DLZ/extern/calendar/?uid=1f4c5347-ccf5-43c5-8325-5c5c4461d121" auf freie Termine zu prüfen.

Das Projekt ist nur zu Demonstrationszwecken gedacht und ich rate davon ab, es für andere Zwecke zu verwenden, da es möglicherweise gegen die Nutzungsbedingungen der Stadt Bonn verstößt.

## Installation
Du kannst das Projekt mit dem Befehl klonen:
```sh
git clone https://github.com/TributeOne/fuehrerschein-termine-badgodesberg
```

Für die Benachrichtigungen benötigst du ein API-Token und eine User-ID von Telegram. Du musst eine .env-Datei im Stammverzeichnis erstellen und darin die oben genannten Daten nach dem folgenden Schema hinterlegen:
```sh
TELEGRAM_BOT_API_KEY="1234567890:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
TELEGRAM_USER_ID="123456789"
```
Um zu verstehen, wie du einen API-Token und die passende User-ID erhältst, lies dir am besten die Dokumentation von node-telegram-bot-api durch: https://github.com/yagop/node-telegram-bot-api

## Verwendung
Das Projekt kann mit dem Befehl
```sh
yarn start
```
einmalig ausgeführt werden und wird dann in den Build-Ordner kompiliert. Um das Projekt permanent im Loop zu halten, empfehle ich, das Projekt mit pm2 auszuführen. Lies dir hierzu am besten die Dokumentation von pm2 durch und installiere pm2: https://pm2.keymetrics.io/docs/usage/quick-start/

Du kannst dann das Projekt mit dem Befehl starten:
```sh
pm2 start build/src/index.js
```

In der Konfigurationsdatei _config/settings.json_ kannst du entscheiden, ob der Webscraper im Headless-Modus gestartet werden soll.# fuehrerschein-termine-badgodesberg
