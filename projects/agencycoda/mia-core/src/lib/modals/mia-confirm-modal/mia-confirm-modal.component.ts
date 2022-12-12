import { Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MiaConfirmModalConfig } from '../../entities/mia-confirm-modal-config';

@Component({
  selector: 'mia-mia-confirm-modal',
  templateUrl: './mia-confirm-modal.component.html',
  styleUrls: ['./mia-confirm-modal.component.scss']
})
export class MiaConfirmModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MiaConfirmModalComponent>,
    @Inject(MAT_DIALOG_DATA) public config: MiaConfirmModalConfig,
  ) { }

  ngOnInit(): void {
  }

  onClick(value: any) {
    this.dialogRef.close(value);
  }
}
