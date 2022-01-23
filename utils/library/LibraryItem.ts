import * as Epub from 'epubjs';
import { PackagingMetadataObject } from 'epubjs/types/packaging';
import { v4 as uuid } from 'uuid';
import { EpubBook } from '../epub';

export interface Size2D {
  width: number;
  height: number;
}

export interface Pagination {
  size: Size2D;
  pages: string[];
  currentPage: number | '-';
  currentChapter: string;
}

export class LibraryItem {
  public readonly id = uuid();
  public readonly createdA = new Date();
  public readonly metadata: PackagingMetadataObject;
  public readonly cover: Blob;
  public readonly pagination: Pagination;
  public currentLocation: Epub.Location;
  constructor({ cover, metadata }: Omit<EpubBook, 'content'>) {
    this.cover = cover;
    this.metadata = metadata;
    this.pagination = {
      pages: [],
      currentPage: 1,
      currentChapter: '',
      size: { width: 0, height: 0 },
    };
    this.currentLocation = {
      start: { displayed: { page: 0, total: -1 } },
      end: { displayed: { page: 0, total: -1 } },
    } as any;
  }
}
