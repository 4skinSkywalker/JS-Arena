import { Routes } from '@angular/router';
import { ChooseLangComponent } from './pages/choose-lang/choose-lang.component';
import { ChooseModeComponent } from './pages/choose-mode/choose-mode.component';
import { ListComponent } from './pages/list/list.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { JSGameArcadeComponent } from './pages/js/game-arcade/game-arcade.component';
import { JSGameMultiplayerComponent } from './pages/js/game-multiplayer/game-multiplayer.component';
import { SQLGameArcadeComponent } from './pages/sql/game-arcade/game-arcade.component';
import { SQLGameMultiplayerComponent } from './pages/sql/game-multiplayer/game-multiplayer.component';
import { EnumLang } from '../../../backend/src/models';

export const routes: Routes = [
    { path: "", redirectTo: "languages", pathMatch: "full" },
    { path: "languages", component: ChooseLangComponent },
    { path: "languages/:id", component: ChooseModeComponent },

    // JS paths
    { path: "js-arcade", component: JourneyComponent, data: { lang: EnumLang.JS } },
    { path: "js-arcade/:id", component: JSGameArcadeComponent },
    { path: "js-multiplayer", component: ListComponent, data: { lang: EnumLang.JS } },
    { path: "js-multiplayer/:id", component: JSGameMultiplayerComponent },

    // SQL paths
    { path: "sql-arcade", component: JourneyComponent, data: { lang: EnumLang.SQL } },
    { path: "sql-arcade/:id", component: SQLGameArcadeComponent },
    { path: "sql-multiplayer", component: ListComponent, data: { lang: EnumLang.SQL } },
    { path: "sql-multiplayer/:id", component: SQLGameMultiplayerComponent },

    { path: "not-found", component: NotFoundComponent  },
    { path: "**", redirectTo: "not-found", pathMatch: "full" }
];
