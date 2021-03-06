import { EmployeesService } from './../employees.service';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from '../../../shared/model/employeeinterface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  ngOnInit(): void {
    if (typeof this.employee == 'undefined'){
      this.router.navigate(['list']);
    }
  }

  navigationExtras: NavigationExtras = {
    state:{
      value: null
    }
  }

  employee: Employee = null;
  constructor(private router: Router, private employeesSvc: EmployeesService) {
    const navigation =this.router.getCurrentNavigation();
    this.employee = navigation?.extras?.state?.value;
  }


  onGoToEdit(): void{
    this.navigationExtras.state.value = this.employee;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  async onGoToDelete(): Promise<void>{
    try {
     await this.employeesSvc.onDeleteEmployees(this.employee.id);
     alert('Registro Eliminado');
     this.onGoBackToList();
    } catch (error) {
      console.log(error);
    }

  }

  onGoBackToList(): void{
    this.router.navigate(['list']);
  }

}
