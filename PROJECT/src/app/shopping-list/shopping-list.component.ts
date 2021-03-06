import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] ;
  //observables section
  private igChangeSub: Subscription;
  
  // code before services implemnted, thsi code now be placed in services of shopping list 
    // ingredients: Ingredient[] = [
    //     new Ingredient('Apples', 5),
    //     new Ingredient('Tomatoas',10)
    //   ];
    
  

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
      this.ingredients = this.slService.getIngredients();
     // this.slService.ingredientsChanged.subscribe(
     //observables section 
     this.igChangeSub = this.slService.ingredientsChanged.subscribe(
        ( ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

    // code before services implemnted

  // onIngredientAdded(ingredient: Ingredient){
  //   this.ingredients.push(ingredient);
  // }

  onEditItem(index: number){
    this.slService.startedEditing.next(index);



  }
  ngOnDestroy(): void{
    this.igChangeSub.unsubscribe();
  }

}
