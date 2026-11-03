import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {QuantidadeValidator} from './quantidade.validator';

describe('QuantidadeValidator', () => {
  const validar = (quantidade: number, multiplo: number) => QuantidadeValidator.quantidadeMultiplo(
    new UntypedFormGroup({
      quantidade: new UntypedFormControl(quantidade),
      multiplo: new UntypedFormControl(multiplo)
    }) as any
  );

  it('Aceita quantidade múltipla do produto', () => {
    expect(validar(10, 5)).toBeNull();
  });

  it('Aceita qualquer quantidade quando o múltiplo é 0', () => {
    expect(validar(3, 0)).toBeNull();
  });

  it('Rejeita quantidade que não é múltipla', () => {
    expect(validar(7, 5)).toEqual({multiplo: 'Valor do múltiplo: 5'});
  });

  it('Rejeita quantidade menor ou igual a 0', () => {
    expect(validar(0, 5)).toEqual({quantidade: 'A quantidade do produto deve ser maior que 0'});
  });
});
