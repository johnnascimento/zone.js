/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as Rx from 'rxjs/Rx';

describe('Observable.empty', () => {
  let log: string[];
  const constructorZone1: Zone = Zone.current.fork({name: 'Constructor Zone1'});
  const subscriptionZone: Zone = Zone.current.fork({name: 'Subscription Zone'});
  let observable1: any;

  beforeEach(() => {
    log = [];
  });

  it('empty func callback should run in the correct zone', () => {
    observable1 = constructorZone1.run(() => {
      return Rx.Observable.empty();
    });

    subscriptionZone.run(() => {
      observable1.subscribe(
          (result: any) => {
            fail('should not call next');
          },
          () => {
            fail('should not call error');
          },
          () => {
            expect(Zone.current.name).toEqual(subscriptionZone.name);
          });
    });
  });
});