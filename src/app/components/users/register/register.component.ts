import { Component } from '@angular/core';
import { RegisterService } from '../../../services/users/register.service';
import { ValideRegisterService } from '../../../services/users/valideregister.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DarkModeToggleComponent } from '../../main/pages/header/dark-mode-toggle/dark-mode-toggle.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, DarkModeToggleComponent],
  templateUrl: './register.component.html',
  
})
export class RegisterComponent{
  registerCredentials = {
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    password: '',
    password_confirmation: ''
  };

  validationErrors: { [key: string]: string } = {};
  errorMessage = '';
  successMessage = '';
  constraints: any;

  fieldNames: { [key: string]: string } = {
    first_name: 'nombre',
    last_name: 'apellido',
    email: 'correo electrónico',
    phone_number: 'número de teléfono',
    password: 'contraseña',
    password_confirmation: 'confirmación de contraseña'
  };

  constructor(
    private registerService: RegisterService,
    private valideRegisterService: ValideRegisterService
  ) {}

  ngOnInit() {
    this.loadConstraints();
  }

  loadConstraints() {
    this.valideRegisterService.getConstraints().subscribe({
      next: (constraints) => {
        this.constraints = constraints;
      },
      error: (error) => {
        console.error('Error al cargar las restricciones', error);
      }
    });
  }

  validateField(field: string) {
    this.validationErrors[field] = '';
    const value = this.registerCredentials[field as keyof typeof this.registerCredentials];
    const fieldConstraints = this.constraints[field];
    const fieldName = this.fieldNames[field] || field;

    if (fieldConstraints) {
      if (fieldConstraints.min_length && value.length < fieldConstraints.min_length) {
        this.validationErrors[field] = `El ${fieldName} debe tener al menos ${fieldConstraints.min_length} caracteres.`;
      } else if (fieldConstraints.max_length && value.length > fieldConstraints.max_length) {
        this.validationErrors[field] = `El ${fieldName} no debe exceder ${fieldConstraints.max_length} caracteres.`;
      }

      if (field === 'email' && !value.includes('@')) {
        this.validationErrors[field] = 'El correo electrónico debe contener "@".';
      }

      if (field === 'phone_number' && value) {
        const regex = new RegExp(fieldConstraints.regex.slice(1, -1));
        if (!regex.test(value)) {
          this.validationErrors[field] = 'El número de teléfono debe contener 8 dígitos.';
        }
      }
    }

    // Validaciones específicas para contraseña y confirmación
    if (field === 'password' || field === 'password_confirmation') {
      this.validatePasswords();
    }
  }

  validatePasswords() {
    const password = this.registerCredentials.password;
    const confirmation = this.registerCredentials.password_confirmation;

    // Limpiar errores previos
    this.validationErrors['password'] = '';
    this.validationErrors['password_confirmation'] = '';
    
    // Inicializamos variables para cada tipo de error
    let lengthError = false;
    let numberError = false;

    // Validar longitud mínima
    if (password.length < 8) {
      lengthError = true;
    }

    // Validar que contenga al menos 2 números
    if ((password.match(/\d/g) || []).length < 2) {
      numberError = true;
    }

    // Determinar qué mensaje mostrar
    if (lengthError && numberError) {
      this.validationErrors['password'] = 'La contraseña debe contener al menos 8 caracteres y 2 números.';
    } else if (lengthError) {
      this.validationErrors['password'] = 'La contraseña debe tener al menos 8 caracteres.';
    } else if (numberError) {
      this.validationErrors['password'] = 'La contraseña debe contener al menos 2 números.';
    }

    // Validar que las contraseñas coincidan
    if (password !== confirmation && confirmation.length > 0) {
      this.validationErrors['password_confirmation'] = 'Las contraseñas no coinciden.';
    }
  }

  isFieldValid(field: string): boolean {
    return this.registerCredentials[field as keyof typeof this.registerCredentials].length > 0 && !this.validationErrors[field];
  }

  onPhoneNumberInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
    this.registerCredentials.phone_number = input.value;
    this.validateField('phone_number');
  }

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
    this.validationErrors = {}; // Resetear errores previos
  
    // Validar todos los campos antes de enviar
    Object.keys(this.registerCredentials).forEach(field => this.validateField(field));
    
    // Verificar si hay errores de validación
    if (Object.values(this.validationErrors).some(error => error !== '')) {
      this.errorMessage = 'Por favor, corrige los errores en el formulario.';
      return;
    }
  
    this.registerService.register(this.registerCredentials).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
        this.resetForm();
      },
      error: (error) => {
        console.error('Error en el registro', error);
        this.handleErrorResponse(error);
      }
    });
  }

  private resetForm() {
    this.registerCredentials = {
      email: '',
      first_name: '',
      last_name: '',
      phone_number: '',
      password: '',
      password_confirmation: ''
    };
    this.validationErrors = {};
  }

  private handleErrorResponse(error: any) {
    this.validationErrors = {}; // Resetear errores previos
    this.errorMessage = '';
  
    if (error.error && typeof error.error === 'object') {
      Object.entries(error.error).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          this.validationErrors[key] = value[0]; // Tomar el primer mensaje de error
        } else if (typeof value === 'string') {
          this.validationErrors[key] = value;
        }
      });
  
      if (this.validationErrors['email']) {
        this.validationErrors['email'] = "Error: Email ya registrado.";
      }
  
      // Si hay errores que no son de campos específicos, agregarlos al mensaje de error general
      if (error.error.non_field_errors) {
        this.errorMessage = error.error.non_field_errors.join(', ');
      }
    } else if (typeof error.error === 'string') {
      this.errorMessage = error.error;
    } else {
      this.errorMessage = 'Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.';
    }
  
    console.error('Errores de validación:', this.validationErrors);
    console.error('Mensaje de error general:', this.errorMessage);
  }
}