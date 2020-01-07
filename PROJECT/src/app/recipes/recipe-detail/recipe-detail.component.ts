import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

 // before Routing
 // @Input() recipe: Recipe;

  recipe: Recipe;
  id: number;

  //recipeService: any;
 
  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router)   {
      
     }

  ngOnInit() {
    //Routing part: this below code work for the first when we load the component
    //const id = this.route.snapshot.params['id'];

    // so use this code

      this.route.params.subscribe(
        (params: Params) => {
          this.id = + params['id'];
          this.recipe =  this.recipeService.getRecipe (this.id);
        }
      );

    }

    onAddToShoppingList(){
        this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe(){
      this.router.navigate(['edit'],{relativeTo: this.route});

     //this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});

    }



}
