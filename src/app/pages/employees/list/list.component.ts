import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {
  employees$ = this.employeesSvc.employees;
  navigationExtras: NavigationExtras = {
    state:{
      value: null
    }
  }



  constructor(private router: Router, private employeesSvc: EmployeesService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToInfo(item: any):void{
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  async onGoToDelete(empId: string): Promise<void>{
    try {
     await this.employeesSvc.onDeleteEmployees(empId);
     alert('Registro Eliminado');
    } catch (error) {
      console.log(error);
    }

  }
}
