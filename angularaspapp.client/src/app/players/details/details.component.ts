import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  id !: number ;
  player !: Player;

  constructor(public playersService: PlayersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.retrievePlayer();
  }

  retrievePlayer(): void {
    this.playersService.getPlayer(this.id)
      .subscribe((data: Player) => {
        this.player = data;
      })
  }

  navigateBack(): void {
    window.history.back();
  }
}
