import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { error } from 'protractor';
import { Register } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantrelatedService } from 'src/app/services/restaurantrelated.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userArray: any[] = []
  indexNum: number;
  editForm: FormGroup
  loggedInUser: string
  loginUser: string;
  userId: any[] = []
  result: any;

  constructor(public restaurantrelated: RestaurantrelatedService, private authSer: AuthService, private userSer: UserService) { }


  ngOnInit(): void {

    this.authSer.loggedUser().subscribe((data: Register) => {
      for (let x in data) {
        var user = data[x]
      }
      this.loginUser = user.name
    });

    this.authSer.loggedUser().subscribe((data: Register[]) => {
      const editAlluser = data;
      var user = editAlluser.find(user => user.name == this.loginUser)
      this.userArray.push(user)
      this.loggedInUser = user.roleId
    });

    this.editForm = new FormGroup({
      'name': new FormControl(),
      'email': new FormControl(),
      'password': new FormControl(),
      'confirmPassword': new FormControl(),
      'restaurantName': new FormControl(),
      'restaurantLocation': new FormControl(),
      'restaurantImage': new FormControl(),
      'phoneNumber': new FormControl(),
      'adminblocked': new FormControl(),
      'active': new FormControl(),
      'roleId': new FormControl(),
      '_id': new FormControl(),

    });

  }

  editProfile(index): void {
    this.indexNum = index;
    const editIndex = this.userArray[this.indexNum]
    this.editForm.patchValue(editIndex)
  }

  updateProfile(): void {
    const register: Register = {
      name: this.editForm.value.name,
      email: this.editForm.value.email,
      roleId: this.editForm.value.roleId,
      password: this.editForm.value.password,
      confirmPassword: this.editForm.value.confirmPassword,
      restaurantName: this.editForm.value.restaurantName,
      restaurantLocation: this.editForm.value.restaurantLocation,
      restaurantImage: this.editForm.value.restaurantImage,
      phoneNumber: this.editForm.value.phoneNumber,
      _id: this.editForm.value._id
    }

    this.userSer.updatedUser(register).subscribe((data: Register) => {
      console.log(data);
    }, (error) => {
      console.log("not updated");
    });
    let editUser = []
    editUser.push(register)
    this.userSer.updateUserLogged(editUser)
    this.authSer.loggedUser().subscribe((data) => {
      console.log(data);
      this.userArray = data;
    });
    console.log(this.userArray);
    //   this.editUser.splice(this.indexNum, 1, this.editForm.value)
    //   localStorage.setItem('LoggedUser', JSON.stringify(this.editUser[0]))
    //   var loopUser = this.editAlluser;
    //   for(let i=0 ; i<this.editAlluser.length; i++){
    //     if(this.editAlluser[i].email == this.editUser[0].email){
    //          loopUser.splice(i,1,this.editForm.value);
    //     }
    //   }
    //   localStorage.setItem('Users', JSON.stringify(loopUser));
    // }

  }

}
