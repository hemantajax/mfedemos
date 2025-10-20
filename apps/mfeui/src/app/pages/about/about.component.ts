import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  features = [
    {
      icon: 'bi-speedometer2',
      title: 'Fast Performance',
      description:
        'Built with Angular 18 and optimized for speed and efficiency.',
    },
    {
      icon: 'bi-phone',
      title: 'Responsive Design',
      description:
        'Fully responsive layout that works on all devices and screen sizes.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with best practices implemented.',
    },
    {
      icon: 'bi-puzzle',
      title: 'Modular Architecture',
      description:
        'Built with Nx monorepo for scalability and maintainability.',
    },
  ];

  team = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      image:
        'https://ui-avatars.com/api/?name=John+Doe&background=0D6EFD&color=fff',
    },
    {
      name: 'Jane Smith',
      role: 'UI/UX Designer',
      image:
        'https://ui-avatars.com/api/?name=Jane+Smith&background=198754&color=fff',
    },
    {
      name: 'Mike Johnson',
      role: 'Backend Developer',
      image:
        'https://ui-avatars.com/api/?name=Mike+Johnson&background=FFC107&color=000',
    },
  ];
}
