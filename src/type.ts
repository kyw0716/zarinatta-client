export interface PaginationResponse {
  page: number;
  totalDataCount: number;
  totalPageCount: number;
}

export interface Ticket {
  ticketId: number;
  ticketType: string;
  departTime: string;
  arriveTime: string;
  departStation: string;
  arriveStation: string;
  price: string;
}

export interface SearchStationResponse extends PaginationResponse {
  responseList: Ticket[];
}

export type SeatVariation = 'SEAT' | 'STANDING_SEAT' | 'NOTFOUND';

export interface BookmarkRequestParams {
  ticketId: number;
  wantFirstClass: boolean;
  wantNormalSeat: SeatVariation;
  wantBabySeat: SeatVariation;
  wantWaitingReservation: boolean;
}

export interface Bookmark extends Ticket, BookmarkRequestParams {
  departDate: string;
  bookmarkId: number;
}

export interface BookmarkResponse extends PaginationResponse {
  responseList: Bookmark[];
}
