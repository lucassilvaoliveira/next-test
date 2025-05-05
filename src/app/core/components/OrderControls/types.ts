export type OrderUsersByType = "name" | "createdAt"
export type OrderUsersByTimeType = "asc" | "desc"

export type SortControlsType = {
  orderBy: OrderUsersByType;
  setOrderBy: (value: OrderUsersByType) => void;
  orderByTime: OrderUsersByTimeType ;
  setOrderByTime: (value: OrderUsersByTimeType) => void;
}