import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { routes } from '@app/config/routes/auth.routes';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
