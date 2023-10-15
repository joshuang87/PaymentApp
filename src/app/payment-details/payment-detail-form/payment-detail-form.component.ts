import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrls: ['./payment-detail-form.component.css']
})
export class PaymentDetailFormComponent {

  constructor(public service : PaymentDetailService, private toastr : ToastrService){

  }

  onSubmit(form : NgForm){
    (this.service.formData.paymentDetailId == 0)?this.insertRecord(form) : this.updateRecord(form)
  }

  insertRecord(form : NgForm) {
    this.service.postPaymentDetail().subscribe({
      next: res => {
        console.log(res);
        this.service.list = res as PaymentDetail[]
        this.service.resetForm(form)
        this.toastr.success('Inserted Successfully', 'Payment Detail Register')
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateRecord(form : NgForm) {
    this.service.updatePaymentDetail().subscribe({
      next: res => {
        this.service.list = res as PaymentDetail[]
        this.service.resetForm(form)
        this.toastr.info('Updated Successfully', 'Payment Detail Register')
      },
      error: err => {
        console.log(err);
        
      }
    })
  }
}
