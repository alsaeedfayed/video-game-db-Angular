import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { Subscribable, Subscription } from 'rxjs'
import { APIResponse, Game } from 'src/app/models/models'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  //TODO --------- -VARIABLES ---------------------------
  sort!: string
  Games!: Game[]
  Route_Subscription!: Subscription
  Game_Subscription!: Subscription

  //TODO -------- CONSTRUCTOR ------------------------------
  constructor(
    private httpService: HttpService,
    private __activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private __router: Router,
  ) {}

  //TODO ON_INIT
  ngOnInit(): void {
    //TODO ----- Get Search Slot from the route ---------------
    this.Route_Subscription = this.__activatedRoute.params.subscribe(
      (params: Params) => {
        if (params['game-search']) {
          this.searchGames('metacrit', params['game-search'])
        } else {
          this.searchGames('metacrit')
        }
      },
    )
  }

  //TODO ------- Search Games Function ------------
  searchGames(sort: string, search?: string): void {
    //TODO - Show spinner until loading is done
    this.spinner.show()
    //TODO - SUBSCRIBTION
    this.Game_Subscription = this.httpService
      .getGameList(sort, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.Games = gameList.results
        this.spinner.hide()
      })
  }

  //TODO ---- Navigate to game details ------------
  openGameDetails(id: number) {
    this.__router.navigate(['details', id])
  }

  //TODO ----- Unsubscribe ON_DESTROY --------------
  ngOnDestroy(): void {
    this.Game_Subscription.unsubscribe()
    this.Route_Subscription.unsubscribe()
  }
}
