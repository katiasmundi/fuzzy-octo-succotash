# Vaihe 3. – Jatkokehitys (vapaaehtoinen)

## Valittu käyttötapaus tai toiminnon parannus

### Varausten muokkaus (PUT)

Kehitysvaiheessa valitsin testausvaiheen palautteen perusteella parannettavaksi käyttäjän mahdollisuuden muokata olemassa olevia varauksia. Halusin lisätä järjestelmään mahdollisuuden, että sekä tavalliset käyttäjät että admin voivat muokata jo tehtyjä varauksia. Valitsin tämän, koska se parantaa sovelluksen käytettävyyttä merkittävästi ja tekee varausten hallinnasta joustavampaa.

### Azure Static Web Apps

Lisäksi halusin saada toimimaan edellisestä vaiheesta puuttuneen pilvipalvelun.

## Alkuperäinen määrittely

Alkuperäisessä määrittelyn käyttötapauksissa ei ollut mukana varauksen muokkaustoimintoa – oli mahdollista vain varata ja peruuttaa varaus, mutta käyttäjäpersoonissa tarve muokkaukselle oli mainittu.

Alkuperäisessä määrittelyssä oli mukana Azure Static Web Apps, mutta en ehtinyt saada sitä toimimaan edelliseen palautukseen johtuen isoista ongelmista sivun julkaisussa.

## Toteutus

### Varausten muokkaus (PUT)

- Lisättiin muokkausmahdollisuus varauksille sekä käyttäjän omissa varauksissa että admin-näkymässä.
- Luotiin uusi sivu EditBooking, jossa käyttäjä voi vaihtaa varauksen huonetta ja päivämäärää.
- Navigointi muokkauksen jälkeen ohjaa oikeaan paikkaan:
    - Adminin muokkaus → palaa Admin-sivulle
    - Käyttäjän oma muokkaus → palaa Omat varaukset -sivulle
- Lisättiin onnistumis- ja virheilmoitukset, jotka kertovat käyttäjälle toiminnon tuloksesta.

Tekniset muutokset:
- Frontendissä käytettiin React Routerin useNavigate ja useLocation -toimintoja tiedon välittämiseen ja ohjaukseen.
- Backendissä (server.js) päivitettiin PUT /bookings/:id -reitti tukemaan virheenkäsittelyä, mm. tuplavarauksen estoa.
- Päivämäärien ja huoneiden tiedot esitäytetään muokkauslomakkeelle automaattisesti.

### Azure Static Web Apps

Mitä lisättiin tai muutettiin:

- Vite-konfiguraatioon (vite.config.js) lisättiin:

"jsxRuntime: 'automatic'"
Tämä kertoo Vite-käännökselle, että käytetään uutta JSX-runtimea, jolloin ei tarvitse erikseen tuoda "import React" tiedostoihin. Tämä ratkaisi tuotantoversiossa tulleen virheen: "React is not defined".

- GitHub Actions workflow-tiedostoon (azure-static-web-apps.yml) lisättiin uusi vaihe ennen deployausta:

```
- name: Install dependencies and build
  run: |
    cd frontend
    npm install
    npm run build
```

Tämä vaihe varmistaa, että projekti rakennetaan (npm run build) ennen kuin se ladataan Azureen. Ilman tätä vaihetta Azure olisi yrittänyt palvella raakaa lähdekoodia (src/-kansiosta), mikä johti MIME-tyyppivirheisiin selaimessa.

- .gitignore-tiedostosta poistettiin aiemmin virheellisesti listatut rivit:

package*
vite*

https://victorious-sea-0f1cafc03.6.azurestaticapps.net/admin

### Muita muutoksia

Lisäksi muutin poista-napit punaiseksi, jotta ne erottuvat helposti muista napeista. Tämän lisäksi muutin varauslistan esitysjärjestystä niin, että kauimpana tulevaisuudessa oleva varaus on ylimmäisenä, jotta tietyn varauksen löytää helpommin.

Muutin myös sivun titlen ja lisäsin itsetehdyn faviconin.

