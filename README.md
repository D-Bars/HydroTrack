HydroTrack

 *********************************************** Wprowadzenie: ***********************************************

HydroTrack to aplikacja, która śledzi ilość wypijanej wody w ciągu dnia.
Aby zwiększyć zaangażowanie użytkownika, wprowadzono avatara (z uwagi na brak możliwości stworzenia pełnej animowanej postaci w czasie rzeczywistym zastosowano zmianę grafik w reakcji na działania użytkownika). Dzięki temu avatar zyskuje wrażenie interaktywności i immersji.

Dodatkowo w aplikacji pojawia się waluta wirtualna oraz codzienne zadania, które zachęcają użytkownika do regularnego korzystania z aplikacji i gamifikują proces nawadniania.

W trakcie implementacji, aby rozszerzyć logikę i lepiej zarządzać kodem, starałem się dekomponować i dzielić projekt na helpery oraz mniejsze elementy. Jednocześnie duża część kodu została wygenerowana przy pomocy AI, co pozwoliło przyspieszyć pracę i dodać więcej funkcjonalności w ograniczonym czasie. 

 *********************************************** Stos technologiczny ***********************************************

- React

- ustand

- Vite

- TypeScript

 *********************************************** Funkcjonalności ***********************************************

- Routing 

- Chronione ścieżki (tylko dla zarejestrowanych użytkowników).

- Strona rejestracji

- Formularz rejestracyjny z podstawowymi danymi użytkownika.

- Strona główna 

=> Zawiera moduły informacyjne i interaktywne:

- Kalendarz – obecnie obsługuje aktualny tydzień z wyróżnieniem bieżącego dnia.

- Historia przyjęć wody – wyświetlanie ostatnich 3 zapisów.

- Waluta wirtualna – licznik punktów zdobywanych za realizację celów.

- Codzienne zadania – system losujący 2 zadania z szablonu (przez helpery).

- Progress bar (butelka) – graficzny wskaźnik w formie butelki SVG, który napełnia się proporcjonalnie do wypitej ilości wody.

- Użytkownik może dodać porcję wody jednym z gotowych przycisków lub wpisać własną ilość.

- Avatar – dynamiczny obrazek (img), który zmienia się wraz z akcjami użytkownika (animacja przejścia, iluzja interakcji z postacią).


- Strona profilu

- Dane użytkownika (z rejestracji + dane aplikacji).

=> Wyświetlany jest m.in.:

- rekomendowany dzienny cel nawodnienia (obliczany helperem, z możliwością ręcznej zmiany),

- aktualny stan waluty wirtualnej.

- Formularz edycji danych użytkownika.

- Avatar i ikony dobierane są na podstawie płci — dzięki tablicy szablonów i funkcjom helperów.

*********************************************** Niezrealizowane (planowane rozszerzenia funkcjonalności) ***********************************************

- Strona z historią dla kalendarza z możliwością podglądu całej historii.

- Strona historii wypitej wody (obecnie tylko 3 ostatnie działania).

- Większa liczba zadań dziennych.

- Logika wyświetlania odwodnionego avatara, jeśli norma wody nie zostanie spełniona.

- Sklep do wykorzystania waluty wirtualnej.

*********************************************** Kluczowe cechy ***********************************************

- Gamifikacja procesu nawodnienia (avatar, waluta, zadania).

- Wsparcie dla personalizacji (ustawienia płci, własny dzienny cel wody).

                                 ***********************************************

                      Dziękuję za możliwość realizacji tego projektu i za czas poświęcony na jego obejrzenie.
                      Mam nadzieję, że przeglądanie HydroTrack sprawi przyjemność i pokaże, jak można połączyć 
                                              praktyczne narzędzie z grą.

                                          Życzę miłego korzystania z aplikacji

                                ***********************************************