import { useState, useEffect } from "react";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
  getReservations,
  cancelReservation,
  completeReservation,
  getStats,
} from "../services/api";
import BookForm from "../components/BookForm";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import "./Admin.css";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [books, setBooks] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (activeTab === "books") {
      loadBooks();
    } else if (activeTab === "reservations") {
      loadReservations();
    } else if (activeTab === "stats") {
      loadStats();
    }
  }, [activeTab]);

  const loadBooks = async () => {
    setLoading(true);
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error("Błąd ładowania książek:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadReservations = async () => {
    setLoading(true);
    try {
      const data = await getReservations();
      setReservations(data);
    } catch (error) {
      console.error("Błąd ładowania rezerwacji:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await getStats();
      setStats(data);
    } catch (error) {
      console.error("Błąd ładowania statystyk:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, bookData);
      } else {
        await createBook(bookData);
      }
      setShowForm(false);
      setEditingBook(null);
      loadBooks();
    } catch (error) {
      alert("Błąd zapisu książki");
      console.error(error);
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setShowForm(true);
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tę książkę?")) {
      return;
    }

    try {
      await deleteBook(id);
      loadBooks();
    } catch (error) {
      alert("Nie udało się usunąć książki");
      console.error(error);
    }
  };

  const handleCancelReservation = async (id) => {
    if (!window.confirm("Czy na pewno chcesz anulować tę rezerwację?")) {
      return;
    }

    try {
      await cancelReservation(id);
      loadReservations();
    } catch (error) {
      alert("Nie udało się anulować rezerwacji");
      console.error(error);
    }
  };

  const handleCompleteReservation = async (id) => {
    try {
      await completeReservation(id);
      loadReservations();
    } catch (error) {
      alert("Nie udało się zatwierdzić wypożyczenia");
      console.error(error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Panel administratora</h1>

      <div className="admin-tabs">
        <Button
          variant={activeTab === "books" ? "contained" : "outlined"}
          onClick={() => setActiveTab("books")}
        >
          Zarządzanie książkami
        </Button>
        <Button
          variant={activeTab === "reservations" ? "contained" : "outlined"}
          onClick={() => setActiveTab("reservations")}
        >
          Rezerwacje
        </Button>
        <Button
          variant={activeTab === "stats" ? "contained" : "outlined"}
          onClick={() => setActiveTab("stats")}
        >
          Statystyki
        </Button>
      </div>

      {activeTab === "books" && (
        <div className="admin-section">
          <div className="section-header">
            <h2>Lista książek</h2>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingBook(null);
                setShowForm(true);
              }}
            >
              + Dodaj książkę
            </Button>
          </div>

          {showForm && (
            <BookForm
              book={editingBook}
              onSave={handleSaveBook}
              onCancel={() => {
                setShowForm(false);
                setEditingBook(null);
              }}
            />
          )}

          {loading ? (
            <div className="loading">Ładowanie...</div>
          ) : (
            <div className="books-table">
              <table>
                <thead>
                  <tr>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th>Rok</th>
                    <th>Status</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.year}</td>
                      <td>
                        <Chip 
                          label={book.status === 'AVAILABLE' ? 'Dostępna' : book.status === 'LOANED' ? 'Wypożyczona' : 'Zarezerwowana'} 
                          color={book.status === 'AVAILABLE' ? 'success' : book.status === 'LOANED' ? 'error' : 'warning'} 
                          size="small" 
                        />
                      </td>
                      <td className="actions">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleEditBook(book)}
                        >
                          Edytuj
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteBook(book.id)}
                        >
                          Usuń
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "reservations" && (
        <div className="admin-section">
          <h2>Wszystkie rezerwacje</h2>

          {loading ? (
            <div className="loading">Ładowanie...</div>
          ) : (
            <div className="reservations-table">
              <table>
                <thead>
                  <tr>
                    <th>Użytkownik</th>
                    <th>Książka</th>
                    <th>Data rezerwacji</th>
                    <th>Status</th>
                    <th>Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((reservation) => (
                    <tr key={reservation.id}>
                      <td>{reservation.user?.username || "Nieznany"}</td>
                      <td>{reservation.book?.title || "Nieznana"}</td>
                      <td>
                        {new Date(reservation.reservationDate).toLocaleDateString(
                          "pl-PL"
                        )}
                      </td>
                      <td>
                        <Chip
                          label={
                            reservation.status === "COMPLETED"
                              ? "Wykonana"
                              : reservation.status === "CANCELED"
                              ? "Anulowana"
                              : "Zarezerwowana"
                          }
                          color={
                            reservation.status === "COMPLETED"
                              ? "success"
                              : reservation.status === "CANCELED"
                              ? "default"
                              : "primary"
                          }
                          size="small"
                        />
                      </td>
                      <td className="actions">
                        {(reservation.status === "RESERVED" || !reservation.status) && (
                          <>
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => handleCompleteReservation(reservation.id)}
                            >
                              Wypożycz
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleCancelReservation(reservation.id)
                              }
                            >
                              Anuluj
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {activeTab === "stats" && (
        <div className="admin-section">
          <h2>Statystyki najczęściej rezerwowanych książek</h2>
          {loading ? (
            <div className="loading">Ładowanie...</div>
          ) : (
            <div className="stats-table">
              <table style={{ width: "50%", margin: "auto" }}>
                <thead>
                  <tr>
                    <th>Tytuł książki</th>
                    <th>Liczba rezerwacji</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(stats).length > 0 ? (
                    Object.entries(stats).map(([title, count]) => (
                      <tr key={title}>
                        <td>{title}</td>
                        <td style={{ fontWeight: "bold" }}>{count}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">Brak danych statystycznych</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
