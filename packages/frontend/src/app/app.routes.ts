import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { GameComponent } from './pages/game/game.component';
import { ChooseModeComponent } from './pages/choose-mode/choose-mode.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: "", redirectTo: "choose", pathMatch: "full" },
    { path: "choose", component: ChooseModeComponent },
    { path: "journey", component: JourneyComponent },
    { path: "list", component: ListComponent },
    { path: "game/:id", component: GameComponent },
    { path: "not-found", component: NotFoundComponent  },
    { path: "**", redirectTo: "not-found", pathMatch: "full" }
];
