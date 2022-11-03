import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front';
  // isLoggedIn = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.username = 'Me';
    }
  }

  logout(): void {
    this.storageService.clean();

    window.location.reload();
    // this.authService.logout().subscribe({
    //   next: res => {
    //     console.log(res);
    //     this.storageService.clean();
    //
    //     window.location.reload();
    //   },
    //   error: err => {
    //     console.log(err);
    //   }
    // });
  }
  isLoggedIn() {
    let isLoggedin = this.storageService.isLoggedIn();
    if (isLoggedin) {
      this.username = 'Me';
    }
    return isLoggedin;
  }
}
