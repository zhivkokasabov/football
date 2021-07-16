import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Base } from '@app/components/base.component';
import MatchScore from '@tournament/models/match-score.model';
import TournamentMatch from '@tournament/models/tournament-match.model';
import { takeUntil } from 'rxjs/operators';

export class UpsertMatch {
  public matchId: number;
  public score: MatchScore;

  constructor(init: any = {}) {
    this.matchId = init.matchId;
    this.score = new MatchScore(init.score || {});
  }
}

@Component({
  selector: 'app-tournament-match',
  styleUrls: ['./tournament-match.component.scss'],
  templateUrl: './tournament-match.component.html',
})
export class TournamentMatchComponent extends Base implements OnChanges {
  @Input() public match: TournamentMatch;
  @Input() public canEditMatches = false;
  @Output() public enterResult: EventEmitter<UpsertMatch> = new EventEmitter();
  @Output() public updateResult: EventEmitter<UpsertMatch> = new EventEmitter();
  public canEdit = false;
  public scoreForm: FormGroup;
  public hasScore: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
    super();

    this.setupForm(new MatchScore({
      awayTeamScore: 0,
      homeTeamScore: 0,
    }));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { match } = changes;

    if (match && match.currentValue) {
      const { homeTeamId, awayTeamId } = this.match;

      if (match.currentValue.result) {
        const [homeTeamScore, awayTeamScore] = this.match.result.split(' : ');

        this.setupForm(new MatchScore({
          awayTeamScore: parseInt(awayTeamScore, 10),
          homeTeamScore: parseInt(homeTeamScore, 10),
        }));

        this.hasScore = true;
      }

      this.canEdit = this.canEditMatches && !!homeTeamId && !!awayTeamId;
    }
  }

  public enterResults(): void {
    const model = new UpsertMatch({
      matchId: this.match.tournamentMatchId,
      score: this.scoreForm.value,
    });

    this.enterResult.emit(model);
  }

  public updateResults(): void {
    const model = new UpsertMatch({
      matchId: this.match.tournamentMatchId,
      score: this.scoreForm.value,
    });

    this.updateResult.emit(model);
  }

  public incrementScore(control: AbstractControl): void {
    const { value } = control;

    control.setValue(value + 1);
  }

  public decrementScore(control: AbstractControl): void {
    const { value } = control;

    if (value === 0) {
      return;
    }

    control.setValue(value - 1);
  }

  public isFieldInvalid(field: string): boolean | undefined {
    return (!this.scoreForm.get(field)?.valid && this.scoreForm.get(field)?.touched) ||
    (this.scoreForm.get(field)?.untouched);
  }

  private setupForm(score: MatchScore): void {
    this.scoreForm = this.fb.group({
      awayTeamScore: [score.awayTeamScore, Validators.required],
      homeTeamScore: [score.homeTeamScore, Validators.required],
    });
  }
}
