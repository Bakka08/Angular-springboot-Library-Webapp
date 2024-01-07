import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {
  loans: any[] = [];
  originalLoans: any[] = [];
  showNewLoanPopupFlag = false;
  users: any[] = [];
  books: any[] = [];

  selectedUserId: number;
  selectedBookId: number;
  selectedReturnDateTime: string; // Format: "dd/MM/yyyy HH:mm"

  ngOnInit(): void {
    this.fetchLoans();
    this.fetchUsers();
    this.fetchBooks();
  }

  async fetchLoans() {
    try {
      const response = await axios.get('http://localhost:8080/loans/all');
      this.loans = response.data;
      this.originalLoans = [...this.loans]; // Save the original list of loans
      console.log('Fetched loans:', this.loans);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  }

  async fetchUsers() {
    try {
      const response = await axios.get('http://localhost:8080/Users/all');
      this.users = response.data;
      console.log('Fetched users:', this.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  async fetchBooks() {
    try {
      const response = await axios.get('http://localhost:8080/Books/all');
      this.books = response.data;
      console.log('Fetched books:', this.books);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }

  isLoanEnded(status: string): boolean {
    return status.toLowerCase() === 'ended';
  }

  applyFilter(filterTerm: string) {
    // Reset the loans to the original list
    this.loans = [...this.originalLoans];

    // Filter the loans based on the filterTerm
    // Adjust the conditions as needed to match your data structure
    this.loans = this.loans.filter(loan =>
      loan.user.firstName.toLowerCase().includes(filterTerm.toLowerCase()) ||
      loan.user.lastName.toLowerCase().includes(filterTerm.toLowerCase()) ||
      loan.user.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      loan.user.contactNumber.includes(filterTerm) ||
      loan.book.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
      loan.book.author.toLowerCase().includes(filterTerm.toLowerCase())
    );
  }

  async endLoan(loanId: string) {
    try {
      // Send PUT request to end the loan
      await axios.put(`http://localhost:8080/loans/end/${loanId}`);
      
      // Fetch loans again after ending the loan
      this.fetchLoans();
    } catch (error) {
      console.error('Error ending loan:', error);
    }
  }

  showNewLoanPopup() {
    // Toggle the flag to show/hide the "New Loan" popup
    this.showNewLoanPopupFlag = !this.showNewLoanPopupFlag;
  }

  addLoan() {
    // Retrieve values using getElementById
    const userIdElement = document.getElementById('dropdown1') as HTMLSelectElement;
    const bookIdElement = document.getElementById('dropdown2') as HTMLSelectElement;
    const dateTimePickerElement = document.getElementById('dateTimePicker') as HTMLInputElement;
  
    const selectedUserId = userIdElement.value;
    const selectedBookId = bookIdElement.value;
    const selectedReturnDateTime = dateTimePickerElement.value;
  
    // Convert date-time picker value to the desired format
    const formattedDateTime = this.formatDateTime(selectedReturnDateTime);
  
    // Make sure both user and book are selected
    if (selectedUserId && selectedBookId && formattedDateTime) {
      // Make a GET request to create the loan
      axios.get(`http://localhost:8080/loans/create?userId=${selectedUserId}&bookId=${selectedBookId}&returnDate=${formattedDateTime}`)
        .then(response => {
          // Handle success if needed
          console.log('Loan created successfully:', response.data);
          // Additional logic or UI updates can be added here
        })
        .catch(error => {
          // Handle errors
          console.error('Error creating loan:', error);
          // Additional error handling or UI updates can be added here
        })
        .finally(() => {
          // Close the popup after the request is completed (success or error)
          this.showNewLoanPopupFlag = false;
          this.fetchLoans();
        });
    } else {
      // Handle the case where user, book, or date-time is not selected
      console.error('Invalid selection. Please make sure to select both user and book, and provide a valid return date.');
    }
  }
  

  // Helper method to format date-time to "dd/MM/yyyy HH:mm"
  private formatDateTime(dateTime: string): string {
    try {
      const parsedDate = new Date(dateTime);
      const day = String(parsedDate.getDate()).padStart(2, '0');
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const year = parsedDate.getFullYear();
      const hours = String(parsedDate.getHours()).padStart(2, '0');
      const minutes = String(parsedDate.getMinutes()).padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    } catch (error) {
      console.error('Error formatting date-time:', error);
      return null;
    }
  }
}
