import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { GameMultiplayerComponent } from './pages/game-multiplayer/game-multiplayer.component';
import { ChooseModeComponent } from './pages/choose-mode/choose-mode.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GameArcadeComponent } from './pages/game-arcade/game-arcade.component';

export const routes: Routes = [
    { path: "", redirectTo: "choose", pathMatch: "full" },
    { path: "choose", component: ChooseModeComponent },
    { path: "journey", component: JourneyComponent },
    { path: "list", component: ListComponent },
    { path: "game-arcade/:id", component: GameArcadeComponent },
    { path: "game-multiplayer/:id", component: GameMultiplayerComponent },
    { path: "not-found", component: NotFoundComponent  },
    { path: "**", redirectTo: "not-found", pathMatch: "full" }
];
