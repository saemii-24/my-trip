export class CustomError extends Error {
  status: string;
  details: any;

  constructor(message: string, status: string, details: any = {}) {
    super(message);
    this.status = status || 'unknown'; // 에러가 발생한 이유를 적는다.
    this.details = details; // 추가적인 에러 상세 정보
  }
}
