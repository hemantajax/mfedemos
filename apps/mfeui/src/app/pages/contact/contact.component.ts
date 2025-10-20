import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  contactInfo = [
    {
      icon: 'bi-geo-alt-fill',
      title: 'Address',
      details: ['123 Business Street', 'New York, NY 10001'],
    },
    {
      icon: 'bi-telephone-fill',
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 987-6543'],
    },
    {
      icon: 'bi-envelope-fill',
      title: 'Email',
      details: ['info@example.com', 'support@example.com'],
    },
    {
      icon: 'bi-clock-fill',
      title: 'Working Hours',
      details: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
    },
  ];

  formData = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  submitted = false;

  onSubmit() {
    // Simulate form submission
    this.submitted = true;
    console.log('Form submitted:', this.formData);

    // Reset form after 3 seconds
    setTimeout(() => {
      this.submitted = false;
      this.formData = {
        name: '',
        email: '',
        subject: '',
        message: '',
      };
    }, 3000);
  }
}
