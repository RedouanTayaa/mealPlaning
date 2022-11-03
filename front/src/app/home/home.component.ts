import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private storageService: StorageService, private routerService: Router) { }

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      this.routerService.navigate(['/login']);
    }
  }

}
