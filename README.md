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

    B_1 = { book_id | book_id este prezent }
    B_2 = { book_id | book_id este lipsă }

b) Existența sau absența content

    C_1 = { content | content este prezent }
    C_2 = { content | content este lipsă }

Partiționare de echivalență:

    E_11 = { (book_id, content) | book_id ∈ B_1 ∧ content ∈ C_1 } → 201 cu mesajul 'Comment added successfully!'
    E_21 = { (book_id, content) | book_id ∈ B_2 ∧ content ∈ C_1 } → 400 cu mesajul 'All fields are required!'
    E_12 = { (book_id, content) | book_id ∈ B_1 ∧ content ∈ C_2 } → 400 cu mesajul 'All fields are required!'

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

    C_1 = { book_id | book_id ∈ B_1 } → 200 cu lista de comentarii
    C_2 = { book_id | book_id ∈ B_2 } → 404 cu mesajul 'No comments found for this book!'
    C_3 = { book_id | book_id ∈ B_3 } → 500 cu mesajul 'Error fetching comments!'

Analiză valori de frontieră:

    Pentru această funcție nu avem valori de frontieră.

**Domeniul de ieșiri**
   - status cod 200 și o listă de comentarii
   - status cod 404 cu mesaj de eroare care să spună că nu au fost adăugate comentarii pentru cartea respectivă
   - status cod 500 cu mesaj de eroare 

### Teste pentru post reviews
Functia adauga un review nou
![image](https://github.com/user-attachments/assets/54cda963-17f6-4b36-948d-48d30533d1d2)

### Testare functionala

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

### Testare structurala
**Acoperire la nivel de instructiunie(statement coverage)**

Fiecare instructiune din functia de creare a review-ului (router.post) este executată cel putin o data:

  - instructiunile care valideaza prezenta book_id si rating

  - instructiunile care valideaza daca rating este un numar între 1 și 5

  - interogarea bazei de date pentru a verifica duplicatele

  - inserarea unui review nou

  - tratarea erorilor in cazul in care baza de date arunca exceptii

**Acoperire la nivel de ramura**

```if (!book_id || !rating) ```
 - fiecare din cei 2 parametrii ia atat valoarea adevarat cat si fals

```if (isNaN(rating) || rating < 1 || rating > 5)```
 - se testeaza cazul cand este adevarata (rating invalid) si cand este falsa (rating valid)

``` if (existingReview)```
 - se testeaza daca review-ul exista deja sau nu; daca exista se intoarce ramura de eroare cu codul 400, altfel se insereaza in baza de date si se intoarce raspunsul 201

```catch (error) ```
  - se testeaza daca exista o eroare in baza de date

**Acoperire la nivel de conditie(condition coverage)**

``` if (!book_id || !rating) ```
 - sunt testate atat cat sunt true(lipsesc) cat si false(exista)

```if (isNaN(rating) || rating < 1 || rating > 5) ```
   - toate cele 3 conditii: isNaN(rating), rating < 1, rating > 5 sunt testate atunci cand trimit rating "abc", -1 si 6

``` if (existingReview)```
 - existenta unui review in baza de date este testata pentru ambele cazuri, review gasit si negasit

**Acoperire la nivel de conditie/decizie**

Am asigurat ca fiecare decizie (```if```) din cod a avut toate rezultatele posibile, si ca fiecare conditie care contribuie la decizie a avut toate valorile posibile

```if (!book_id || !rating)```

 - Decizie compusa din 2 conditii: !book_id si !rating; am testat in cod fara book_id, fara rating, cu ambele si fara niciunul

```if (isNaN(rating) || rating < 1 || rating > 5)```
 - Decizie compusa din 3 conditii: isNaN(rating), rating < 1 si rating > 5
 - rating = "abc" → isNaN(rating) este true → raspuns 400
 - rating = 0 → rating < 1 este true → raspuns 400
 - rating = 6 → rating > 5 este true → raspuns 400
 - rating = 4 → toate conditiile false → codul continua mai departe

```if (existingReview)```
- O singura conditie
- existingReview = true -> raspuns 400
- existingReview = false -> se continua inserarea


    
### Funcția de returnare a cărții unui utilizator
Aceasta este reprezentată de un handler pentru o cerere HTTP de tip GET, care gestionează ruta **/:user_id/:book_id**. 

![image](https://github.com/user-attachments/assets/c917811c-5039-4fc1-b877-a820f35b3aa9)

1. **Testare Funcțională**

   - Partiționare de echivalență (equivalence partitioning)
      
      **Domeniul de intrări**
      - Există două intrări:

        ```user_id``` - string
        
        ```book_id``` - string

      Se disting următoarele clase de echivalență:
      
      a) Clase bazate pe validatatea user_id-ului
      
         U_1 = { user_id | user_id  valid - caractere numerice}
      
         U_2 = { user_id | user_id invalid - string gol sau conține caractere ne-numerice}
      
      b) Clase bazate pe validatatea book_id-ului
      
         B_1 = { book_id | book_id valid - caractere numerice}
      
         B_2 = { book_id | book_id invalid - string gol sau conține caractere ne-numerice}

 
      **Domeniul de ieșiri constă din următoarele răspunsuri**

         O_1 = cartea returnată dacă există în biblioteca user-ului, returnând cod 200
       
         O_2 = un mesaj dacă nu se găsește cartea în biblioteca user-ului, returnând cod 404

         O_3 = un mesaj dacă user-ul este inexistent, returnând cod 404

         O_4 =  un mesaj dacă user_id sau book_id au valori invalide, returnând cod 400

         O_5 =  un mesaj dacă se produce o eroare în baza de date, indiferent de validatatea input-urilor, returnând cod 500
    
      **Clase de echivalență globale**
      
         C_111 = { (user_id,book_id) | user_id ∈ U_1, book_id ∈ B_1, ieșire = O_1 } → 200 cu cartea corespunzătoare

         C_112 = { (user_id,book_id) | user_id ∈ U_1, book_id ∈ B_1, ieșire = O_2 } → 404

         C_113 = { (user_id,book_id) | user_id ∈ U_1, book_id ∈ B_1, ieșire = O_3 } → 404
     
         C_12 = { (user_id,book_id) | user_id ∈ U_1, book_id ∈ B_2, ieșire = O_4 } → 400

         C_21 = { (user_id,book_id) | user_id ∈ U_2, book_id ∈ B_1, ieșire = O_4 } → 400
 
         C_22 = { (user_id,book_id) | user_id ∈ U_2, book_id ∈ B_2, ieșire = O_4 } → 400
     
      6 clase de echivalență

     | user_id | book_id | Rezultat așteptat |
     |-------|-----------|---------|
     | "10" | "4" | 200 + cartea asociată |
     | "5" | "3" | 404 + mesaj: "The book is not in your library." |
     | "6" | "10" | 404 + mesaj: "The user does not exist." |
     | "user1" | "100" | 400 + mesaj: "Invalid user id or book id provided." |
     | "50" | "book1" | 400 + mesaj: "Invalid user id or book id provided." |
     | "user2" | "book2" | 400 + mesaj: "Invalid user id or book id provided." |
      
   - Analiza valorilor de frontieră (boundary value analysis)

      Nu avem limite impuse direct pentru user_id și book_id, acestea putând lua orice valori, dar putem testa cazurile limită care ar putea cauza erori:

         - user_id și book_id au valoarea 1
         - user_id și book_id au valori foarte mari
         - user_id și book_id au valoarea 0
         - user_id și book_id sunt negative
         - user_id și book_id sunt string-uri goale

     10 cazuri de testare

     | user_id | book_id | Rezultat așteptat |
     |-------|-----------|---------|
     | "1" | "10" | 200 + cartea asociată |
     | "5" | "1" | 200 + cartea asociată |
     | "100000" | "10" | 200 + cartea asociată |
     | "5" | "100000" |  200 + cartea asociată |
     | "0" | "4" | 200 + cartea asociată |
     | "5" | "0" | 200 + cartea asociată |
     | "-1" | "10" | 200 + cartea asociată |
     | "5" | "-10" | 200 + cartea asociată |
     | " " | "5" | 200 + cartea asociată |
     | "10" | " " | 200 + cartea asociată |

      
   - Partiționarea în categorii (category partitioning)

     
      Se identifică patru categorii:

      a) Categorii pentru validatatea user_id-ului:
     
         - user_id valid (număr)
         - user_id invalid (caractere ne-numerice, spații goale)
       
      b) Categorii pentru validatatea book_id-ului:
     
         - book_id valid (număr)
         - book_id invalid (caractere ne-numerice, spații goale)

      c) Categorii pentru starea bazei de date
     
         - există cartea în biblioteca user-ului în baza de date
         - nu există cartea în baza de date
         - nu există user-ul în baza de date
         - datele sunt invalide
         - eroare la baza de date

      d) Categorii pentru răspunsul sistemului
     
         - state code 200
         - state code 404
         - state code 400
         - state code 500

      Pentru a acoperi toate alternativele, putem crea următoarele cazuri de testare:
     
         - user_id valid + book_id valid + carte găsită -> 200
         - user_id valid + book_id valid + cartea nu există, dar user-ul da -> 404
         - user_id valid + book_id valid + nici cartea, nici user-ul nu există -> 404
         - user_id invalid + book_id valid -> 400
         - user_id valid + book_id invalid -> 400
         - user_id invalid + book_id invalid -> 400
         - user_id valid + book_id valid + eroare DB -> 500
       
        7 cazuri de testare

        | user_id | book_id | stare DB | Rezultat |
        |-------|-----------|---------|---------|
        | "123" | "10" | carte găsită | 200 + cartea asociată |
        | "10" | "10" | carte nu e găsită, dar user-ul există | 404 + "The book is not in your library." |
        | "15" | "20" | carte nu e găsită, iar user-ul nu există | 404 + "The user does not exist." |
        | "abc1-invalid" | "5" | - | 400 + "Invalid user id or book id provided." |
        | "30" | "book123" | - | 400 + "Invalid user id or book id provided." |
        | " " | "a-1-2" | - | 400 + "Invalid user id or book id provided." |
        | "100" | "101" | Eroare DB | 500 + "There is an error processing your request." |

 2. **Testare Structurală**
     
 ### Rezultate teste functionale
 ![image](https://github.com/user-attachments/assets/5692ca35-209b-418e-b80a-2d5068df0764)

 ## Testare structurala

 Pentru functia de PUT review
![image](https://github.com/user-attachments/assets/1415c511-290a-4e97-baad-0589fca51d08)



    

## Bibliografie
- https://jestjs.io/docs/getting-started
- https://www.geeksforgeeks.org/testing-with-jest/
- https://devhints.io/jest
- https://www.geeksforgeeks.org/how-to-test-react-components-using-jest/
- https://medium.com/@dilip.bhaidiya/mastering-react-js-testing-with-jest-a-comprehensive-guide-1acada2b9586
- https://stryker-mutator.io/docs/stryker-js/introduction/
- https://yumasoft.pl/how-to-use-strykerjs-with-jest-and-typescript-3/
- https://jestjs.io/docs/mock-function-api
- https://www.lambdatest.com/learning-hub/structural-testing
  



