import {
  Component,
  OnInit
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm = new FormGroup({});
  nameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  surNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  phoneControl = new FormControl('', [Validators.required, this.phoneValidator()]);
  commentsControl = new FormControl('');
  recaptchaControl = new FormControl('', Validators.required);

  token: string | undefined;
  captchaResolved: boolean = false;

  constructor() {
    this.token = undefined;
  }

  ngOnInit(): void {
    this.initForm();
  }

  checkCaptcha(captchaResponse: string) {
    this.captchaResolved = (captchaResponse && captchaResponse.length > 0) ? true : false
  }

  initForm() {
    this.contactForm = new FormGroup({
      name: this.nameControl,
      last_name: this.surNameControl,
      email: this.emailControl,
      phone: this.phoneControl,
      comments: this.commentsControl,
      captcha: this.recaptchaControl
    })
  }

  private phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneRegex = /^[0-9]{10}$/;

      const isValid = phoneRegex.test(control.value);

      return isValid ? null : {
        invalidPhone: true
      };
    };
  }

  onSubmit() {
    this.contactForm.reset();
    alert('Form submitted!')
  }

}
