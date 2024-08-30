import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PlayersService } from '../players.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  players: Player[] = [];
  displayedColumns: string[] = ['name', 'position', 'shirtNo', 'appearances', 'goals', 'actions'];

  constructor(public playersService: PlayersService, public router: Router) { }

  ngOnInit() {
    this.getPlayerList();
  }

  getPlayerList(): void {
    this.playersService.getAllPlayer().subscribe({
      next: (response) => {
        this.players = response;
      }
    });
  }

  createPlayer(): void {
    this.router.navigate(['players/create']);
  }

  editPlayer(id: number): void {
    this.router.navigate(['players/edit', id]);
  }

  detailPlayer(id: number): void {
    this.router.navigate(['players/detail', id]);
  }

  deletePlayer(id: number): void {
    this.playersService.deletePlayer(id).subscribe(response => {
      this.players = this.players.filter(position => position.id !== id);
    });
  }
}
