import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  formCadastro: FormGroup;

  constructor(private toast: ToastrService) {}

  onSubmit() {
    if (this.formCadastro.valid) {
      this.toast.success('O formulário está OK!', 'Sucesso!');
    } else {
      // Ok, o formulário não cumpre as regras, hora de descobrir o que houve de errado...
      if (this.formCadastro.get('nome').invalid) {
        // Ok, o "nome" está inválido. Hora de verificar o erro 'na mão'.
        if (this.formCadastro.get('nome').value == null) {
          this.toast.warning('O campo nome está vazio!', 'Problemas!');
        } else if (this.formCadastro.get('nome').value.length < 5) {
          this.toast.warning('O nome está menor que o esperado!', 'Problemas!');
        }

        if (this.formCadastro.get('idade').value == null) {
          this.toast.warning('O campo idade está vazio!', 'Problemas!');
        } else if (parseInt(this.formCadastro.get('idade').value) < 18) {
          this.toast.warning(
            'A idade deve ser maior ou igual a 18!',
            'Problemas!'
          );
        }

        if (this.formCadastro.get('sexo').value == null) {
          this.toast.warning('Nenhum sexo foi selecionado', 'Problemas!');
        }

        // Se houve algum problema, "reseta o formulário!"
        this.initForm();
      }
    }
  }

  initForm() {
    this.formCadastro = new FormGroup({
      nome: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      idade: new FormControl(null, [Validators.required, Validators.min(18)]),
      sexo: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  // Funções auxiliares usadas para complementar a interface.
  nomeIsValid() {
    return this.formCadastro.get('nome').valid;
  }

  idadeIsValid() {
    return this.formCadastro.get('idade').valid;
  }

  sexoIsValid() {
    return this.formCadastro.get('sexo').valid;
  }
}
