# Vaihe 4 – Projektin esittely

## Tilavarausjärjestelmä toimistolle

Neuvotteluhuoneiden varausjärjestelmä työntekijöille, assistenteille ja admin-käyttäjälle. Tässä työssä ei ole käytetty sisäänkirjautumista tai oikeita rooleja/oikeuksia eri käyttäjille, joten sivustolla on näkyvissä kaikki olemassa olevat ominaisuudet. Esimerkiksi tavallisen käyttäjän ei olisi tarkoitus nähdä oikeassa käyttötapauksessa admin-sivua.

---

## Projektin yleiskuvaus

Projektin tarkoituksena on toteuttaa toimistolle toimiva ja selkeä tilavarausjärjestelmä, jossa työntekijät ja assistentit voivat varata neuvotteluhuoneita omaan käyttöönsä päiväksi kerrallaan.

Kohderyhmä:

- Työntekijät
- Assistentit
- Ylläpitäjät

---

## Käyttötapausten yhteenveto

[Käyttötapaukset ja -tilanteet (vaihe 1)](1_Definition_and_Planning.md)

| Käyttötapaus | Toteutettu (Kyllä/Ei) | Demo / Huomiot |
|----------|----------------------|------------------------|
| Varausnäkymä näyttää tilojen saatavuuden ko. loppuviikon ajalta: punainen varattu/vihreä vapaa. | Kyllä | Toteutettu, näkyy etusivulla. Demovideolla kohdassa 01:50. |
| Viikkoja voi selata etusivulla nuolesta eteen- ja taaksepäin. | Kyllä | Toteutettu, näkyy etusivulla. Demovideolla kohdassa 01:50. |
| Etusivulta pääsee siirtymään suoraan napista varaussivulle (ja myös muille sivuille yläpalkista). | Kyllä | Toteutettu, näkyy etusivulla ja yläpalkki myös muilla sivuilla. Demovideolla kohdassa 02:05. |
| Varaussivulla: Askel 1. Valitse varaajan nimi. Askel 2. Valitse päivämäärä. Askel 3. Valitse neukkari. Askel 4. Klikkaa "varaa". | Kyllä | Toteutettu juuri näin, näkyy Tee varaus -sivulla. Demovideolla kohdassa 03:50. |
| Käyttäjä saa tiedon onnistuneesta tai epäonnistuneesta varauksesta. | Kyllä | Toteutettu, varausta vahvistaessa tulee teksti joko onnistuneesta varauksesta, tai epäonnistuneesta, jos ko. huone on jo varattu samalle päivälle. Demovideolla kohdassa 04:10. |
| Käyttäjä näkee omat varauksensa toisella sivulla ja voi siellä halutessaan peruuttaa varauksen ko. varauksen kohdalta napista. | Kyllä | Toteutettu, näkyy Omat varaukset -sivulla. Käyttäjä voi lisäksi muokata varauksiaan. Demovideolla kohdassa 05:30. |
| Admin voi hallinnoida varauksia ja tiloja erillisellä sivulla, jossa näkyy listana kaikki neukkarit ja varaukset sekä käyttäjät. Näissä on selkeät napit lisää tai poista jne. | Kyllä ja Ei | Toteutettu osittain Admin-sivulla: Huoneita voi lisätä ja poistaa, mutta ei muokata. Varauksia voi muokata ja poistaa. Käyttäjiä ei ole listattu eikä voi lisätä tai poistaa. Syynä puutteisiin on unohdus, sillä huomasin vasta tätä raporttia kirjoittaessa, että olin aikonut tehdä alun perin nuo puuttuvatkin ominaisuudet. Loput olisivat siis jatkokehitystä. Näkyy Demovideolla kohdassa 07:45. |

---

## Tekninen toteutus

Käytetyt teknologiat:

- Frontend: React + Vite
- Routing: React Router
- Backend: Node.js + Express-tyylinen oma HTTP-serveri
- Tietokanta: SQLite
- Hosting: Azure Static Web Apps (frontend) https://victorious-sea-0f1cafc03.6.azurestaticapps.net

Projektissa rakennettiin Node.js:n sisäänrakennetulla http-moduulilla oma kevyt palvelin, joka käsittelee REST API -pyyntöjä (GET, POST, PUT, DELETE) ilman ulkopuolisia kirjastoja kuten Express. Palvelin muistuttaa rakenteeltaan Express-sovellusta, mutta kaikki toiminnot toteutettiin itse suoraan Node.js:n tarjoamilla perustoiminnoilla.

Arkkitehtuuriratkaisut:

- Frontend ja backend erotettu toisistaan
- Backend tarjoaa REST API -rajapinnan (GET, POST, PUT, DELETE)
- SQLite-tietokantaa käytettiin kevyenä tiedon tallennusratkaisuna
- CORS sallittu erikseen Node.js-serverillä

---

## Kehitysprosessi

Vaihe 1. oli sujuva ja minulla oli heti selkeä visio lopputuloksesta. Lopputulos onkin aika lailla sitä, mitä ajattelin. Tekninen suunnittelu oli myös aika helppoa ja tein sivuston aika lailla niillä teknisillä ratkaisuilla, millä ajattelinkin.

Toinenkin vaihe meni suurimmaksi osin sujuvasti. Käytin aiempia tämän kurssin harjoitustehtäviä sekä Chat GPT:tä apuna sivuston rakentamisessa. Käytin tässä vaiheessa myös jonkin verran aikaa sivuston ulkoasun siistimiseen ja muokkaamiseen, mutta päätin että keskityn tehtävässä kuitenkin enemmän sisältöön, kuin ulkoasuun.

Tein tässä vaiheessa myös käyttäjätestausta puolisoni avulla. Hänellä ei herännyt kysymyksiä toiminnoista, mutta hän antoi pitkän listan kehitys- ja parannusehdotuksia.

Tässä vaiheessa minun oli tarkoitus jukaista sivusto Azure Static Web Appsissa, mutta tämän kanssa tuli isoja ongelmia enkä lopulta ehtinyt saada sitä kuntoon ennen palautuspäivää. Sain Azuren toimimaan, mutta sivu näkyi valkoisena ja antoi virheilmoitusta selaimen Developer Toolsissa. Päätin yrittää jatkaa selvittelyä seuraavassa vaiheessa.

Käyttäjätestauksen perusteella valitsin jatkokehityskohteeksi varausten muokkaustoiminnon (PUT), joka vielä puuttui. Tässä oli sopivasti työtä, kun tätä varten jouduin tekemään vielä uuden sivun, EditBooking. Lisäksi tein faviconin ja muuta pientä muutostyötä.

Lähdin ratkomaan uusiksi Azuren ongelmaa ja useamman tunnin googlettelun ja ChatGPT:n kanssa keskustelun jälkeen sain asia kerrallaan ongelmat korjattua ja Azure Static Web Apps lähti toimimaan, jee! Tarkempi kuvaus ratkaisuista [täällä (Vaihe 3)](3_Extra_Feature_or_Improvement.md). Julkaisin vain frontendin Azuressa ja backend pitää käynnistää paikallisesti koneella.

## Pohdinta ja tulevaisuuden jatkokehitys

Mikä toimi hyvin:

- Tein hyvän suunnitelman aluksi ja pysyin siinä
- Sovelluksen perusrakenne on selkeä ja laajennettavissa
- Reactin ja oman backendin yhdistäminen sujui hyvin

Haasteet:

- Alussa CORS-asetusten ja palvelimen pyyntöjen hallinta aiheutti ongelmia
- Kalenterin ja varauslogiikan hienosäätö vaati testausta ja työtä
- Azure Static Web Apps oli haastava saada toimimaan ja tähän upposi aikaa

Mahdolliset tulevat parannukset:

- Käyttäjien tunnistautuminen (esim. kirjautuminen)
- Käyttöoikeudet ja niiden hallinta
- Varauskalenterin visuaalinen parantaminen
- Ulkoasun kehitys
- Varaus tuntikohtaiseksi nykyisen päiväkohtaisen sijaan
- Myös backend Azureen

Ja moka minkä tein, on että en lukenut enää loppuvaiheessa tarpeeksi tarkasti vaiheen 1. raporttia läpi, sillä muistin vasta tätä kirjoittaessa, että minulla oli tarkoitus tehdä admin-näkymään myös esim. käyttäjienhallinta. Tämä olisi ollut nopea toteuttaa, joten vähän jäi harmittamaan.

Onnistumiset: Kun Azure Static Web Apps lähti lopulta toimimaan, oli onnistumisen tunne sanoinkuvaamaton! 😎

---

## Työaikaloki

| Päivä | Käytetyt tunnit | Aihe | Kuvaus |
| :---  |     :---:      |     :---:      |     :---:      |
| 30.3.2025 | 1,5 | Vaihe 1  | Suunnittelu ja Chat GPT:n kans ideointi |
| 31.3.2025 | 3 | Vaihe 1 | Github-sivun perustaminen ja vaiheen 1 muu toteutus |
| 1.4.2025 | 1 | Vaihe 1  | Tehtävän viimeistely ja palautus |
| 13.4.2025 | 7 | Vaihe 2  | Sivuston sisällön rakentaminen |
| 14.4.2025 | 1 | Vaihe 1  | Tehtävän korjaukset |
| 16.4.2025 | 4 | Vaihe 2  | Ulkoasun suunnittelu ja raportin kirjoitus |
| 18.4.2025 | 5 | Vaihe 2  | Ulkoasun suunnittelu ja raportin kirjoitus |
| 18.4.2025 | 5 | Vaihe 2  | Pilvipalvelun rakentaminen ja tehtävän viimeistely ja palautus |
| 25.4.2025 | 3 | Vaihe 3  | Lisäominaisuuden rakentaminen (PUT) |
| 26.4.2025 | 6 | Vaihe 3  | Lisäominaisuuden rakentaminen (PUT) ja muut lisäykset |
| 26.4.2025 | 4 | Vaihe 3  | Pilvipalvelun rakentaminen ja tehtävän viimeistely ja palautus |
| 27.4.2025 | 4,5 | Vaihe 4  | Loppujulkaisu main-branchille, branchin muutos Azureen. Loppuraportin kirjoittaminen, esitys ja palautus |
| **Yhteensä**  | **45h** |                                 |

---

## Esityksen linkki

[Esitys](Loppuesitys.mp4)