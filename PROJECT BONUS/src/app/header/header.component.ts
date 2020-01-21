import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducer';
import { map } from 'rxjs/operators';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',    
})
export class HeaderComponent implements OnInit, OnDestroy{   
    collapsed = true;

    isAuthenticated = false;
    private userSub: Subscription;
    router: any;
     

    //HTTP section

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService,
                private store: Store<fromApp.AppState>){}

    ngOnInit(){
       // this.userSub = this.authService.user.subscribe(
        this.userSub = this.store.select('auth')
            .pipe(map( authState => authState.user))
            .subscribe(
            user => {
                  //  this.isAuthenticated = !user ? false : true;
                     this.isAuthenticated = !!user;
                     console.log(!user);
                     console.log(!!user);              
                });
    }

    onSaveData(){
        this.dataStorageService.storeRecipes();
    }

    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
       this.authService.logout(); 
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }
}