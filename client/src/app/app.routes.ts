import { Routes } from '@angular/router';
import { Home } from './home/home';
import { MemberLists } from './members/member-lists/member-lists';
import { MemberDetail } from './members/member-detail/member-detail';
import { Lists } from './lists/lists';
import { Messages } from './messages/messages';
import { authGuard } from './_guards/auth-guard';

export const routes: Routes = [
    {path: '',component: Home},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members',component: MemberLists, canActivate: [authGuard]},
            {path: 'members/:id',component: MemberDetail},
            {path: 'lists',component: Lists},
            {path: 'messages',component: Messages},
        ]
    },
    {path: '**',component: Home, pathMatch: 'full'},
    
];
