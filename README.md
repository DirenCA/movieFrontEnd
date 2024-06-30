# movie_frontend

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Funktionen

Im Folgenden wird die Funktionsweise des gesamten Frontends im Detail beschrieben:
Startseite

Die Startseite dient als zentrale Anlaufstelle für die Nutzer und bietet eine Übersicht über verschiedene Kategorien von Filmen:

    Populäre Filme: Hier werden die derzeit am meisten angesehenen Filme angezeigt. Diese Auswahl basiert auf der Beliebtheit und den aktuellen Abrufzahlen der Filme.
    Upcoming Filme: Diese Sektion zeigt eine Liste von Filmen, die demnächst veröffentlicht werden. Nutzer können sich über bevorstehende Neuerscheinungen informieren.
    Bestbewertete Filme: Diese Kategorie umfasst Filme, die von den Nutzern am besten bewertet wurden. Die Bewertungen basieren auf den individuellen Bewertungen der Community.

Benutzerverwaltung

Die Plattform bietet umfassende Funktionen zur Verwaltung von Benutzerkonten:

    Registrierung: Neue Nutzer können sich durch Eingabe von E-Mail-Adresse und Passwort registrieren. Dieser Schritt erstellt ein neues Benutzerkonto in der Datenbank.
    Login: Registrierte Nutzer können sich einloggen, um auf personalisierte Inhalte und zusätzliche Funktionen zuzugreifen. Der Login-Prozess beinhaltet die Authentifizierung der Nutzerdaten.
    Logout: Nutzer haben die Möglichkeit, sich auszuloggen, um ihre Sitzung sicher zu beenden und den Zugriff auf persönliche Informationen zu schützen.

Interaktive Funktionen für eingeloggte Nutzer

Eingeloggte Nutzer haben Zugang zu erweiterten Funktionen, die ihre Interaktion mit der Plattform verbessern:

    Filmbewertungen: Eingeloggte Nutzer können Filme bewerten. Diese Bewertungen werden in das Bewertungssystem der Plattform integriert und beeinflussen die Gesamtbewertung der Filme.
    Watchliste: Nutzer können Filme zu ihrer persönlichen Watchliste hinzufügen. Diese Funktion ermöglicht es ihnen, interessante Filme für später zu speichern und eine individuelle Merkliste zu erstellen. Filme können auch wieder aus der Watchliste entfernt werden.

Suchfunktion

Die Suchfunktion ermöglicht es Nutzern, gezielt nach Filmen zu suchen:

    Filmrecherche: Über eine Suchleiste können Nutzer nach spezifischen Filmtiteln suchen. Dies erleichtert das Auffinden von bestimmten Filmen oder das Durchsuchen der Filmkataloge nach bestimmten Kriterien, wie Genre oder Erscheinungsjahr.
