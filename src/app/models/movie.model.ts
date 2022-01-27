export class Movie {
  constructor(
    public adult: string,
    public backdrop_path: string,
    public belongs_to_collection: string[],
    public budget: string,
    public genres: Genre[],
    public homepage: string,
    public id: string,
    public imdb_id: string,
    public original_language: string,
    public original_title: string,
    public overview: string,
    public popularity: string,
    public poster_path: string,
    public production_companies: any[],
    public production_countries: object,
    public release_date: Date,
    public revenue: string,
    public runtime: string,
    public spoken_languages: Object,
    public status: string,
    public tagline: string,
    public title: string,
    public video: string,
    public vote_average: string,
    public vote_count: string
  ) {}

  get getPosterURL(): String {
    return this.poster_path
      ? `https://image.tmdb.org/t/p/w500/${this.poster_path}`
      : 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg';
  }
}

export class Genre {
  constructor(public name: string, public id: string) {}
}

export class TrailersMovies {
  constructor(
    public iso_639_1: string,
    public iso_3166_1: string,
    public name: string,
    public key: string,
    public site: string,
    public size: string,
    public type: string,
    public official: string,
    public published_at: string,
    public id: string
  ) {}
}
