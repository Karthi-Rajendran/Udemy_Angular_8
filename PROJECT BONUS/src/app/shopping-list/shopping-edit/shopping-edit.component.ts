import { Component,
          OnInit, ElementRef, 
          ViewChild, EventEmitter, Output,
          OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';



import { Ingredient } from 'src/app/shared/ingredient.model';

import * as shoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
 
// forms section
@ViewChild('f', {static: false}) slForm: NgForm;
subscription: Subscription;
editMode = false;
//editedItemIndex: number;
editedItem: Ingredient;


constructor(// private store: Store<{  shoppingList: { ingredients: Ingredient[] } }>) { }
           private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
                                  .subscribe(stateData =>{
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    });
    
 }

 
onSubmit(form: NgForm){
    const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
       // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
       this.store.dispatch( new shoppingListActions.UpdateIngredient(newIngredient));
       }else{
        //this.slService.addIngredient(newIngredient);
          this.store.dispatch( new shoppingListActions.AddIngredient(newIngredient));
       }
       this.editMode = false;
       form.reset();    
   }

   onClear(){
     this.slForm.reset();
     this.editMode = false;
     this.store.dispatch(new shoppingListActions.StopEdit());
   }

   onDelete(){
     //this.slService.deleteIngredient(this.editedItemIndex);
     this.store.dispatch(new shoppingListActions.DeleteIngredient());
     this.onClear();
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
     this.store.dispatch(new shoppingListActions.StopEdit());

   }

}
