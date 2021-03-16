import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../model/employeeinterface';
import { EmployeesService } from '../../../pages/employees/employees.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
})
export class EmployeeFormComponent implements OnInit {

  employee:Employee = null;

  employeeForm: FormGroup;

  private isEmail = /\S+@\S+\.\S+/;

  constructor(private router: Router, private fb: FormBuilder,private employeesSvc: EmployeesService) {
    const navigation = this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
    this.initForm();
  }

  ngOnInit(): void {

    if (typeof this.employee == 'undefined'){
      this.router.navigate(['new']);
    }else{
      this.employeeForm.patchValue(this.employee);
    }
  }


  onSave(): void{
    console.log('Salvo', this.employeeForm.value);
    if (this.employeeForm.valid){
      const employee = this.employeeForm.value;
      const employeeId = this.employee?.id || null;
      this.employeesSvc.onSaveEmployees(employee, employeeId);
      this.employeeForm.reset();
    }
  }

  onGoBackToList(): void {
    this.router.navigate(['list']);
  }

  private initForm(): void{
    this.employeeForm = this.fb.group({
      name: ['',[Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['',[Validators.required, Validators.pattern(this.isEmail)]],
      startDate: ['', [Validators.required]],
    });
  }

}
