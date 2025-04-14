# Vaihe 1 - Määrittely ja suunnittelu

Aiheena on tilavarausjärjestelmä työpaikalle. Toimistolla on muutama neuvotteluhuone, joita voi jatkossa varata omaan käyttöön päiväksi kerrallaan.

## 1. Käyttäjäpersoonat

1. Teemu Työntekijä
    - Tarvitsee neuvotteluhuoneen palaveria varten
    - Käyttää työkonetta varausten tekemiseen
    - Säännöllinen, mutta ei jokapäiväinen käyttäjä
    - Tarvitsee helpon käyttöliittymän

2. Arttu Assistentti
    - Varailee neukkareita lähinnä muiden käyttöön (mm. johtajille)
    - Käyttää järjestelmää paljon päivittäin
    - Ei halua liikaa työvaiheita varauksen tekemiseen, pitää olla nopeaa
    - Pitää nähdä helposti onko neukkareita vapaana
    - Käyttää myös tietokonetta varausten tekemiseen

3. Ulla Ylläpitäjä
    - Hallinnoi järjestelmää
    - Voi lisätä tai poistaa neukkareita listalta
    - Voi muokata varauksia

## 2. Käyttötapaukset ja -tilanteet

1. Varausnäkymä näyttää tilojen saatavuuden ko. loppuviikon ajalta: punainen varattu, vihreä vapaa. Viikkoja voi selata etusivulla nuolesta eteen- ja taaksepäin. Etusivulta pääsee siirtymään suoraan napista varaussivulle (ja myös muille sivuille yläpalkista).

2. Varaussivulla: Askel 1. Valitse varaajan nimi. Askel 2. Valitse päivämäärä. Askel 3. Valitse neukkari. Askel 4. Klikkaa "varaa". Käyttäjä saa tiedon onnistuneesta tai epäonnistuneesta varauksesta.

3. Käyttäjä näkee omat varauksensa toisella sivulla ja voi siellä halutessaan peruuttaa varauksen ko. varauksen kohdalta napista.

4. Admin voi hallinnoida varauksia ja tiloja erillisellä sivulla, jossa näkyy listana kaikki neukkarit ja varaukset sekä käyttäjät. Näissä on selkeät napit lisää tai poista jne.

## 3. Käyttöliittymän prototyypit

- Etusivu: Käyttäjä näkee varaustilanteen
    - Käyttäjä voi valita "tee varaus"
- Varaussivu: Käyttäjä valitsee päivän ja neukkarin
    - Käyttäjä voi vahvistaa varauksen
    - Tarvittaessa tästä voisi myös palata takaisin etusivulle tekemättä varausta
- Omat varaukset-sivu: Käyttäjä näkee omat varauksensa ja voi peruuttaa varauksen
    - Varauksen peruuttamiseen oma yksinkertainen vaihe, jossa vahvistus
    - Käyttäjä voi palata omista varauksista etusivulle
- Lisäksi admin-paneeli hallintaan

## 4. Tietoarkkitehtuuri ja tekninen suunnittelu

- Frontend: React / HTML + CSS
- Backend: Node.js / Express
- Tietokanta: SQLite
- Pilvipalvelu: Azure Static Web Apps
- Roolit: user, admin

Tiedot:
- Tilat / Rooms (id, name, capacity, description)
- Varaaja / Booker (id, name, email)
- Varaukset / Bookings (id, room_id, booker_id, date)

## 5. Projektinhallinta ja käyttäjätestaus

- Projektinhallinta GitHubissa
- Aikataulu projektin vaiheiden palautusaikataulun mukaan
- Käyttäjätestaus:
    - Testataan itse ja lisäksi puoliso koekaniiniksi
        - Pyydetään tekemään varaus ilman muita ohjeita ja seurataan etenemistä sekä dokumentoidaan kommentit
        - Palautteen keräys
        - Tarvittavat korjaukset palautteen ja kommenttien perusteella
