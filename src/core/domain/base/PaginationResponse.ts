export interface PaginationResponseProps<T> {
  data: T[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export class PaginationResponse<T> {
  protected readonly props: PaginationResponseProps<T>;

  constructor(props: PaginationResponseProps<T>) {
    this.props = props;
  }

  hasNextPage(): boolean {
    return this.props.currentPage < this.props.totalPages;
  }

  hasPreviousPage(): boolean {
    return this.props.currentPage > 1;
  }

  toResponse<K>(converter: (item: T) => K) {
    return {
      data: this.props.data.map(converter),
      pagination: {
        totalItems: this.props.totalItems,
        currentPage: this.props.currentPage,
        pageSize: this.props.pageSize,
        totalPages: this.props.totalPages,
      },
    };
  }
}
