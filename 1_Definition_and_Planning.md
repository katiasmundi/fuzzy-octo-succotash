# Vaihe 1 - Määrittely ja suunnittelu

Aiheena on tilavarausjärjestelmä työpaikalle. Toimistolla on muutama neuvotteluhuone, joita voi jatkossa varata omaan käyttöön.

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

1. Varausnäkymä näyttää tilojen saatavuuden.

2. Käyttäjä valitsee tilan, ajan ja vahvistaa varauksen.

3. Käyttäjä näkee omat varauksensa ja voi halutessaan peruuttaa varauksen.

4. Admin voi hallinnoida varauksia ja tiloja.

## 3. Käyttöliittymän prototyypit

- Etusivu: Käyttäjä näkee jollain tyylillä varaustilanteen
    - Tätä pitää vielä hieman pyöritellä että miten osaan tämän toteuttaa
- Käyttäjä voi valita "tee varaus"
    - Käyttäjä valitsee ajan ja vapaan neukkarin
    - Voi vahvistaa varauksen
    - Tarvittaessa tästä voisi myös palata takaisin etusivulle tekemättä  varausta
- Käyttäjä näkee omat varauksensa ja voi peruuttaa varauksen
    - Varauksen peruuttamiseen oma yksinkertainen vaihe, jossa vahvistus
- Käyttäjä voi palata omista varauksista etusivulle
- Lisäksi admin-paneeli hallintaan

## 4. Tietoarkkitehtuuri ja tekninen suunnittelu

- Frontend: React / HTML + CSS
- Backend: Node.js / Express
- Tietokanta: SQLite
- Pilvipalvelu: Azure Static Web Apps
- Roolit: varaaja, admin

Tiedot:
- Tilat (nimi, kapasiteetti, kuvaus)
- Varaaja (nimi, sähköposti)
- Varaukset (tila_id, varaaja_id, aika)

## 5. Projektinhallinta ja käyttäjätestaus

- Projektinhallinta GitHubin tekstitiedostossa
- Aikataulu projektin vaiheiden palautusaikataulun mukaan
- Käyttäjätestaus:
    - Testataan itse ja lisäksi puoliso koekaniiniksi
        - Pyydetään tekemään varaus ilman muita ohjeita ja seurataan etenemistä sekä dokumentoidaan kommentit
        - Palautteen keräys
        - Tarvittavat korjaukset palautteen ja kommenttien perusteella
