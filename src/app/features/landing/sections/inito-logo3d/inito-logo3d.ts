import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-inito-logo3d',
  imports: [],
  templateUrl: './inito-logo3d.html',
  styleUrl: './inito-logo3d.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitoLogo3d {
  readonly size = input(320);
}
