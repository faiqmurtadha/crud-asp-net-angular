import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { PositionsService } from '../positions.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Position } from '../position';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  positions: Position[] = [];
  createForm;
  
  constructor(
    public playerService: PlayersService,
    public positionService: PositionsService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.createForm = this.fb.group({
      name: ['', Validators.required],
      positionId: [0, Validators.required],
      shirtNo: [0],
      appearances: [0],
      goals: [0]
    })
  }


  ngOnInit(): void {
    this.retrievePositions();
  }

  retrievePositions(): void {
    this.positionService.getPositions()
      .subscribe((data: Position[]) => {
        this.positions = data;
        console.log(data);
      });
  }

  navigateBack(): void {
    window.history.back();
  }

  onSubmit(formData: any) {
    this.playerService.createPlayer(formData.value)
      .subscribe(response => {
        this.route.navigateByUrl('players/list');
        console.log(formData.value);
      })
  }
}
