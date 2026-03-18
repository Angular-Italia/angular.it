import {
  Combobox,
  ComboboxInput,
  ComboboxPopup,
  ComboboxPopupContainer,
} from '@angular/aria/combobox';
import {Listbox, Option} from '@angular/aria/listbox';
import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  viewChild,
  viewChildren,
} from '@angular/core';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [
    Combobox,
    ComboboxInput,
    ComboboxPopup,
    ComboboxPopupContainer,
    Listbox,
    Option,
    OverlayModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  /** Il popup del listbox del combobox. */
  listbox = viewChild<Listbox<string>>(Listbox);

  /** Le opzioni disponibili nel listbox. */
  options = viewChildren<Option<string>>(Option);

  /** Un riferimento al combobox ng aria. */
  combobox = viewChild<Combobox<string>>(Combobox);

  /** La stringa visualizzata nel combobox. */
  displayValue = computed(() => {
    const values = this.listbox()?.values() || [];
    return values.length ? values[0] : 'Seleziona un\'etichetta';
  });

  /** Le etichette disponibili per la selezione. */
  labels = ['Importante', 'Con stella', 'Lavoro', 'Personale', 'Da fare', 'Più tardi', 'Da leggere', 'Viaggio'];

  constructor() {
    // Scorre all'elemento attivo quando l'opzione attiva cambia.
    // Il leggero ritardo qui serve per garantire che le animazioni siano completate prima dello scorrimento.
    afterRenderEffect(() => {
      const option = this.options().find((opt) => opt.active());
      setTimeout(() => option?.element.scrollIntoView({block: 'nearest'}), 50);
    });

    // Reimposta la posizione di scorrimento del listbox quando il combobox viene chiuso.
    afterRenderEffect(() => {
      if (!this.combobox()?.expanded()) {
        setTimeout(() => this.listbox()?.element.scrollTo(0, 0), 150);
      }
    });
  }
}
