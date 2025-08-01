import { Component } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagment } from "../user-managment/user-managment";
import { HasRole } from '../../_directives/has-role';
import { PhotoEditor } from "../../members/photo-editor/photo-editor";
import { PhotoManagement } from "../photo-management/photo-management";

@Component({
  selector: 'app-admin-panel',
  imports: [TabsModule, UserManagment, HasRole, PhotoManagement],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.css'
})
export class AdminPanel {

}
