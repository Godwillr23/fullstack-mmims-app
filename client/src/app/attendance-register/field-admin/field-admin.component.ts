import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-field-admin',
  standalone: false,
  templateUrl: './field-admin.component.html',
  styleUrls: ['./field-admin.component.scss']
})
export class FieldAdminComponent {

  AttendanceForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.AttendanceForm = this.fb.group({
      ClientName: ['', Validators.required],
      ClientBranchName: ['', Validators.required],
      ProjectName: ['', Validators.required],
      ReportingLocation: ['', Validators.required],
      OfficeTownship: ['', Validators.required],
      FacilitatorName: ['', Validators.required],
      TeamLeader: ['', Validators.required],
      Latitude: ['', Validators.required],
      Longitude: ['', Validators.required],
      VisitDate: ['', Validators.required],
      VisitTime: ['', Validators.required],
      TodaysRole: ['', Validators.required],
      IsPartnering: ['', Validators.required],
      PartnerName: [''],
      GPSStreetAddress: ['', Validators.required],
      GPSPicture: ['', Validators.required],
      WhatsappLocation: ['', Validators.required],
      VehicleAllocated: ['', Validators.required],
      VehicleDetails: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.AttendanceForm.invalid) {
      console.warn('Form is invalid!');
      return;
    }

    console.log('Form submitted:', this.AttendanceForm.value);
  }
}
