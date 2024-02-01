import { Component, Input, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  selectedAlbum: any;
    selectedAlbums: any[] = [];
  @Input() items: any[] = [];
  artista: any = {};
  albunes: any[] = [];
  loading: boolean;
  error!: boolean;
  mensajeError!: string;

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.loading = true;
  } 

  ngOnInit() {
    this.router.params.subscribe(params => {
      const artistaId = params['id'];
      this.getArtista(artistaId);
      this.getAlbumsTracks(artistaId);
    });
  }

  getArtista(id: string) {
    this.loading = true;
    this.spotify.getArtista(id)
      .subscribe(artista => {
        console.log(artista);
        this.artista = artista;
        this.loading = false;
      });
  }

  getAlbumsTracks(id: string) {
    this.spotify.getAlbumsTracks(id)
      .subscribe(albumsTracks => {
        console.log(albumsTracks);
        this.albunes = albumsTracks;
        this.loading = false;
      }, (errorServicio) => {
        this.loading = false;
        this.error = true;
        console.log(errorServicio);
        this.mensajeError = errorServicio.error.error.message;
      });
  }

  toggleSelection(album: any): void {
    album.selected = !album.selected;

    if (album.selected) {
        this.selectedAlbum = album;
        this.selectedAlbums.push(album);
    } else {
  
        this.selectedAlbum = null;
        this.selectedAlbums = this.selectedAlbums.filter(selected => selected !== album);
    }
}
agregarDisco(event: any): void {
  if (this.selectedAlbum) {
    const disco = {
      titulo: this.selectedAlbum.name,
      anio: this.selectedAlbum.release_date ? new Date(this.selectedAlbum.release_date).getFullYear() : null,
      urlImagen: this.selectedAlbum.images.length > 0 ? this.selectedAlbum.images[0].url : null
    };

    this.spotify.agregarDiscoFicticio(disco);
    console.log('Disco agregado:', disco);

    this.selectedAlbum = null;
  }
}
}