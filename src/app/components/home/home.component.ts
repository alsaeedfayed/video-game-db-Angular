import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { APIResponse, Game } from 'src/app/models/models'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  sort!: string
  Games!: Game[]
  constructor(
    private httpService: HttpService,
    private __activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    //TODO Get Search Slot from the route
    this.__activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search'])
      } else {
        this.searchGames('metacrit')
      }
    })
  }

  //TODO Search Games
  searchGames(sort: string, search?: string): void {
    this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.Games = gameList.results
        console.log(gameList)
      })
  }
}
