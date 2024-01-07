import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { initMDB, Tab } from 'mdb-ui-kit';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  allBooks = [];
  fictionBooks = [];
  nonFictionBooks = [];
  mysteryThrillerBooks = [];
  businessBooks = [];
  romanceBooks = [];

  genres = [
    { value: 'Fiction', label: 'Fiction' },
    { value: 'Non-Fiction', label: 'Non-Fiction' },
    { value: 'Mystery/Thriller', label: 'Mystery/Thriller' },
    { value: 'Business', label: 'Business' },
    { value: 'Romance', label: 'Romance' }
  ];

  ngOnInit() {
    this.fetchBooks();
    initMDB({ Tab });
  }

  fetchBooks() {
    axios.get('http://localhost:8080/Books/all')
      .then(response => {
        this.allBooks = response.data;
        this.fictionBooks = this.filterBooksByGenre('Fiction');
        this.nonFictionBooks = this.filterBooksByGenre('Non-Fiction');
        this.mysteryThrillerBooks = this.filterBooksByGenre('Mystery/Thriller');
        this.businessBooks = this.filterBooksByGenre('Business');
        this.romanceBooks = this.filterBooksByGenre('Romance');
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  }

  filterBooksByGenre(genre: string) {
    return this.allBooks.filter(book => book.genre === genre);
  }

  openUpdatePopup(book: any) {
    this.populateFormFields(book);
    this.showPopup();
  }

  closePopup() {
    this.hidePopup();
  }

  private showPopup() {
    document.getElementById('popupContainer').style.display = 'flex';
  }

  private hidePopup() {
    document.getElementById('popupContainer').style.display = 'none';
  }

  private populateFormFields(book: any) {
    const idInput: HTMLInputElement = document.getElementById('idholder') as HTMLInputElement;
    const titleInput: HTMLInputElement = document.getElementById('form6ExampleTitle') as HTMLInputElement;
    const authorInput: HTMLInputElement = document.getElementById('form6ExampleAuthor') as HTMLInputElement;
    const editionInput: HTMLInputElement = document.getElementById('form6ExampleEdition') as HTMLInputElement;
    const genreSelect: HTMLSelectElement = document.getElementById('form6ExampleGenre') as HTMLSelectElement;
    const imagePreview: HTMLImageElement = document.getElementById('bookImagePreview') as HTMLImageElement;
    const imageTextArea: HTMLTextAreaElement = document.getElementById('form4Example3') as HTMLTextAreaElement;

    if (book) {
      idInput.value = book.id || '';
      titleInput.value = book.title || '';
      authorInput.value = book.author || '';
      editionInput.value = book.edition || '';
      imageTextArea.value = book.image || '';

      // Set the image preview source
      imagePreview.src = book.image || '';

      const selectedGenreOption = this.genres.find(genre => genre.value === book.genre);
      if (selectedGenreOption) {
        genreSelect.value = selectedGenreOption.value;
      }
    }
  }


  private populateFormFields2(book: any) {
    const idInput: HTMLInputElement = document.getElementById('idholder2') as HTMLInputElement;

    if (book) {
      idInput.value = book.id || '';
    }
  }
  updateBook() {
    const id = (document.getElementById('idholder') as HTMLInputElement).value;
  
    const updatedBook = {
      title: (document.getElementById('form6ExampleTitle') as HTMLInputElement).value,
      author: (document.getElementById('form6ExampleAuthor') as HTMLInputElement).value,
      edition: (document.getElementById('form6ExampleEdition') as HTMLInputElement).value,
      genre: (document.getElementById('form6ExampleGenre') as HTMLSelectElement).value,
      image: (document.getElementById('form4Example3') as HTMLTextAreaElement).value,
    };
  
    axios.put(`http://localhost:8080/Books/update/${id}`, updatedBook)
      .then(response => {
        console.log('Book updated successfully:', response.data);
        this.fetchBooks(); 
        this.hidePopup();
      })
      .catch(error => {
        console.error('Error updating book:', error);
        // Handle error, if needed
      });
  }

  openDeletePopup(book: any) {
    this.populateFormFields2(book);
    this.showPopup2();
  }
  private showPopup2() {
    document.getElementById('popupContainer2').style.display = 'flex';
  }

  private hidePopup2() {
    document.getElementById('popupContainer2').style.display = 'none';
  }
  closePopup2() {
    this.hidePopup2();
  }
  deleteBook() {
    const id = (document.getElementById('idholder2') as HTMLInputElement).value;

    axios.delete(`http://localhost:8080/Books/delete/${id}`)
      .then(response => {
        console.log('Book deleted successfully:', response.data);
        this.fetchBooks(); // Refresh the book list after deletion
        this.hidePopup2();
      })
      .catch(error => {
        console.error('Error deleting book:', error);
        // Handle error, if needed
      });
  }
  


  
  openAddPopup() {
    this.showPopup3();
  }
  private showPopup3() {
    document.getElementById('popupContainer3').style.display = 'flex';
  }

  private hidePopup3() {
    document.getElementById('popupContainer3').style.display = 'none';
  }
  closePopup3() {
    this.hidePopup3();
  }
  addBook() {
    const addedBook = {
      title: (document.getElementById('form6ExampleTitle1') as HTMLInputElement).value,
      author: (document.getElementById('form6ExampleAuthor1') as HTMLInputElement).value,
      edition: (document.getElementById('form6ExampleEdition1') as HTMLInputElement).value,
      genre: (document.getElementById('form6ExampleGenre1') as HTMLSelectElement).value,
      image: (document.getElementById('form4Example31') as HTMLTextAreaElement).value,
      isbn: (document.getElementById('form6ExampleAuthor11') as HTMLInputElement).value,
    };

    axios.post('http://localhost:8080/Books/save', addedBook)
      .then(response => {
        console.log('Book added successfully:', response.data);
        this.fetchBooks(); // Refresh the book list after deletion
        this.hidePopup3();
      })
      .catch(error => {
        console.error('Error adding book:', error);
        // Handle error, if needed
      });
  }

  openDamagePopup(book: any) {
    this.populateFormFields2(book);
    this.showPopup22();
  }
  private showPopup22() {
    document.getElementById('popupContainer22').style.display = 'flex';
  }

  private hidePopup22() {
    document.getElementById('popupContainer22').style.display = 'none';
  }
  closePopup22() {
    this.hidePopup22();
  }
  addDamageReport() {
    const bookIdInput = document.getElementById('idholder2') as HTMLInputElement;
    const descriptionInput = document.getElementById('textAreaExample') as HTMLTextAreaElement;
  
    const bookId = bookIdInput.value;
    const description = descriptionInput.value;
  
    axios.get(`http://localhost:8080/loans/createRepo?bookId=${bookId}&description=${description}`)
      .then(response => {
        console.log('Damage report added successfully:', response.data);
        this.fetchBooks(); // Refresh the book list after adding a damage report
        this.hidePopup22();
  
        // Empty the input fields after adding
        bookIdInput.value = '';
        descriptionInput.value = '';
      })
      .catch(error => {
        console.error('Error adding damage report:', error);
        // Handle error, if needed
      });
  }
  
}
