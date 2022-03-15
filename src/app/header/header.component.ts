import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { HeaderModel } from './header.model';


export interface Images {
  value: string;
  path:string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display='hide'
  rowId=0
  valid=true
  isUpdateMode='Save'
  personModelObj:HeaderModel=new HeaderModel()
  formValue !:FormGroup
  personData!:any
  constructor(private api:ApiService,private formBuilder:FormBuilder,
    private toastr:ToastrService) { }

  Email=new FormControl(null,[Validators.required,Validators.email])
  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      name:[''],
      email:[''],
      country:[''],
      dob:[''],
      avatar:['']
  })
  this.getAllPerson();
  }

  operateData(){
    if(this.isUpdateMode=='Save'){
      let bYear=new Date(this.formValue.value.dob)
      let currentYear=new Date();
      let bAge=currentYear.getFullYear()-bYear.getFullYear();
      if(this.formValue.value.name==''||this.formValue.value.email==''||this.formValue.value.avatar==''){
        this.toastr.info('please fill all data..')
      }else if(bAge<20){
        this.toastr.info('Your age never less than 20');
      }else{
        this.postPersonDetails();
      }
    }else{

      this.onUpdatePerson();
    }
  }

  onEdit(row:any){
    this.isUpdateMode='Update'
    this.personModelObj.id=row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['country'].setValue(row.country);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['avatar'].setValue(row.avatar);
  }


  getAllPerson(){
    this.api.getPerson()
    .subscribe(res=>{
      this.personData=res;
    })
  }

  onUpdatePerson(){
    this.personModelObj.name=this.formValue.value.name;
    this.personModelObj.email=this.formValue.value.email;
    this.personModelObj.country=this.formValue.value.country;
    this.personModelObj.dob=this.formValue.value.dob;
    this.personModelObj.avatar=this.formValue.value.avatar;

    this.api.updatePerson(this.personModelObj,this.personModelObj.id)
    .subscribe(res=>{
      this.toastr.success('Record updated successfully.');
      this.isUpdateMode='Save'
      let ref=document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllPerson();
    })
  }

  postPersonDetails(){
    this.personModelObj.name=this.formValue.value.name;
    this.personModelObj.email=this.formValue.value.email;
    this.personModelObj.country=this.formValue.value.country;
    this.personModelObj.dob=this.formValue.value.dob;
    this.personModelObj.avatar=this.formValue.value.avatar;

    //post the data
    this.api.postPerson(this.personModelObj)
    .subscribe(res=>{
      console.log(res);
      this.toastr.success('Record added successfully.')
      let ref=document.getElementById('cancel')
      ref?.click()
      this.formValue.reset();
      this.getAllPerson();
    },
    err=>{
      this.toastr.error('Something went wrong')
    })
  }

  deletePerson(){
    this.api.deletePerson(this.rowId)
    .subscribe(res=>{
      this.toastr.error('Person Successfully Deleted...')
      this.getAllPerson();
      this.display='hide'
    })
  }

  resetData(){
    this.formValue.reset();
    this.isUpdateMode='Save'
  }

  message=''
  resultEmail=false
  validateEmail(email:any){
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(regexp.test(email)===true ||email===''){
      this.resultEmail=true;
      this.message='';
    }else{
      this.resultEmail=false;
      this.message='Invalid Email Address'
    }
  }


  showMessage(row:number){
    this.display='show'
    this.rowId=row
  }

  fetchData(){
    this.display='hide'
  }

  avatar1(){
    this.formValue.controls['avatar'].setValue('https://png.pngitem.com/pimgs/s/78-786293_1240-x-1240-0-avatar-profile-icon-png.png');
  }

  avatar2(){
    this.formValue.controls['avatar'].setValue('https://www.w3schools.com/w3images/avatar2.png');
  }

  avatar3(){
    this.formValue.controls['avatar'].setValue('https://www.w3schools.com/howto/img_avatar2.png');
  }
  avatar4(){
    this.formValue.controls['avatar'].setValue('https://www.w3schools.com/w3images/avatar6.png');
  }
}
