import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { AccessTokenService } from '../../../shared/services/access-token/access-token.service';
import { StorageService } from 'src/app/shared/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public recent_status: string = 'down';
  public favorite_status: string = 'down';
  public isCreateCommunityFormShow: boolean = false;
  public isNavigationOpen: boolean = true;
  public isUser: boolean = false;

  constructor ( 
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    const uid = this.storageService.getItem("uid") == "" ? 0 : Number.parseInt(this.storageService.getItem("uid"));
    this.isUser = uid != 0;
    if(window.innerWidth > 1200) {
      this.isNavigationOpen = true;
    }
    else {
      this.isNavigationOpen = false;
    }
  }

  change_recent_status() {
    this.recent_status = this.recent_status === 'up' ? 'down':'up';
    console.log(this.recent_status)
  }

  change_favorite_status() {
    this.favorite_status = this.favorite_status === 'up' ? 'down':'up';
    console.log(this.favorite_status)
  }

  openCreateCommunityForm() {
    this.isCreateCommunityFormShow = !this.isCreateCommunityFormShow;
  }

  openNavigation(event: any) {
    this.isNavigationOpen = event.data;
    // alert(this.isNavigationOpen)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if(event.target.innerWidth > 1200) {
        this.isNavigationOpen = true;
      }
    else {
      this.isNavigationOpen = false;
    } 
  }
}
