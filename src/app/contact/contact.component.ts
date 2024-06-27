import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contact = {
    name: '',
    email: '',
    password: '',
    message: ''
  };
required: any;
email: any;

  onSubmit() {
    console.log('Form submitted:', this.contact);

  }
}
