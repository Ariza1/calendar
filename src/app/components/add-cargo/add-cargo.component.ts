import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { CargoDialogData } from 'src/app/models/empleados.model';

@Component({
  selector: 'app-add-cargo',
  templateUrl: './add-cargo.component.html',
  styleUrls: ['./add-cargo.component.scss'],
  standalone: true,
  imports:  [MaterialModule, ReactiveFormsModule]
})
export class AddCargoComponent implements OnInit{
  formCargo: FormGroup;
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: CargoDialogData
  ){
    this.formCargo = this.fb.group({
      nombre: ['', [Validators.required]],
      valorHora: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    if (this.data.cargo) {
      this.formCargo.patchValue(this.data.cargo);
    }
  }

}
