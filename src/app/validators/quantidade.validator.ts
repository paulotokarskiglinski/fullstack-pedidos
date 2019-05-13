import {FormControl} from '@angular/forms';

export class QuantidadeValidator {

  static quantidadeMultiplo(form: FormControl) {
    if (form.value.quantidade > 0) {
      if (form.value.multiplo === 0) {
        return null;
      } else if (form.value.quantidade % form.value.multiplo === 0) {
        return null;
      } else {
        return {multiplo: 'Valor do múltiplo: ' + form.value.multiplo};
      }
    } else {
      return {quantidade: 'A quantidade do produto deve ser maior que 0'};
    }
  }

}
