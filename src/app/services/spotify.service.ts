import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, combineLatest , BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private discosFicticios: any[] = [];
  private discosFicticiosSubject = new BehaviorSubject<any[]>([]);

  discosFicticios$ = this.discosFicticiosSubject.asObservable();
  
  constructor(private http: HttpClient) {
    console.log('Spotify Service Listo');
  }


  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({

      'Authorization': 'Bearer BQBZrHVVfWSLQFLLD-Pu6Seo3acTKivwBcmzFopqjkF0U1eDmuo2tzgIsN_TXNKBCwsDHYOvGp7h7AbuFWbasUQ-qf6Bo1IMD_vmuy4KrS7mfG6WnwlPA8fXnLSGAXTQ0Vr4k93MAB9urcpnZsnWCvDW2fjgElyPFMEcC53tlMmzooMGMuTbraYpNSGMnJ-e2WywGydz9W4'
    });

    return this.http.get(url, { headers });
  }

  //Nuevos lanzamientos
  getNewReleases() {
    return this.getQuery('browse/new-releases')
      .pipe(map((data: any) => data.albums.items));
  }


  //Artistas
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      .pipe(map((data: any) => data.artists.items));
  }
  //Artista en particular
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);

  }
  //Top de artistas
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map((data: any) => {
        return data["tracks"];
      }));
  }

  //Albun en particular
  getAlbum(id: string) {
    return this.getQuery(`albums/${id}`);
  }
  //Top de Albunes  
  getAlbumsTracks(id: string) {
    return this.getQuery(`artists/${id}/albums?country=us`)
      .pipe(map((data: any) => {
        // Ordenar los álbumes por popularidad (el más popular primero)
        const albums = data.items.sort((a: any, b: any) => b.popularity - a.popularity);
        // Tomar los primeros 10 álbumes
        const albumsTracks = albums.slice(0, 10);
        return albumsTracks;
      }));
  }

  // las canciones de un álbum
  getAlbumTracks(id: string) {
    return this.getQuery(`albums/${id}/tracks`)
      .pipe(map((data: any) => data.items));
  }

  // Obtener todos los discos (reales y ficticios)
getDiscos(): Observable<any[]> {
  return combineLatest([this.getDiscosReales(), this.discosFicticios$])
    .pipe(
      map(([discosReales, discosFicticios]) => [...discosReales, ...discosFicticios])
    );
}


agregarDiscoFicticio(disco: any): void {
  this.discosFicticios.push(disco);
  this.discosFicticiosSubject.next([...this.discosFicticios]);
  console.log('Disco ficticio agregado:', disco);
}


  // Función para obtener los discos reales
  getDiscosReales(): Observable<any[]> {
    return this.http.get<any[]>('https://api.spotify.com/v1/albums');
  }
}