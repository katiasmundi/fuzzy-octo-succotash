# Vaihe 2 - Perusrunko ja päätoiminnallisuudet

Projekti toteutettiin Reactilla (frontend), Node.js:llä (backend) ja SQLite-tietokannalla. Käyttöliittymästä pyrittiin tekemään yksinkertainen, mutta selkeä ja nykyaikainen. Tässä raportissa kuvataan järjestelmän rakenne, toiminnallisuudet ja keskeiset tekniset ratkaisut.

Sivuston oli tarkoitus toimia Pilvipalvelu: Azure Static Web Apps:ssa, mutta aika loppui ennen kuin sain sen toimimaan. Azuren kautta sivu näkyy vain valkoisena. Lokaalisti sivusto toimii hyvin.

## 1. Ympäristö

Projekti rakennettiin Reactin ja Node.js:n avulla. Kehitysympäristönä käytettiin Visual Studio Codea ja projektia hallittiin Gitin ja GitHubin avulla. Frontend pyörii paikallisesti Viten avulla ja backend toimii Node.js:llä käyttäen Express-tyylistä HTTP-palvelinta. Tietokantana on kevyt SQLite-tietokanta.

## 2. Backend

Backend on toteutettu puhtaalla Node.js:llä ilman Expressiä. Se tarjoaa REST-tyyliset reitit huoneiden, varausten ja varaajien käsittelyyn. API tarjoaa mm. seuraavat pääreitit:

GET /rooms – listaa huoneet
GET /bookings ja GET /all-bookings – hakee varaukset
POST /bookings – lisää varauksen
DELETE /bookings/:id – poistaa varauksen
GET /my-bookings/:booker_id – näyttää käyttäjän varaukset
GET /bookers – listaa varaajat

Virheenkäsittely hoidetaan HTTP-statuskoodeilla ja virheilmoituksilla.

## 3. Frontend

Frontend on toteutettu Reactilla ja sen sivut on jaettu komponentteihin: Etusivu, Tee varaus, Omat varaukset ja Admin. React Router vastaa sivujen navigoinnista. Käyttöliittymässä on selkeä rakenne, lomakkeet ovat helppokäyttöisiä ja tilojen varaustilanne on nähtävissä viikkonäkymässä. CSS-tyylit on keskitetty yhteen App.css-tiedostoon, joka antaa yhtenäisen ilmeen kaikille sivuille.

## 4. Tietokanta

Tietokanta on toteutettu SQLite:llä ja tiedosto tallentuu nimellä tilavaraus.sqlite. Tietokanta sisältää seuraavat taulut:

rooms (id, name, capacity, description)
bookers (id, name)
bookings (id, room_id, booker_id, date)

Tietokanta alustetaan db.js-tiedostossa ja se luo taulut tarvittaessa automaattisesti.

## 5. Perusrunko ja arkkitehtuuri

Sovellus on jaettu selkeästi kolmeen osaan: frontend, backend ja tietokanta. Frontend käyttää REST-rajapintaa hakemaan ja lähettämään tietoja backendille. Koko projektin rakenne on modulaarinen ja laajennettavissa. Käytössä on myös keskitetty layout ja footer, joka näkyy kaikilla sivuilla.

## 6. Toiminnallisuudet

Toteutetut päätoiminnot:

- Varaustilanteen tarkastelu viikkonäkymässä (🟢/🔴)
- Varaus lomakkeella (myös toisen puolesta)
- Varausten peruminen
- Varaajan ja huoneen nimen näyttö
- Admin-näkymä, jossa voi:
    - Hallita huoneita
    - Näyttää kaikki varaukset
    - Poistaa varauksia

Tuplavaraukset on estetty backendissä.

## 7. Koodin laatu ja dokumentointi

Koodi on jaettu loogisiin komponentteihin ja noudattaa selkeitä nimikäytäntöjä. CSS on keskitetty ja selkeästi nimetty. Projektia on kehitetty vaiheittain, ja Gitin commit-historia toimii osittain myös dokumentaationa.

## 8. Testaus ja virheenkäsittely

Sovellusta on testattu manuaalisesti eri tilanteilla, mm. tuplavarauksilla ja puuttuvilla kentillä. Varauslomakkeessa on selkeä virheilmoitus, jos kenttiä ei ole täytetty tai varaus epäonnistuu. Backend palauttaa selkeitä virhekoodeja ja -viestejä virhetilanteissa. On testattu myös useampaa eri selainta ja tehty sen perusteella pieniä muutoksia.

Puoliso testasi myös sivuja ja ne ovat niin helppokäyttöiset, että kysymyksiä ei tullut. Kehitysehdotuksia kylläkin pitkä lista (mm. varausten muokkaus), joten katsotaan saisiko niitä tehtyä seuraavassa vaiheessa. 

## 9. Käyttöliittymä ja vuorovaikutus

Käyttöliittymä on yksinkertainen, mutta tyylikäs. Kaikki kentät ovat selkeitä ja sopivasti tilaa käyttäviä. Navigointipalkki on keskitetty ja footer näkyy kaikilla sivuilla. Kalenterikenttä toimii helposti, ja huonevalinnat ovat selkeästi luettavissa. Ulkoasussa on käytetty rauhallisia värejä ja helppolukuista fonttia.