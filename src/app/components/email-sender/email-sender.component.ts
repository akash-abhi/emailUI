import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmailService } from 'src/app/service/email.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.css']
})
export class EmailSenderComponent implements OnInit {

  
  emailForm!:FormGroup;
  senderMail = new FormControl('');
  toEmail = new FormControl('');
  dateAndTime = new FormControl('');
  subject = new FormControl('');
  body = new FormControl('');
  

  emailData:any;

  allEmails=[];
  allUsers:any;

  emailArray=['a','b'];



  constructor(private emailSer:EmailService,private userService:UserService,
    private fb:FormBuilder) {   }

  ngOnInit(): void {

    this.emailForm = this.fb.group({
      
      senderMail: this.senderMail,
      toEmail: this.fb.array(this.emailArray),
      dateAndTime: this.dateAndTime,
      subject: this.subject,
      body: this.body,
    });

    this.emailSer.getEmaildata().subscribe(res=>{
this.emailData=res;
console.log(res);




    })
  }

  sendEmail(){
   

    // this.emailForm = {
      
    //   senderMail: this.senderMail,
    //   toEmail: this.toEmail,
    //   dateAndTime: this.dateAndTime,
    //   subject: this.subject,
    //   body: this.body,
    // };

   

    console.log(this.emailForm.value);

  }

  

  
  getAllEmail(){
    this.userService.getAllUserData().subscribe({
      next: (res: any) => {
        this.allUsers = res;
        this.allEmails = this.allUsers.map((obj:any)=>obj.emailId);
        console.log(this.allEmails);
      },
    })
  }

  onSubmit(){}

}
