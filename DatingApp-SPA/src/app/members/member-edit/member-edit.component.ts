import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  photoUrl: string;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private userService: UserService,
              private authService: AuthService
    ) { }
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event']) unloadnotification($event: any){
      if (this.editForm.dirty){
        $event.returnValue = true;
      }
  }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.user = data['user'];
      });
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl );
  }
  updateUser(){
     this.userService.udpdateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        console.log(this.user);
        this.editForm.reset(this.user);

      }, error => {
        this.alertify.error(error);
      });
  }
  updateMainPhoto(photoUrl){
    this.user.photoUrl = photoUrl;
    this.authService.changeMemberPhoto(photoUrl);
  }

}
