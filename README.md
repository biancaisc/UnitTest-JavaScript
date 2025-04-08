# Testarea Unitară în JavaScript

Testarea unitară este o metodă de testare software care se concentrează pe verificarea funcționalității corecte a celor mai mici unități de cod (funcții sau metode individuale). 

Am ales să realizăm testarea unitară utilizând funcții de backend din aplicația web implementată în cadrul cursului de Inginerie Software.

## Componență echipă
 - Berca Teodora
 - Cochiorca Oana-Maria
 - Iscru Bianca

## Descriere Aplicație

Aplicația Web este inspirată de GoodReads și este implementată folosind React, Node.js și SQLite.

Aplicația este destinată persoanelor pasionate de lectură, un utilizator putând, prin intermediul acesteia să își gestioneze și să își personalizeze experiența de citit. 
Un utilizator își poate crea cont, poate salva cărțile pe care își dorește să le citească, poate marca cărțile pe care le-a citit și poate lăsa comentarii cărților.
Conturile de administrator pot crea categorii noi, pot adăuga cărți, pot edita ceea ce se află în platformă, astfel încât selecția aplicației să fie mereu de actualitate.
Aplicația oferă funcții de căutare și organizarea cărților pe categorii, astfel încât utilizatorii să poată găsi cărți noi care să fie pe placul lor și să poată să afle și părerea altor utilizatori cu privire la ele.

### Features

 - Gestionarea conturilor utilizatorilor și autentificare securizată.
 - Gestionarea cărților din bibliotecă (adăugare, vizualizare, editare și ștergere).
 - Funcționalități de rating, comentarii și recenzii pentru cărți.
 - Funcționalități de catalogare și organizare a cărților în categorii.
 - Gestionarea bibliotecii personale a utilizatorului, cu liste “Read” și “To Read”.
 - Căutare și filtrare de cărți după titlu, autor sau taguri.

### Link aplicație

https://github.com/unibuc-cs/software-engineering-product-code-girls

## Testarea Funcțională
Metodă de testare software care verifică dacă aplicația se comportă conform specificațiilor. Se concentrează pe „ce ar trebui să facă” aplicația, nu pe „cum este implementată”.

Este o formă de testare black-box, unde inputurile sunt oferite funcțiilor și se verifică dacă rezultatul este cel așteptat.

## Testarea Structurală 

Metodă de testare software care presupune cunoașterea codului sursă. Se mai numește și "white-box testing" – testăm cum funcționează codul.

Testerul are acces la cod și verifică dacă toate ramurile, instrucțiunile și condițiile sunt acoperite de teste.

## Testarea de Mutanți

Metodă de testare a calității testelor, care presupune introducerea unor modificări minore (mutanți) în codul sursă al aplicației pentru a verifica dacă testele existente pot detecta aceste schimbări. 

Scopul acestei tehnici este de a evalua eficiența testelor: dacă un test nu detectează o modificare introdusă în cod, aceasta indică faptul că testul nu este suficient de robust sau acoperitor. Testarea de mutanți este folosită pentru a îmbunătăți calitatea și completitudinea suitei de teste.


## Tehnologii utilizate

Framework de testare: **Jest** ( are suport activ, necesita o configurare minima si este de preferat pentru aplicatii web care folosesc React)

Framework de mutation testing: **StrykerJS** (ajută la evaluarea calității testelor existente, introducând modificări minore în cod și verificând dacă testele pot detecta aceste schimbări)

## Setup pentru testare cu Jest

 1. Instalare Jest
 
     ```npm install --save-dev jest```
 
 2. Configurare script pentru testare
 
    În fișierul **package.json** (din folderul ***backend***) se adaugă un script pentru a rula testele cu Jest:
    ![image](https://github.com/user-attachments/assets/042e4f26-50cc-4a38-b9f9-d8ba3d3109c3)
    
 3. Director teste
 
    Pentru fiecare tip de testare includem fișierele de test specifice pentru fiecare funcție. Folderul ***functional_tests*** include fișierele de testare funcțională pentru funcțiile alese.
    
 4. Rularea testelor
 
    ```npm test```
   
## Setup pentru testare cu StrykerJS
 
 1. Instalare și inițializare StrykerJS
 
     ```npm init stryker```

     Aceasta va crea un fișier de configurare ***stryker.conf.js***.
    
 2. Rulare StrykerJS

    Pentru a rula mutation testing cu StrykerJS, se folosește comanda:
    
    ```npx stryker run```

    Stryker va modifica codul sursă al aplicației (va crea mutanți), va rula testele și va raporta dacă testele au reușit să identifice mutanții.

## Testare Funcții

## Bibliografie
- https://jestjs.io/docs/getting-started
- https://www.geeksforgeeks.org/testing-with-jest/
- https://devhints.io/jest
- https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
- https://medium.com/@dilip.bhaidiya/mastering-react-js-testing-with-jest-a-comprehensive-guide-1acada2b9586
- https://stryker-mutator.io/docs/stryker-js/introduction/
  



