
import { EventEmitter, Injectable } from '@angular/core';
//import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

 

@Injectable()
export class RecipeService{
  recipesChnaged = new Subject<Recipe[]>();

   // recipeSelected = new EventEmitter<Recipe>();
   //observables section
   //recipeSelected = new Subject<Recipe>();
    
  // private  recipes: Recipe[] = [
  //       new Recipe('A Test Recipe', 'This is simply a Test maybe','https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  //       [new Ingredient('Meat',1),
  //       new Ingredient('French Fries',20)
  //     ]),
  //       new Recipe('Another Test Recipe', 'This is simply a Test maybe','https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/mrtrending0475.jpg?itok=-tA_cB-C',
  //       [new Ingredient('Buns',2),
  //       new Ingredient('Meat',4)])
  //     ]; 


  //Http section: transform response data
  private recipes: Recipe[] = [];

      constructor(private slService: ShoppingListService){}

      //Http section

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChnaged.next(this.recipes.slice());
            }

      getRecipes(){
          return this.recipes.slice();
      }

      //routing part:
      getRecipe(index: number){
        return this.recipes[index];
       // (also good)=> return this.recipes.slice()[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
          this.slService.addIngredients(ingredients);
      }
      
      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChnaged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChnaged.next(this.recipes.slice());
      }

      deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChnaged.next(this.recipes.slice());
      }
}