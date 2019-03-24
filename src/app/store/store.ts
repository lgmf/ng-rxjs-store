import { BehaviorSubject, Observable } from 'rxjs';
import { map, pluck, distinctUntilChanged } from 'rxjs/operators';

export class Store<T> {

  private _state$: BehaviorSubject<T>;
  public state$: Observable<T>;

  protected constructor(initialState: T) {
    this._state$ = new BehaviorSubject<T>(initialState);
    this.state$ = this._state$.asObservable();
  }

  get state(): T {
    return this._state$.value;
  }

  selectByKey<S>(key: string): Observable<S> {
    return this.state$.pipe(
      pluck(key),
      distinctUntilChanged()
    ) as Observable<S>;
  }

  select<TResult>(selector: (state: T) => TResult) {
    return this.state$.pipe(
      map(() => selector(this.state)),
      distinctUntilChanged()
    );
  }

  protected setState(next: Partial<T>) {
    const newState = Object.assign({}, this.state, next);
    this._state$.next(newState);
  }

}
