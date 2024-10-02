import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendNewsletterAction } from '@app/modules/landing/application/store/mail';
import { NewsletterEntity } from '@app/modules/landing/domain/entities';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-why-revert-section',
  templateUrl: './why-revert-section.component.html',
})
export class WhyRevertSectionComponent implements AfterViewInit, OnInit {
  isVisible = false;
  isVisible2 = false;
  isVisible3 = false;

  newsletterForm!: FormGroup;

  @ViewChild('animatedSection', { static: false }) animatedSection!: ElementRef;
  @ViewChild('animatedSection2', { static: false })
  animatedSection2!: ElementRef;
  @ViewChild('animatedSection3', { static: false })
  animatedSection3!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      consent: [false, Validators.requiredTrue],
    });
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === this.animatedSection.nativeElement) {
            this.isVisible = entry.isIntersecting;
          }

          if (entry.target === this.animatedSection2.nativeElement) {
            this.isVisible2 = entry.isIntersecting;
          }

          if (entry.target === this.animatedSection3.nativeElement) {
            this.isVisible3 = entry.isIntersecting;
          }
        });
      },
      { threshold: 0.3 }
    );

    if (this.animatedSection) {
      observer.observe(this.animatedSection.nativeElement);
    }

    if (this.animatedSection2) {
      observer.observe(this.animatedSection2.nativeElement);
    }

    if (this.animatedSection3) {
      observer.observe(this.animatedSection3.nativeElement);
    }
  }

  onSubmit() {
    if (this.newsletterForm.valid) {
      const contact: NewsletterEntity = {
        email: this.newsletterForm.value.email,
      };

      this.store.dispatch(new SendNewsletterAction(contact)).subscribe({
        next: () => {
          this.newsletterForm.reset();
          this.newsletterForm.get('consent')?.setValue(false);
        },
        error: () => {
          this.newsletterForm.get('consent')?.setValue(false);
        },
      });
    }
  }

  validateInput(name: string) {
    return (
      this.newsletterForm.get(name)?.invalid &&
      this.newsletterForm.get(name)?.touched
    );
  }
}
