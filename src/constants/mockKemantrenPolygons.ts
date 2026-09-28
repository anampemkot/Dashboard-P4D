/**
 * Batas wilayah kemantren Kota Yogyakarta — bentuk kasar untuk peta mock.
 *
 * Satu sumber dipakai bersama BR-07 (diagnostik area tak terdata), BR-08
 * (sebaran potensi ekstensifikasi), dan BR-12 (kepatuhan administrasi):
 * geografinya sama, yang berbeda hanya pewarnaan & maknanya. Kalau nanti
 * disambungkan ke GeoJSON resmi Bappeda, cukup file ini yang diganti.
 *
 * Koordinat sengaja poligon sederhana (5-6 titik) di sekitar pusat kota
 * [-7.7956, 110.3695] — cukup untuk membedakan wilayah secara visual tanpa
 * membawa beban geometri sebenarnya.
 */
export type KemantrenName =
  | "Umbulharjo"
  | "Kotagede"
  | "Gondokusuman"
  | "Danurejan"
  | "Gondomanan"
  | "Jetis"
  | "Tegalrejo"
  | "Mantrijeron"
  | "Mergangsan"
  | "Kraton"
  | "Wirobrajan"
  | "Pakualaman"
  | "Ngampilan"
  | "Gedongtengen";

export const KEMANTREN_POLYGONS: Record<KemantrenName, [number, number][]> = {
  Umbulharjo: [
    [-7.8050, 110.3760],
    [-7.8050, 110.3960],
    [-7.8250, 110.3980],
    [-7.8330, 110.3830],
    [-7.8180, 110.3730],
  ],
  Kotagede: [
    [-7.8180, 110.3980],
    [-7.8150, 110.4130],
    [-7.8330, 110.4180],
    [-7.8400, 110.4020],
  ],
  Gondokusuman: [
    [-7.7790, 110.3760],
    [-7.7770, 110.3970],
    [-7.7960, 110.3990],
    [-7.8000, 110.3780],
  ],
  Danurejan: [
    [-7.7880, 110.3670],
    [-7.7870, 110.3780],
    [-7.7990, 110.3790],
    [-7.7995, 110.3680],
  ],
  Gondomanan: [
    [-7.7995, 110.3650],
    [-7.7990, 110.3760],
    [-7.8090, 110.3770],
    [-7.8100, 110.3660],
  ],
  Jetis: [
    [-7.7710, 110.3600],
    [-7.7700, 110.3760],
    [-7.7870, 110.3770],
    [-7.7880, 110.3610],
  ],
  Tegalrejo: [
    [-7.7720, 110.3420],
    [-7.7700, 110.3600],
    [-7.7880, 110.3610],
    [-7.7890, 110.3440],
  ],
  Mantrijeron: [
    [-7.8180, 110.3560],
    [-7.8170, 110.3720],
    [-7.8340, 110.3740],
    [-7.8350, 110.3580],
  ],
  Mergangsan: [
    [-7.8080, 110.3720],
    [-7.8070, 110.3870],
    [-7.8210, 110.3880],
    [-7.8220, 110.3740],
  ],
  Kraton: [
    [-7.8080, 110.3560],
    [-7.8075, 110.3690],
    [-7.8190, 110.3700],
    [-7.8195, 110.3570],
  ],
  Wirobrajan: [
    [-7.7960, 110.3400],
    [-7.7950, 110.3560],
    [-7.8100, 110.3570],
    [-7.8110, 110.3410],
  ],
  Pakualaman: [
    [-7.7940, 110.3790],
    [-7.7935, 110.3880],
    [-7.8020, 110.3890],
    [-7.8025, 110.3800],
  ],
  Ngampilan: [
    [-7.7960, 110.3540],
    [-7.7955, 110.3650],
    [-7.8060, 110.3660],
    [-7.8065, 110.3550],
  ],
  Gedongtengen: [
    [-7.7870, 110.3540],
    [-7.7865, 110.3670],
    [-7.7970, 110.3680],
    [-7.7975, 110.3550],
  ],
};

/** Titik tengah kota — center default semua peta pada dashboard ini. */
export const YOGYAKARTA_CENTER: [number, number] = [-7.7956, 110.3695];
