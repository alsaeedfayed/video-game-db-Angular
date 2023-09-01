import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { Subscription } from 'rxjs'
import { Game } from 'src/app/models/models'
import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  //TODO ----------- VARIABLES --------------------
  gameID!: string
  game!: Game
  routeSubscription!: Subscription
  gameSubscription!: Subscription
  loading: boolean = false

  //TODO ------------ CONSTRUCTOR ------------------
  constructor(
    private __activatedRoute: ActivatedRoute,
    private httpService: HttpService,
    private spinnner: NgxSpinnerService,
  ) {
    this.routeSubscription = this.__activatedRoute.params.subscribe(
      (params: Params) => {
        this.gameID = params['id']
      },
    )
  }

  //TODO ------------ ONINIT -----------------------
  ngOnInit(): void {
    this.getGameDetails(this.gameID)
  }

  //TODO ------------- METHODS ---------------------
  getGameDetails(id: string) {
    this.spinnner.show()
    this.gameSubscription = this.httpService.getGameDetails(id).subscribe({
      next: (gameRes: Game) => {
        this.game = gameRes
        this.loading = true
      },
      error: (err) => {
        console.log('err', err)
      },
      complete: () => {
        this.spinnner.hide()
      },
    })
  }

  //TODO ---------- DESTROY --------------------------
  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
    this.gameSubscription.unsubscribe()
  }
}
