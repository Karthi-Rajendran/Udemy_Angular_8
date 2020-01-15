import { Component,
          OnInit, ElementRef, 
          ViewChild, EventEmitter, Output,
          OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';



import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  
  //before forms section
// @ViewChild('nameInput',{static: false}) nameInputRef: ElementRef;
// @ViewChild('amountInput',{static: false}) amountInputRef: ElementRef;


// (before services were implemented
//@Output() ingredientAdded = new EventEmitter<Ingredient>();

// forms section
@ViewChild('f', {static: false}) slForm: NgForm;
subscription: Subscription;
editMode = false;
editedItemIndex: number;
editedItem: Ingredient;


constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
    .subscribe( 
      (index: number) => {
        this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
      }
    );

  }

  //before forms section
// onAddItem(){
//   const ingName = this.nameInputRef.nativeElement.value;
//   const ingAmount = this.amountInputRef.nativeElement.value;
//   const newIngredient = new Ingredient(ingName, ingAmount);
//   //this.ingredientAdded.emit(newIngredient);
//   this.slService.addIngredient(newIngredient);
// }

onSubmit(form: NgForm){
    const value=form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
        this.slService.updateIngredient(this.editedItemIndex, newIngredient);
       }else{
        this.slService.addIngredient(newIngredient);
       }
       this.editMode = false;
       form.reset();    
   }

   onClear(){
     this.slForm.reset();
     this.editMode = false;

   }
   onDelete(){
     this.slService.deleteIngredient(this.editedItemIndex);
     this.onClear();
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
   }

}
