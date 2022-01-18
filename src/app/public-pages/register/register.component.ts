import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Register } from 'src/app/models/user';
import { deserialize } from 'serializer.ts/Serializer';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup
  roleIndex: number;
  userSubmited: boolean;
  constructor(private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.createRegisterForms();
  }

  createRegisterForms(): void {
    this.registerForm = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirmPassword: ["", [Validators.required]],
      restaurantName: [""],
      restaurantLocation: [""],
      roleId: [],
      roleIndex: [],
      phoneNumber: [""]

    }, { validators: this.passwordMatchingValidator })
  }

  passwordMatchingValidator(fg: FormGroup): Validators {
    return fg.get('password').value === fg.get('confirmPassword').value ? null :
      { notMatched: true };
  }

  onRegister(): void {
   this.userSubmited = true
    if (this.registerForm.valid) {
      const register: Register = {
        name: this.registerForm.value.name,
        email: this.registerForm.value.email,
        roleId: this.registerForm.value.roleId,
        password: this.registerForm.value.password,
        confirmPassword: this.registerForm.value.confirmPassword, 
        restaurantName: this.registerForm.value.restaurantName,
        restaurantLocation: this.registerForm.value.restaurantLocation,
        restaurantImage: this.registerForm.value.restaurantImage,
        phoneNumber: this.registerForm.value.phoneNumber
      }
     this.userService.userRegister(register).subscribe((data)=>{
       console.log(data)
       const regiterUser = deserialize<Register>(Register,data)
      alert ("Register Successfully");
    },(error)=>{
      console.log(error);
    });
    }

   
  }

  onChange(roleId: number): void {
    this.registerForm.controls['restaurantName'].setValidators([Validators.required]);
    this.registerForm.controls['restaurantLocation'].setValidators([Validators.required])
    this.registerForm.controls['phoneNumber'].setValidators([Validators.required, Validators.pattern("^[6-9][0-9]{9}$")])
    this.roleIndex = roleId
    this.registerForm.get('roleId').patchValue(roleId)
  }




}
