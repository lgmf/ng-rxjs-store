import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, distinctUntilChanged } from 'rxjs/operators';


export class Store<T> {

  private _state$: BehaviorSubject<T>;
  public state$: Observable<T>;

  constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.value;
  }

  selectByKey(key: string) {
    return this.state$.pipe(
      pluck(key)
    );
  }

  select<S>(selector: (state: T) => S) {
    return this.state$.pipe(
      map(() => selector(this.state)),
      distinctUntilChanged()
    );
  }

  mutate(next: Partial<T>) {
    const newState = Object.assign({}, this.state, next);
    console.log('newState ========>', newState);
    this._state$.next(newState);
  }

}
