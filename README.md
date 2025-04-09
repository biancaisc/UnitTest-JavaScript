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

## Testare cu Mock
Metoda de testare software care simulează comportamentul dependențelor sau componentelor externe, permitand astfel testarea izolată a unor părți specifice din cod.

**Cum am folosit in proiect ->**
prin înlocuirea dependențelor reale cu obiecte simulate, am testat functional fara a utiliza servicii externe precum baza de date.
## Tehnologii utilizate

Framework de testare: **Jest** ( are suport activ, necesita o configurare minima si este de preferat pentru aplicatii web care folosesc React)

Utilizare **Babel** :  **Babel** este folosit pentru a transpila codul JavaScript modern într-un format compatibil cu mediul Node.js, permițându-ne să rulăm testele unitare pe codul backend al aplicației fără a întâmpina probleme de compatibilitate.

Framework de mutation testing: **StrykerJS** (ajută la evaluarea calității testelor existente, introducând modificări minore în cod și verificând dacă testele pot detecta aceste schimbări)

## Setup pentru testare cu Jest

 1. Instalare Jest
 
     ```npm install --save-dev jest```
    
 2. Instalare Babel

     ```npm install --save-dev @babel/core @babel/preset-env babel-jest```
    
 3. Configurare script pentru testare
 
    În fișierul **package.json** (din folderul ***backend***) se adaugă un script pentru a rula testele cu Jest:
    ![image](https://github.com/user-attachments/assets/042e4f26-50cc-4a38-b9f9-d8ba3d3109c3)
    
 4. Director teste
 
    Pentru fiecare tip de testare includem fișierele de test specifice pentru fiecare funcție. Folderul ***functional_tests*** include fișierele de testare funcțională pentru funcțiile alese.
    
 5. Rularea testelor
 
    ```npm test```
   
## Setup pentru testare cu StrykerJS
 
 1. Instalare și inițializare StrykerJS
 
     ```npm init stryker```

     Aceasta va crea un fișier de configurare ***stryker.conf.js***.
    
 2. Rulare StrykerJS

    Pentru a rula mutation testing cu StrykerJS, se folosește comanda:
    
    ```npx stryker run```

    StrykerJS va modifica codul sursă al aplicației (va crea mutanți), va rula testele și va raporta dacă testele au reușit să identifice mutanții.

## Testare Funcții

### Teste pentru post comments

Am împărțit funcția în mai multe cazuri: 
 - datele sunt corecte: atunci funcția ar trebui să returneze statusul 201 și să returneze textul: 'Comment added succesfully!';
 - datele nu sunt corecte pentru că nu este dat book_id: atunci funcția ar trebui să returneze statusul 400 și să returneze textul: 'All fields are required!';
 - datele nu sunt corecte pentru că nu este dat content: atunci funcția ar trebui să returneze statusul 400 și să returneze textul: 'All fields are required!';

Intrări:
 - user_id 
 - book_id pentru comment (poate fi dat un book_id valid sau null)
 - content pentru comment (poate fi dat un content valid sau null)
   
Partiționare în categorii:

Se disting următoarele categorii:

a) Existența sau absența book_id

    B = { book_id | book_id este prezent }
    ¬B = { book_id | book_id este lipsă }

b) Existența sau absența content

    C = { content | content este prezent }
    ¬C = { content | content este lipsă }

Partiționare de echivalență:

    E₁ = { (book_id, content) | book_id ∈ B ∧ content ∈ C } → 201 cu mesajul 'Comment added successfully!'
    E₂ = { (book_id, content) | book_id ∈ ¬B ∧ content ∈ C } → 400 cu mesajul 'All fields are required!'
    E₃ = { (book_id, content) | book_id ∈ B ∧ content ∈ ¬C } → 400 cu mesajul 'All fields are required!'

Analiză valori de frontieră:

    Pentru această funcție nu avem valori de frontieră.

**Domeniul de ieșiri**
   - status cod 201 cu mesaj de succes
   - status cod 400 cu mesaj de eroare cu toate câmpurile sunt obligatorii

### Teste pentru get comments

Am împărțit funcția în mai multe cazuri:
 - totul merge bine: atunci funcția ar trebui să returneze statusul 200 și o listă de comentarii;
 - nu sunt comentarii pentru acea cartea introdusă: atunci funcția ar trebui să returneze statusul 404 și mesajul: 'No comments found for this book!';
 - dacă apare o eroare neprevăzută: atunci funcția ar trebui să returneze statusul 500 și mesajul: 'Error fetching comments!';

Intrări:
 - book_id

Se disting următoarele categorii:

    B_1 = { book_id | carte existentă și are comentarii }
    B_2 = { book_id | carte existentă dar fără comentarii }
    B_3 = { book_id | carte validă dar apare o eroare în timpul procesării }

Partiționare de echivalență:

    C₁₁ = { book_id | book_id ∈ B₁ } → 200 cu lista de comentarii
    C₁₂ = { book_id | book_id ∈ B₂ } → 404 cu mesajul 'No comments found for this book!'
    C₁₃ = { book_id | book_id ∈ B₃ } → 500 cu mesajul 'Error fetching comments!'

Analiză valori de frontieră:

    Pentru această funcție nu avem valori de frontieră.

**Domeniul de ieșiri**
   - status cod 200 și o listă de comentarii
   - status cod 404 cu mesaj de eroare care să spună că nu au fost adăugate comentarii pentru cartea respectivă
   - status cod 500 cu mesaj de eroare 

### Teste pentru post reviews

Am împărțit funcția în mai multe cazuri: 
 - totul merge bine: atunci funcția ar trebui să returneze statusul 201 și mesajul 'Review added successfully!';
 - dacă rating-ul are o valoare mai mare decât 5: atunci funcția ar trebui să returneze statusul 400 și mesajul 'Rating must be a number between 1 and 5.';
 - dacă rating-ul are o valoare mai mică decât 1: atunci funcția ar trebui să returneze statusul 400 și mesajul 'Rating must be a number between 1 and 5.';
 - dacă review-ul există deja: atunci funcția ar trebui să returneze statusul 400 și mesajul 'You have already added a review for this book.';
 - dacă rating-ul este mai mic decât 1 și book_id este null: atunci funcția ar trebui să returneze statusul 400 și mesajul 'All fields are required!';
 - dacă rating-ul este mai mare decât 5 și book_id este null: atunci funcția ar trebui să returneze statusul 400 și mesajul 'All fields are required!';
 - dacă rating-ul este null: atunci funcția ar trebui să returneze statusul 400 și mesajul 'All fields are required!';
 - daca book_id este null: atunci funcția ar trebui să returneze statusul 400 și mesajul 'All fields are required!';

Se disting următoarele categorii:

    R_valid = { rating | 1 ≤ rating ≤ 5 }
    R_lt_1 = { rating | rating < 1 }
    R_gt_5 = { rating | rating > 5 }
    R_null = { rating | rating este null }
    B_present = { book_id | book_id nu este null }
    B_null = { book_id | book_id este null }
    RV_exists = { review | review deja există }
    RV_new = { review | review nu există încă }

Partiționare de echivalență:

    C₁₁ = { (rating, book_id, review) | rating ∈ R_valid ∧ book_id ∈ B_present ∧ review ∈ RV_new } → 201, 'Review added successfully!'
    C₁₂ = { (rating, book_id, review) | rating ∈ R_gt_5 ∧ book_id ∈ B_present } → 400, 'Rating must be a number between 1 and 5.'
    C₁₃ = { (rating, book_id, review) | rating ∈ R_lt_1 ∧ book_id ∈ B_present } → 400, 'Rating must be a number between 1 and 5.'
    C₁₄ = { (rating, book_id, review) | rating ∈ R_valid ∧ book_id ∈ B_present ∧ review ∈ RV_exists } → 400, 'You have already added a review for this book.'
    C₁₅ = { (rating, book_id, _) | rating ∈ R_lt_1 ∧ book_id ∈ B_null } → 400, 'All fields are required!'
    C₁₆ = { (rating, book_id, _) | rating ∈ R_gt_5 ∧ book_id ∈ B_null } → 400, 'All fields are required!'
    C₁₇ = { (rating, book_id, _) | rating ∈ R_null } → 400, 'All fields are required!'

Analiza valori de frontieră:

    Valorile de frontieră sunt reprezentate pentru valorile rating-ului mai mic decât 1 și mai mare decât 5

**Domeniul de ieșiri**
  - status cod 201 și un mesaj de succes
  - status cod 400 cu mesaj de eroare

### Funcția de returnare a cărților unui utilizator
Aceasta este reprezentată de un handler pentru o cerere HTTP de tip GET, care gestionează ruta **/id/:user_id?**. 

![image](https://github.com/user-attachments/assets/40381bb5-5cc3-4c30-be4f-774ccea72543)

1. **Testare Funcțională**

   - Partiționare de echivalență (equivalence partitioning)
      
      **Domeniul de intrări**
      - Există o singură intrare: ```user_id```

      Se disting următoarele clase de echivalență:
      
      a) Clase bazate pe validatatea user_id-ului
      
         U_1 = { user_id | user_id este un string care poate conține orice caracter}
      
         U_4 = { user_id | user_id lipsă}
      
      b) Clase bazate pe existența cărților în baza de date pentru un user valid
      
         D_1 = { user_id ∈ U_1 | există ≥1 cărți asociate}
      
         D_2 = { user_id ∈ U_1 | nu există cărți asociate}
      
         D_3 = { user_id ∈ U_1 | eroare bază de date}

      **Domeniul de ieșiri**
       - status cod 200 OK cu array de cărți
       - status cod 404 cu mesaj
       - status cod 400 cu mesaj de eroare
       - status cod 500 cu mesaj de eroare
  
      **Clase de echivalență globale**
      
      C_11 = { user_id | user_id ∈ U_1 ∧ user_id ∈ D_1 } → 200 cu cărți
      
      C_12 = { user_id | user_id ∈ U_1 ∧ user_id ∈ D_2 } → 404
      
      C_13 = { user_id | user_id ∈ U_1 ∧ user_id ∈ D_3 } → 500
      
      C_2  = { user_id | user_id ∈ U_2 } → 400
      
      C_3  = { user_id | user_id ∈ U_3 } → 400
      
      C_4  = { user_id | user_id ∈ U_4 } → 400

      5 clase
      
   - Analiza valorilor de frontieră (boundary value analysis)

      Întrucât user_id nu are limite, analiza valorilor de frontieră nu se aplică direct în cadrul testării, fiind suficientă partiționarea de echivalență.
      
   - Partiționarea în categorii (categorii partitioning)

      Se identifică trei categorii:

      a) Categorii pentru validatatea user_id-ului:
         - user_id valid (număr)
         - user_id invalid (caractere ne-numerice)
         - user_id lipsă

      b) Categorii pentru starea bazei de date
         - există cărțile asociate în baza de date
         - nu există cărțile asociate în baza de date
         - eroare la baza de date

      c) Categorii pentru răspunsul sistemului
         - state code 200
         - state code 404
         - state code 400
         - state code 500
     
 ### Rezultate teste
 ![image](https://github.com/user-attachments/assets/5692ca35-209b-418e-b80a-2d5068df0764)

    

## Bibliografie
- https://jestjs.io/docs/getting-started
- https://www.geeksforgeeks.org/testing-with-jest/
- https://devhints.io/jest
- https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
- https://medium.com/@dilip.bhaidiya/mastering-react-js-testing-with-jest-a-comprehensive-guide-1acada2b9586
- https://stryker-mutator.io/docs/stryker-js/introduction/
- https://yumasoft.pl/how-to-use-strykerjs-with-jest-and-typescript-3/
- https://jestjs.io/docs/mock-function-api
  



