import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule } from '@angular/router';
import { routes } from '@config/app.routes';

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
