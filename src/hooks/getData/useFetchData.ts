import { useEffect, useState } from 'react';
import { JsonApi } from '@/utils/json_api';
import { apiService } from '@/services/apiService';

// Define a type for classes that have a parameterless constructor
type ModelConstructor<T> = { new (): T };

interface PaginationMeta {
  total_count: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export const useFetchDataWithPagination = <T, F>(
  endpoint: string,
  modelClass: ModelConstructor<T>, // Model constructor type
  version: 1 | 2 = 2, // JSON:API version
  customParam?: any,
  onSuccess?: (items: T[], meta: PaginationMeta) => void,
  onError?: (error: any) => void,
) => {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState<number>(1);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [perPage, setPerPage] = useState<number>(10);
  const [keyword, setKeyword] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<F | undefined>(undefined);
  const [reload, setReload] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    console.log('Fetching items...');
    setLoading(true);
    setError(null);
    try {
      let params: Record<string, any> = {
        page,
        per_page: perPage,
        ...(keyword ? { keyword } : {}), // Only include keyword if it's defined
        ...customParam,
      };
  
      if (filter) {
        params = { ...params, filter };
      }
  
      const response = await apiService.get(endpoint, params);
  
      // Log response to debug
      console.log('API Response:', response);
      const { data, meta } = response;
      const parsedItems = (data || []).map((item: any) =>
        version === 1
          ? JsonApi.parseJsonApi(modelClass, item)
          : JsonApi.parseJsonApiV2(modelClass, item),
      );
      setItems(parsedItems);
      setMeta(meta);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };
  
  

  useEffect(() => {
    fetchItems();
  }, [page, perPage, keyword, filter, reload]);

  const onChangeKeyword = (val: string) => {
    setKeyword(val);
    setPage(1);
  };

  const onChangeFilter = (val: F) => {
    setFilter(val);
    setPage(1);
  };

  const handleReload = () => {
    setReload((prev) => prev + 1);
  };

  return {
    items,
    page,
    setPage,
    setPerPage,
    perPage,
    keyword,
    onChangeKeyword,
    filter,
    onChangeFilter,
    handleReload,
    meta,
    loading,
    error,
  };
};
