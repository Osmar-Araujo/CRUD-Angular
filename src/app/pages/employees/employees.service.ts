import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/shared/model/employeeinterface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employees: Observable<Employee[]>;

  private employeesCollection: AngularFirestoreCollection<Employee>;

  constructor(private readonly afs: AngularFirestore) {
    this.employeesCollection = afs.collection<Employee>('employees');
    this.getEmployees();
   }

   onDeleteEmployees(empId: string): Promise<void>{
    return new Promise(async(resolve, reject) =>{
      try {
        const result = await this.employeesCollection.doc(empId).delete();
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });

   }

   onSaveEmployees(employee: Employee, empId: string): Promise<void>{
    return new Promise(async (resolve, reject) => {
      try {
        const id = empId || this.afs.createId();
        const data = {id, ...employee};
        const result = await this.employeesCollection.doc(id).set(data);
        resolve(result);
      } catch (error) {
        reject(error.message);
      }
    });

   }

   private getEmployees(): void{
    this.employees = this.employeesCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data() as Employee))
    );
   }
}
