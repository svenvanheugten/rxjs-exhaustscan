import { ObservableInput, defer, Observable } from "rxjs";
import { exhaustMap, tap } from "rxjs/operators";

export function exhaustScan<T, R>(
  accumulator: (acc: R, value: T, index: number) => ObservableInput<R>,
  seed: R
) {
    return (source: Observable<T>) => defer(() => {
        let acc: R = seed;

        return source.pipe(
            exhaustMap((value: T, index: number): ObservableInput<R> => accumulator(acc, value, index)),
            tap((value: R) => acc = value),
        );
    });
}
