
import * as JSZip from 'jszip';

export class LEPub {
  public static async getLocations(file: ArrayBuffer) {
    const zip = await JSZip.loadAsync(file);
    const locations = await zip.file('locations.json')?.async('string');
    return locations ? JSON.parse(locations) : undefined;
  }
}