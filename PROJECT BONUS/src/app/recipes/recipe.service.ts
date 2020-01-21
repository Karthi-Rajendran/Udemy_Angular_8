
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class RecipeService{
  recipesChnaged = new Subject<Recipe[]>();

   //Http section: transform response data
  private recipes: Recipe[] = [];

      constructor(// private store: Store<{ shoppingList: { ingredients: Ingredient[]  }}>){}
                 private store: Store<fromApp.AppState>){}

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
         // this.slService.addIngredients(ingredients);
         this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
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