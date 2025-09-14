'use client';
import { useEffect, useState } from 'react';
import { MantineReactTable, MRT_ColumnDef } from 'mantine-react-table';
import { Box, TextInput, Select } from '@mantine/core';
import { fetchUserData, setPageSize, setCurrentPage } from '../../redux/features/userSlice';
import { User } from '../../types/user';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useStyles } from './style';
import { RootState } from '@/redux/store';
import { MRT_PaginationState } from 'mantine-react-table';

export default function UserTable() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const { users, loading, total, currentPage, pageSize } = useAppSelector(
    (state: RootState) => state.users
  );

  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<{ id: string; desc: boolean }[]>([]);

  const columns: MRT_ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'company',
      header: 'Company',
    },
    {
      accessorKey: 'address',
      header: 'Address',
    },
    {
      accessorKey: 'joinDate',
      header: 'Join Date',
      Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
    },
  ];

  useEffect(() => {
    const fetchData = () => {
      dispatch(
        fetchUserData({
          page: currentPage,
          pageSize,
          searchTerm: globalFilter,
          sortBy: sorting[0]?.id,
          sortOrder: sorting[0]?.desc ? 'desc' : 'asc',
        })
      );
    };

    const debounceTimer = setTimeout(fetchData, 300);
    return () => clearTimeout(debounceTimer);
  }, [dispatch, currentPage, pageSize, globalFilter, sorting]);

  return (
    <Box className={classes.tableContainer}>
      <MantineReactTable
        columns={columns}
        data={users}
        initialState={{ showColumnFilters: true }}
        manualPagination
        manualFiltering
        manualSorting
        enableColumnFilters
        enableFilters
        enableGlobalFilter
        enableSorting
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={(updater) => {
          if (typeof updater === 'function') {
            const newPaginationState = updater({
              pageIndex: currentPage - 1,
              pageSize: pageSize
            } as MRT_PaginationState);
            dispatch(setCurrentPage(newPaginationState.pageIndex + 1));

            // Handle pageSize change from bottom dropdown
            if (newPaginationState.pageSize !== pageSize) {
              dispatch(setPageSize(newPaginationState.pageSize));
            }
          }
        }}
        onSortingChange={setSorting}
        rowCount={total}
        pageCount={Math.ceil(total / pageSize)}
        state={{
          isLoading: loading,
          pagination: {
            pageIndex: currentPage - 1,
            pageSize,
          },
          globalFilter,
          sorting,
        }}
        mantineTableProps={{
          className: classes.table,
        }}
        mantineSearchTextInputProps={{
          className: classes.searchBar,
          placeholder: 'Search all columns...',
        }}
        mantinePaginationProps={{
          className: classes.paginationContainer,
        //   rowsPerPageOptions: [], // This will hide the bottom rows per page selector
         rowsPerPageOptions: ['10', '15', '20', '25', '30'], // Enable bottom dropdown with these options
         sx: {
            '.mantine-Select-root': {
              '.mantine-Select-input': {
                border: '1px solid #e67e22',
                '&:focus': {
                  borderColor: '#d35400',
                }
              },
              '.mantine-Select-dropdown': {
                border: '1px solid #e67e22'
              },
              '.mantine-Select-item[data-selected]': {
                backgroundColor: '#e67e22',
                '&:hover': {
                  backgroundColor: '#d35400'
                }
              }
            }
          }
        }}
        renderTopToolbarCustomActions={() => null}
        // renderTopToolbarCustomActions={() => (
        //   <Select
        //     className={classes.pageSize}
        //     label="Rows per page"
        //     value={pageSize.toString()}
        //     onChange={(value) => dispatch(setPageSize(Number(value)))}
        //     data={['10', '15', '20', '25', '30'].map((size) => ({
        //       value: size,
        //       label: size,
        //     }))}
        //   />
        // )}
        // mantineBottomToolbarProps={{
        //   sx: {
        //     '.mantine-Select-root': {
        //       display: 'none', // This will hide the bottom rows per page selector
        //     },
        //   },
        // }}
      />
    </Box>
  );
}