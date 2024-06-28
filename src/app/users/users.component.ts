import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UserComponent implements OnInit {

  userForm!: FormGroup
  user$!: Observable<any>
  posts$!: Observable<any>
  comments$!: Observable<any>

  constructor(private userService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['3']
    })
    
    this.user$ = this.userService.getUser(this.userForm.get('id')?.value)

    this.user$.subscribe((user) => {
      this.posts$ = this.userService.getPosts(user.id)
    })
  }
  showComments(postId: number): void {
    this.comments$ = this.userService.getComments(postId)
  }
}

