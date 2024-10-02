import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendContactAction } from '@app/modules/landing/application/store/mail';
import { ContactEntity } from '@app/modules/landing/domain/entities';
import { environment } from '@environment/environment';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
})
export class AboutSectionComponent implements AfterViewInit, OnInit {
  contactForm!: FormGroup;
  isVisible = false;
  isVisible2 = false;
  isVisible3 = false;
  env = environment;

  @ViewChild('aboutUs', { static: false }) animatedSection!: ElementRef;
  @ViewChild('marineSection', { static: false }) animatedSection2!: ElementRef;
  @ViewChild('contactSection', { static: false }) animatedSection3!: ElementRef;

  private observer!: IntersectionObserver;
  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngAfterViewInit(): void {
    this.initializeObserver();

    this.checkIfSectionIsVisible();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  initializeObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.target === this.animatedSection.nativeElement) {
            this.isVisible = entry.isIntersecting;
            this.cdRef.detectChanges();
          }
          if (entry.target === this.animatedSection2.nativeElement) {
            this.isVisible2 = entry.isIntersecting;
            this.cdRef.detectChanges();
          }
          if (entry.target === this.animatedSection3.nativeElement) {
            this.isVisible3 = entry.isIntersecting;
            this.cdRef.detectChanges();
          }
        });
      },
      { threshold: 0.01 }
    );

    if (this.animatedSection) {
      this.observer.observe(this.animatedSection.nativeElement);
    }
    if (this.animatedSection2) {
      this.observer.observe(this.animatedSection2.nativeElement);
    }
    if (this.animatedSection3) {
      this.observer.observe(this.animatedSection3.nativeElement);
    }
  }

  checkIfSectionIsVisible() {
    if (this.animatedSection) {
      const section =
        this.animatedSection.nativeElement.getBoundingClientRect();
      const isInView = section.top < window.innerHeight && section.bottom >= 0;
      this.isVisible = isInView;
      this.cdRef.detectChanges();
    }
    if (this.animatedSection2) {
      const section2 =
        this.animatedSection2.nativeElement.getBoundingClientRect();
      const isInView2 =
        section2.top < window.innerHeight && section2.bottom >= 0;
      this.isVisible2 = isInView2;
      this.cdRef.detectChanges();
    }
    if (this.animatedSection3) {
      const section3 =
        this.animatedSection3.nativeElement.getBoundingClientRect();
      const isInView3 =
        section3.top < window.innerHeight && section3.bottom >= 0;
      this.isVisible3 = isInView3;
      this.cdRef.detectChanges();
    }
  }

  openEmail(): void {
    const email = this.env.fromEmail;
    const subject = '';
    const body = '';

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(mailtoLink, '_self');
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const contact: ContactEntity = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        message: this.contactForm.value.message,
      };

      this.store.dispatch(new SendContactAction(contact)).subscribe({
        next: () => {
          this.contactForm.reset({
            name: '',
            email: '',
            message: '',
          });
        },
        error: err => {
          console.error('Error:', err);
        },
      });
    }
  }

  validateInput(name: string) {
    return (
      this.contactForm.get(name)?.invalid && this.contactForm.get(name)?.touched
    );
  }

  @HostListener('window:popstate')
  onUrlChange() {
    setTimeout(() => {
      this.checkIfSectionIsVisible();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkIfSectionIsVisible();
  }

  scrollToSection(section: string) {
    let element!: ElementRef;
    if (section === 'about') {
      element = this.animatedSection;
    } else if (section === 'marine') {
      element = this.animatedSection2;
    } else {
      element = this.animatedSection3;
    }

    if (element) {
      element.nativeElement.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        this.checkIfSectionIsVisible();
      }, 500);
    }
  }
}
