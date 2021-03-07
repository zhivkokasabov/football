import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from '@app/components/base.component';
import { IConfirmBeforeLeave } from '@app/interfaces/confirm-before-leave.interface';
import { SnackbarService } from '@app/services/snackbar.service';
import { TournamentFormComponent } from '@tournament/components/tournament-form/tournament-form.component';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-tournament',
  styleUrls: ['./edit-tournament.component.scss'],
  templateUrl: './edit-tournament.component.html',
})
export class EditTournamentComponent extends Base implements OnInit, IConfirmBeforeLeave {
  @ViewChild(TournamentFormComponent)
  private tournamentForm: TournamentFormComponent;
  public tournament: Tournament;

  constructor(
    private tournamentService: TournamentService,
    private snackbarService: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      this.tournament = tournament;
    });
  }

  public onCancel(): void {
    this.navigateToGeneral();
  }

  public onSubmit(tournament: Tournament): void {
    this.tournamentService.updateTournament(tournament).subscribe((res) => {
      this.snackbarService.success(`Tournament ${res.name} updated successfully!`);

      this.navigateToGeneral();
    });
  }

  public hasUnsavedData(): boolean {
    const { form } = this.tournamentForm;

    return form.touched;
  }

  private navigateToGeneral(): void {
    this.router.navigate(['../general'], { relativeTo: this.activatedRoute });
  }
}
