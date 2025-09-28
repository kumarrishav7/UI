import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  posts: any;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => console.error('Error fetching posts', err),
    });
  }
}
