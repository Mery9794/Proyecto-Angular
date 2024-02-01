import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { SpotifyService } from '../../../services/spotify.service';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-agregar-disco-ficticio',
  templateUrl: './agregar-disco-ficticio.component.html',
  styleUrl: './agregar-disco-ficticio.component.css'
})
export class AgregarDiscoFicticioComponent implements OnInit {
  discoForm: FormGroup;
discos: any;

  constructor(private formBuilder: FormBuilder, private spotifyService: SpotifyService, private cdr: ChangeDetectorRef) {
    this.discoForm = this.formBuilder.group({
      titulo: ['', Validators.required],
      anio: ['', Validators.required],
      urlImagen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  agregarDiscoFicticio(): void {
    if (this.discoForm.valid) {
      const nuevoDisco = this.discoForm.value;
      this.spotifyService.agregarDiscoFicticio(nuevoDisco);
      this.discoForm.reset();
      this.cdr.detectChanges();
    }
  }
}