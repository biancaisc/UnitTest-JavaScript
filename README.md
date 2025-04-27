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
 
 1. Instalare și inițializare StrykerJS (în folderul backend)
 
     ```npm init stryker```
    
    Se vor alege aceste opțiuni:
    
    ![image](https://github.com/user-attachments/assets/7d0699d2-0fa1-4b96-a684-319b748f780a)

    Se va crea un fișier de configurare ***stryker.conf.js***.

 2. Configurare fișier ***stryker.conf.js***

    Se adaugă manual proprietatea **mutate**, pentru ca stryker să modifice fișierele pentru care au fost configurate testele.

    ```mutate: ['routes/**.js']```
    
 1. Rulare StrykerJS

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

### 1.Testare functionala

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

### 2. Testare structurala
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

<<<<<<< HEAD
![functie drawio](https://github.com/user-attachments/assets/69dd71b2-1479-41aa-9558-8ad770790d8d)

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

<<<<<<< HEAD
         O_5 =  un mesaj dacă se produce o eroare în baza de date, când datele sunt valide, returnând cod 500
=======
    
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

<<<<<<< HEAD
2. **Testare Structurală**
    - **Graful de flux de control** al programului (CFG) 

    ![graf-functie drawio (1) drawio](https://github.com/user-attachments/assets/4c626583-8af8-4881-867c-e481976a4d53)

      Funcția are câteva puncte de decizie:

       - verifică dacă user_id sau book_id sunt invalide
       - verifică dacă cartea există în biblioteca user-ului
       - verifică dacă user-ul există

      Pe baza grafului se pot defini următoarele acoperiri:

      a) **Acoperire la nivel de instrucțiune** (Statement coverage)
      
      Ne concentrăm asupra instrucțiunilor controlate de condiții, pentru ca fiecare instrucțiune(nod al grafului) să fie parcursă cel puțin o dată:
   
       - returnează eroare pentru input invalid
       - returnează cartea din biblioteca user-ului
       - returnează mesaj dacă nu există cartea în biblioteca user-ului
       - returnează mesaj dacă user-ul nu există
       - returnează eroare când se produce o eroare de la baza de date

      | user_id | book_id | Rezultat afișat | Instrucțiuni parcurse |
      |-------------------------------|-------------------------------------------------|--------------------------------------------------------------------------------------|--------------------------------------------------------------------|
      | "user-invalid123" | "10" | 400 + "Invalid user id or book id provided." | 1-3 → 4 → 5-7 → 24 |
      | "1" | "1" -cartea există | 200 + cartea găsită | 1-3 → 4 → 8-9 → 10 → 11 → 24 |
      | "1" | "2" -cartea nu există | 404 + "The book is not in your library." | 1-3 → 4 → 8-9 → 10 → 12-13 → 14 → 15-16  → 24 |
      | "999" -user inexistent | "1" | 404 + "The user does not exist." | 1-3 → 4 → 8-9 → 10 → 12-13 → 14 → 17-20 → 24 |
      | "1" | "1" | 500 + "There is an error processing your request." | 1-3 → 4 -> 8-9 -> 21-23 → 24 |

      b) Acoperire la nivel de decizie (Decision coverage)

      Pentru fiecare decizie trebuie să testăm ieșirile care rezultă când fiecare decizie este adevarată sau falsă.

      | Decizie | user_id | book_id | Output Decizie | Rezultat așteptat |
      |------------------|-----------------|----------------|--------------|--------------------|
      | `if(!user_id.trim() \|\| !book_id.trim() \|\| isNaN(user_id) \|\| isNaN(book_id))` | invalid | valid | adevărat | 400 + "Invalid user id or book id provided." |
      | `if(!user_id.trim() \|\| !book_id.trim() \|\| isNaN(user_id) \|\| isNaN(book_id))` | valid | valid | fals | verificare existență carte |
      | `if (book)` | valid | valid - carte existentă | adevărat | 200 + cartea găsită |
      | `if (book)` | valid | valid - carte inexistentă | fals | verificare existență user |
      | `if (userExists)`| valid - user existent | valid - carte inexistentă | adevărat | 404 + "The book is not in your library." |
      | `if (userExists)` | valid - user inexistent | valid | fals | 404 + "The user does not exist." |

      Toate rezultatele au fost deja acoperite prin testele anterioare.

      c) Acoperire la nivel de condiție (Condition coverage)

      Aceasta implică fiecare condiție individuală dintr-o decizie să ia atât valoarea adevărat cât și fals.
      
      | Decizie | Condiție individuală |
      |-------|-----------|
      | `if(!user_id.trim() \|\| !book_id.trim() \|\| isNaN(user_id) \|\| isNaN(book_id))` | !user_id.trim(), !book_id.trim(), isNaN(user_id), isNaN(book_id) |
      | `if (book)` | book |
      | `if (userExists)` | userExists |

      Date de test pentru a acoperi toate condițiile: 

      | user_id | book_id | Condiție acoperită | Rezultat așteptat |
      |----------|-------------|-------------------|---------------------|
      | " " | 1 | `!user_id.trim() = true`, restul condițiilor sunt false | 400 + "Invalid user id or book id provided." |
      | 1 | " " | `!book_id.trim() = true`, restul condițiilor sunt false | 400 + "Invalid user id or book id provided." |
      | "abc" | 1 | `isNaN(user_id) = true`, restul condițiilor sunt false | 400 + "Invalid user id or book id provided." |
      | 1 | "abc" | `isNaN(book_id) = true`, restul condițiilor sunt false | 400 + "Invalid user id or book id provided." |
      | "1" | "1" -cartea există | `book = true` | 200 + cartea găsită | 
      | "1" | "2" -cartea nu există | `book = false` | verificare existență user |
      | "1" - user există | "2" -cartea nu există | `userExists = true` | 404 + "The book is not in your library." |
      | "999" -user inexistent | "1" | `userExists = false` | 404 + "The user does not exist." |

      d) Acoperire la nivel de condiție/decizie

      Această acoperire cere ca:
   
       - fiecare condiție să fie atât true cât și false
       - fiecare decizie întreagă să fie și true și false

      Testele anterioare au acoperit aceste cazuri.

      e) Acoperire la nivel de condiții multiple (Multiple Condition Coverage)

      Avem o decizie care cuprinde condiții multiple:
          
        !user_id.trim() || !book_id.trim() || isNaN(user_id) || isNaN(book_id)
          
      Pentru a testa toate combinațiile posibile ale condițiilor individuale, în număr de 4, ar trebui 2^4 teste, dar operatorul || se oprește la prima evaluare și putem optimiza astfel:

      | user_id | book_id | Condiție acoperită |
      |----------|-------------|-------------------
      | " " | 1 |	`!user_id.trim() = true`, restul condițiilor sunt false |
      | 1 | " " | `!book_id.trim() = true`, restul condițiilor sunt false |
      | "abc" | 1 | `isNaN(user_id) = true`, restul condițiilor sunt false |
      | 1 | "abc" | `isNaN(book_id) = true`, restul condițiilor sunt false |
      | 1 | 1 | toate condițiile false |

      Cazurile au fost acoperite prin testele anterioare.

      f) Modified condition/decision (MC/DC) coverage
      
      Pentru fiecare condiție trebuie să vedem că poate influența decizia în mod independent.

      Prin testele de la Multiple Coverage Coverage, se demonstrează că:
      
       - !user_id.trim() influențează singură decizia (user_id = " ")
       - !book_id.trim() influențează singură decizia (book_id = " ")
       - isNaN(user_id) influențează singură decizia	(user_id = "abc")
       - isNaN(book_id) influențează singură decizia (book_id = "abc")
          
      g) Testarea circuitelor independente

      Circuitele linear independente implică proprietatea ca nici unul să nu poate fi obținut ca o combinație a celorlalte.

      Ducând un arc de la 24 la 1, obținem:
      
          N = 12
          E = 15
          V(G) = E - N + 2 = 5 circuite independente

      | Circuit | Cale urmată | Descriere |
      |----------|-------------|-------------------|
      | C1 | 1-3 → 4 → 5-7 → 24 -> 1-3 | input invalid → return 400 |
      | C2 | 1-3 → 4 → 8-9 → 10 → 11 → 24 -> 1-3 | carte găsită → return 200 |
      | C3 | 1-3 → 4 → 8-9 → 10 → 12-13 → 14 → 15-16  → 24 -> 1-3 | cartea nu e găsită, user e găsit |
      | C4 | 1-3 → 4 → 8-9 → 10 → 12-13 → 14 → 17-20 → 24 -> 1-3 | userul nu e găsit |
      | C5 | 1-3 → 4 -> 8-9 -> 21-23 → 24 -> 1-3 | excepție DB |

      Acestea au fost acoperite prin testele anterioare.

      h) Testarea la nivel de cale

      Căile principale sunt:

      - validare invalidă ➔ return 400	
      - carte există ➔ return 200	
      - carte nu există, user există ➔ return 404 (book)	
      - carte nu există, user nu există ➔ return 404 (user)	
      - excepție în DB ➔ return 500

      Acestea au fost acoperite prin testele anterioare.

 3. **Testare de Mutanți**

    Stryker a identificat 1 fișier sursă de mutat dintr-un total de 65 fișiere.
    
    Au fost generate 32 de mutanți pe baza codului sursă.

    Pentru rularea testelor a fost folosit test runner-ul jest cu analiză perTest pentru acoperirea codului.

    Rezultate obținute:

        Mutanți testați: 32/32
        
        Mutanți omorâți ("killed"): 21
        
        Mutanți care au supraviețuit ("survived"): 4
        
        Mutanți care au expirat timpul de execuție ("timed out"): 7
        
        Mutation Score: 87.5% (21 mutanți omorâți din 24 testați efectiv)

    Observații:

        - codul sursă testat este library.js, implicând funcționalitatea de obținere a cărților asociate unui utilizator (GET /id/:user_id)
        
        - testele au fost împărțite în teste funcționale (Equivalence Partitioning, Boundary Value Analysis, Category Partitioning) și teste structurale (Statement și Condition Coverage)
        
        - mjoritatea mutanților au fost corect detectați de teste, indicând o acoperire bună a cazurilor de eroare și a fluxurilor normale
        
        - mutanții supraviețuitori au fost în principal modificări asupra literalelor de string folosite în interogările SQL sau mesajele de eroare (console.error), sugerând că testele nu verifică explicit aceste mesaje sau interogări

    Exemple de mutanți supraviețuitori:

        - eliminarea query-ului SQL în routes/library.js:44.
        
        - eliminarea mesajelor de eroare în routes/library.js:48 și routes/library.js:65.
        
        - înlocuirea unei interogări SQL cu un string gol în routes/library.js:56.

     Pentru a acoperi și mutanții supraviețuitori, ar putea fi util să adăugăm:

        - teste suplimentare care verifică existența mesajelor de eroare în caz de input invalid sau erori de bază de date.
        
        - validări suplimentare pentru interogările SQL (dacă relevant pentru aplicație).
       
    Testele au rulat cu o medie de 15.97 teste pe mutant.
    
    Durata totală a testării de mutație: aproximativ 21 de secunde.
    
    Raportul complet a fost generat și salvat într-un format HTML la **reports/mutation/mutation.html**

    ![image](https://github.com/user-attachments/assets/12ab5ab4-8f13-4e83-ac0c-535559b393b6)

    În urma îmbunătățirii testelor, am obținut acoperirea 100% a codului testat.

    ![image](https://github.com/user-attachments/assets/1862a278-05b3-4e4e-838d-794ee6973d23)

    Actualizări teste:

       - am adăugat un **jest.spyOn(console, 'error')** pentru a verifica afișarea mesajelor de eroare specifice
       
       - am creat un mock pentru **db.prepare** și am verificat apelurile pentru interogările SQL corecte 
       
       - am validat ordinea și conținutul apelurilor către db.prepare folosind **mock.calls**

 ### Rezultate teste functionale
 ![image](https://github.com/user-attachments/assets/5692ca35-209b-418e-b80a-2d5068df0764)

 ## Testare structurala

 Pentru functia de PUT review
![image](https://github.com/user-attachments/assets/1415c511-290a-4e97-baad-0589fca51d08)



    
=======
 2. **Testare Structurală**
     
 ### Rezultate teste functionale
 ![image](https://github.com/user-attachments/assets/5692ca35-209b-418e-b80a-2d5068df0764)


>>>>>>> e44bd22e6319fa881beacf8af2f4174f9afcd1d4

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
  



