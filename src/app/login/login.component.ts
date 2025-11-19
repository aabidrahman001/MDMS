import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router) {}

  allUser = [
    { userName: "admin" },
    { password: "mdmadmin5124" },
  ];

  message: string = "";
  showMessageFlag: boolean = false;

  formSubmit(data: NgForm) {

    if (this.allUser.at(0)?.userName === data.value.name &&
      this.allUser.at(1)?.password === data.value.password) {

      sessionStorage.removeItem('admin');

      // FIXED: Store username properly
      sessionStorage.setItem('admin', JSON.stringify({ username: data.value.name }));

      this.message = "Login Successful!";
      this.showMessage();

      this.router.navigate(['/dashboard']);

    } else {
      this.message = 'User Name Or Password Is Incorrect.';
      alert('User Name Or Password Is Incorrect.');
    }
  }

  closeMessage() {
    this.showMessageFlag = false;
  }

  showMessage() {
    this.showMessageFlag = true;
    setTimeout(() => {
      this.showMessageFlag = false;
    }, 3000);
  }
}
