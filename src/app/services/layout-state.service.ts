import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from '../shared/state.service';

interface LayoutState {
  invoiceModal: boolean;
  modalActive: boolean;
}

const initialState: LayoutState = {
  invoiceModal: false,
  modalActive: false,
};

@Injectable({
  providedIn: 'root',
})
export class LayoutStateService extends StateService<LayoutState> {
  $invoiceModal: Observable<boolean> = this.select(
    (state) => state.invoiceModal
  );

  $modalActive: Observable<boolean> = this.select((state) => state.modalActive);

  constructor() {
    super(initialState);
  }

  toggleInvoice() {
    this.setState({ invoiceModal: !this.state.invoiceModal });
  }

  toggleModal() {
    this.setState({ modalActive: !this.state.modalActive });
  }
}
