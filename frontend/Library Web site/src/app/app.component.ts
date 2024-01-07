import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Set "books" as the default active component
  activeComponent: string = 'books';

  // Method to set the active component based on the button clicked
  setActiveComponent(componentName: string) {
    this.activeComponent = componentName;
  }
}
