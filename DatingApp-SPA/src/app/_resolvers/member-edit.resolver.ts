import {Injectable} from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{
    constructor(private userService: UserService, private  router: Router,
                private alertify: AlertifyService, private authService: AuthService){

                }
    resolve(route: import('@angular/router').ActivatedRouteSnapshot, state: import('@angular/router').RouterStateSnapshot): User | import('rxjs').Observable<User> | Promise<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid)
        .pipe(catchError(error => {
            this.alertify.error('Problem retriving data');
            this .router.navigate(['/members']);
            return of(null);
        })
        );
    }
}
