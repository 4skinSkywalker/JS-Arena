import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ListComponent } from './pages/list/list.component';
import { GameComponent } from './pages/game/game.component';

export const routes: Routes = [
    {
        path: "",
        component: AppComponent,
        children: [
            { path: "", redirectTo: "list", pathMatch: "full" },
            { path: "list", component: ListComponent },
            { path: "game/:id", component: GameComponent },
            { path: "**", redirectTo: "list", pathMatch: "full" }
        ]
    }
];
