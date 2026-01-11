# System Zarządzania Biblioteką

Aplikacja webowa do zarządzania zasobami bibliotecznymi z obsługą rezerwacji książek.

## 🚀 Funkcjonalności

### Dla wszystkich użytkowników:
- 📚 Przeglądanie katalogu książek
- 🔍 Wyszukiwanie książek po tytule i autorze
- 🎯 Filtrowanie według statusu (dostępna/wypożyczona/zarezerwowana)

### Dla zalogowanych użytkowników:
- 📝 Rejestracja i logowanie
- 📖 Rezerwacja dostępnych książek
- 📋 Podgląd własnych rezerwacji
- ❌ Anulowanie rezerwacji

### Panel administratora:
- ➕ Dodawanie nowych książek
- ✏️ Edycja informacji o książkach
- 🗑️ Usuwanie książek
- 📊 Podgląd wszystkich rezerwacji
- 🚫 Anulowanie rezerwacji użytkowników

## 🛠️ Technologie

- **React** - biblioteka UI
- **Vite** - build tool
- **React Router** - routing
- **Axios** - komunikacja z API
- **CSS** - stylizacja

## 📋 Wymagania

- Node.js (v16 lub nowsza)
- npm lub yarn
- Backend API działający na `http://localhost:3000`

## 🚀 Instalacja i uruchomienie

1. **Zainstaluj zależności:**
```bash
npm install
```

2. **Upewnij się, że backend API działa na porcie 3000**

3. **Uruchom aplikację w trybie deweloperskim:**
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:5173`

4. **Build produkcyjny:**
```bash
npm run build
```

5. **Podgląd wersji produkcyjnej:**
```bash
npm run preview
```

## 📁 Struktura projektu

```
src/
├── components/         # Komponenty wielokrotnego użytku
│   ├── Navbar.jsx     # Nawigacja
│   ├── ProtectedRoute.jsx  # Ochrona tras
│   ├── BookCard.jsx   # Karta książki
│   └── BookForm.jsx   # Formularz dodawania/edycji książki
├── pages/             # Strony aplikacji
│   ├── Login.jsx      # Strona logowania
│   ├── Register.jsx   # Strona rejestracji
│   ├── Books.jsx      # Lista książek
│   ├── Reservations.jsx  # Rezerwacje użytkownika
│   └── Admin.jsx      # Panel administratora
├── context/           # Context API
│   └── AuthContext.jsx  # Kontekst autoryzacji
├── services/          # Serwisy
│   └── api.js         # Komunikacja z API
├── App.jsx            # Główny komponent
└── main.jsx           # Punkt wejścia
```

## 🔌 API Endpoints

Aplikacja oczekuje następujących endpointów:

### Autoryzacja
- `POST /auth/login` - logowanie
- `POST /auth/register` - rejestracja

### Książki
- `GET /books` - lista wszystkich książek
- `GET /books/:id` - szczegóły książki
- `POST /books` - dodanie książki (admin)
- `PUT /books/:id` - aktualizacja książki (admin)
- `DELETE /books/:id` - usunięcie książki (admin)

### Rezerwacje
- `GET /reservations` - wszystkie rezerwacje (admin)
- `GET /reservations/user` - rezerwacje użytkownika
- `POST /reservations` - nowa rezerwacja
- `DELETE /reservations/:id` - anulowanie rezerwacji

## 👤 Role użytkowników

- **Użytkownik (user)** - może przeglądać książki i zarządzać własnymi rezerwacjami
- **Administrator (admin)** - pełny dostęp do zarządzania książkami i rezerwacjami

## 🎨 Funkcje UI

- Responsywny design
- Intuicyjny interfejs
- Komunikaty o błędach i sukcesach
- Filtry i wyszukiwarka
- Odznaki statusu książek
- Ochrona tras przed nieautoryzowanym dostępem

## 📝 Uwagi

- Token JWT jest przechowywany w localStorage
- Dane użytkownika są zapisywane lokalnie po zalogowaniu
- Aplikacja automatycznie dodaje token do nagłówków żądań
- Wymaga działającego backendu na `localhost:3000`

## 🔒 Bezpieczeństwo

- Trasy chronione przez ProtectedRoute
- Weryfikacja roli administratora
- Automatyczne przekierowania dla nieautoryzowanych użytkowników
- Token JWT w nagłówkach Authorization

## 🐛 Troubleshooting

**Problem:** Błąd połączenia z API
- Upewnij się, że backend działa na porcie 3000
- Sprawdź konfigurację CORS w backendzie

**Problem:** Nie można się zalogować
- Sprawdź poprawność danych logowania
- Zweryfikuj odpowiedź API w narzędziach deweloperskich

**Problem:** Brak dostępu do panelu administratora
- Upewnij się, że użytkownik ma rolę 'admin'
- Sprawdź dane użytkownika w localStorage

