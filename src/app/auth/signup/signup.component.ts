import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  focused = false
  maxDate: Date = new Date()
  constructor() { }

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: Form) {
    console.log(form)
  }
}
