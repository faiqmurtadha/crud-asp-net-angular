import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { Position } from '../position';
import { PositionsService } from '../positions.service';
import { PlayersService } from '../players.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  id!: number;
  player!: Player;
  positions: Position[] = [];
  selectedPositionId!: number;
  editForm;

  constructor(
    public playersService: PlayersService,
    public positionsService: PositionsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      positionId: [0, Validators.required],
      shirtNo: [0],
      appearances: [0],
      goals: [0]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.retrievePositions();
    this.retrievePlayer();
  }

  retrievePositions(): void {
    this.positionsService.getPositions()
      .subscribe((data: Position[]) => {
        this.positions = data;
        console.log(data);
      });
  }

  retrievePlayer(): void {
    this.playersService.getPlayer(this.id)
      .subscribe((data: Player) => {
        this.player = data;
        this.editForm.patchValue({
          id: data.id,
          name: data.name,
          positionId: data.positionId,
          shirtNo: data.shirtNo,
          appearances: data.appearances,
          goals: data.goals,
        });
      });
  }

  navigateBack(): void {
    window.history.back();
  }

  onSubmit(formData: any) {
    this.playersService.updatePlayer(this.id, formData.value)
      .subscribe(response => {
        this.router.navigateByUrl('players/list');
        console.log(formData.value);
      })
  }
}
