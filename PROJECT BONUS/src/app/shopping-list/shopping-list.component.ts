import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import { Subscription, Observable } from 'rxjs';

import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  //ngrx
  ingredients: Observable<{ingredients: Ingredient[] }> ;
   
 //observables section
  private igChangeSub: Subscription;
  
  constructor(//  private store: Store< { shoppingList: { ingredients: Ingredient[] }}>
            private store: Store< fromApp.AppState>
    ) { }

  ngOnInit() {
    //ngrx
    this.ingredients = this.store.select('shoppingList');
        
  } 

  onEditItem(index: number){
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void{
   // this.igChangeSub.unsubscribe();
  }

}
