import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.development';
import { PaymentDetail } from './payment-detail.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url : string = environment.apiBaseUrl + '/PaymentDetails'
  list : PaymentDetail[] = []
  formData : PaymentDetail = new PaymentDetail()

  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.url).subscribe({
      next: res => {
        console.log(res)
        this.list = res as PaymentDetail[]
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

  postPaymentDetail() {
    return this.http.post(this.url, this.formData)
  }

  updatePaymentDetail() {
    // return this.http.put(this.url + '/' + id, this.formData)
    return this.http.put(this.url + '/' + this.formData.paymentDetailId, this.formData)
  }

  resetForm(form : NgForm) : void {
    form.form.reset()
    this.formData = new PaymentDetail()
  }

  deletePaymentDetail(id : number) {
    return this.http.delete(this.url + '/' + id)
  }
}
