export type ApiResponse<DataType = unknown> =
  | {
      success: true;
      data?: DataType;
    }
  | {
      success: false;
      error: string;
    };
