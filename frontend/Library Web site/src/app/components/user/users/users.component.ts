import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  ngOnInit(): void {
    // Fetch data from the server
    axios.get('http://localhost:8080/Users/all')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  openAddPopup() {
    this.showPopup();
  }

  private showPopup() {
    document.getElementById('popupContainer').style.display = 'flex';
  }

  private hidePopup() {
    document.getElementById('popupContainer').style.display = 'none';
  }

  closePopup() {
    this.hidePopup();
  }

  addUser(): void {
    // Retrieve input values
    const firstName = (document.getElementById('form6Example1') as HTMLInputElement).value;
    const lastName = (document.getElementById('form6Example2') as HTMLInputElement).value;
    const membershipNumber = (document.getElementById('form6Example3') as HTMLInputElement).value;
    const email = (document.getElementById('form6Example5') as HTMLInputElement).value;
    const phone = (document.getElementById('form6Example6') as HTMLInputElement).value;

    // Check if any of the required fields is empty
    if (!firstName || !lastName || !membershipNumber || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }

    // Prepare data for the POST request
    const userData = {
      firstName: firstName,
      lastName: lastName,
      membershipNumber: membershipNumber,
      email: email,
      contactNumber: phone // Assuming 'contactNumber' is the correct property name
    };

    // Send a POST request to add the new user
    axios.post('http://localhost:8080/Users/save', userData)
      .then(response => {
        // Handle the response, e.g., update the UI or close the popup
        console.log('User added successfully:', response.data);
        this.hidePopup();

        // Fetch the updated list of users after adding a new user
        this.fetchUsers();
      })
      .catch(error => {
        console.error('Error adding user:', error);
        alert('Error adding user. Please try again.');
      });
  }

  fetchUsers(): void {
    axios.get('http://localhost:8080/Users/all')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }

  openeditPopup(user: any) {
    // Fetch user details by ID before showing the popup
    axios.get(`http://localhost:8080/Users/findbyid/${user.id}`)
      .then(response => {
        const userData = response.data;
  
        // Fill the form fields with the retrieved data in the second form
        (document.getElementById('form6Example11') as HTMLInputElement).value = userData.firstName;
        (document.getElementById('form6Example21') as HTMLInputElement).value = userData.lastName;
        (document.getElementById('form6Example31') as HTMLInputElement).value = userData.membershipNumber;
        (document.getElementById('form6Example51') as HTMLInputElement).value = userData.email;
        (document.getElementById('form6Example61') as HTMLInputElement).value = userData.contactNumber;
  
        // Show the second popup
        this.showPopup2(user);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
        alert('Error fetching user details. Please try again.');
      });
  }
  
  
  private showPopup2(user: any) {
    // Set the user.id in idholder2
    const idholder2Input = document.getElementById('idholder2') as HTMLInputElement;
    if (idholder2Input) {
      idholder2Input.value = user.id;
    }
  
    // Show the popup
    const popupContainer2 = document.getElementById('popupContainer2');
    if (popupContainer2) {
      popupContainer2.style.display = 'flex';
    }
  }

  private hidePopup2() {
    document.getElementById('popupContainer2').style.display = 'none';
  }

  closePopup2() {
    this.hidePopup2();
  }

  editUser(userId: number): void {
    console.log('Edit user with ID:', userId);
  }

  deleteUser() {
    const confirmation = confirm('Are you sure you want to delete this user?');
    if (confirmation) {
      const userId = (document.getElementById('idholder2') as HTMLInputElement).value;
      axios.delete(`http://localhost:8080/Users/delete/${userId}`)
        .then(response => {
          console.log('User deleted successfully:', response.data);
          this.hidePopup2();
          this.fetchUsers();
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          alert('Error deleting user. Please try again.');
        });
    }
  }

  updateUser() {
    const userId = (document.getElementById('idholder2') as HTMLInputElement).value;
    const firstName = (document.getElementById('form6Example11') as HTMLInputElement).value;
    const lastName = (document.getElementById('form6Example21') as HTMLInputElement).value;
    const membershipNumber = (document.getElementById('form6Example31') as HTMLInputElement).value;
    const email = (document.getElementById('form6Example51') as HTMLInputElement).value;
    const phone = (document.getElementById('form6Example61') as HTMLInputElement).value;

    // Check if any of the required fields is empty
    if (!firstName || !lastName || !membershipNumber || !email || !phone) {
      alert('Please fill in all fields');
      return;
    }

    const userData = {
      id: userId,
      firstName: firstName,
      lastName: lastName,
      membershipNumber: membershipNumber,
      email: email,
      contactNumber: phone
    };

    axios.put(`http://localhost:8080/Users/update/${userId}`, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        this.hidePopup2();
        this.fetchUsers();
      })
      .catch(error => {
        console.error('Error updating user:', error);
        alert('Error updating user. Please try again.');
      });
  }
}