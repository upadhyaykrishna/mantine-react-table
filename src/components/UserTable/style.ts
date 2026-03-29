import { createStyles } from '@mantine/core';

// this is comment

export const useStyles = createStyles((theme) => ({
  tableContainer: {
    padding: '20px',
    backgroundColor: theme.white,
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },

  table: {
    '& thead tr th': {
      backgroundColor: '#fff',
      color: '#2c3e50',
      fontSize: '14px',
      fontWeight: 600,
      padding: '16px',
      borderBottom: '2px solid #e67e22',
      '&:hover': {
        backgroundColor: '#fff5e6',
      },
    },

    '& tbody tr td': {
      padding: '14px 16px',
      fontSize: '13px',
      borderBottom: '1px solid #eee',
    },

    '& tbody tr:hover': {
      backgroundColor: '#fff5e6',
    },
  },

//   searchBar: {
//     marginBottom: '20px',
//     '.mantine-TextInput-input': {
//       border: '1px solid #e67e22',
//       '&:focus': {
//         borderColor: '#d35400',
//       },
//     },
//   },
 searchBar: {
    marginBottom: '0', // Changed from 20px to 0
    marginLeft: '10px', // Added margin left
    '.mantine-TextInput-input': {
      border: '1px solid #e67e22',
      height: '36px', // Match height with other icons
      minHeight: '36px',
      '&:focus': {
        borderColor: '#d35400',
      },
    },
    '.mantine-TextInput-wrapper': {
      display: 'flex',
      alignItems: 'center',
    }
  },

  filterButton: {
    backgroundColor: '#e67e22',
    color: 'white',
    '&:hover': {
      backgroundColor: '#d35400',
    },
  },

  paginationContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  paginationButton: {
    backgroundColor: '#e67e22',
    color: 'white',
    '&:hover': {
      backgroundColor: '#d35400',
    },
    '&:disabled': {
      backgroundColor: '#f5d0a9',
    },
  },

  pageSize: {
    '.mantine-Select-input': {
      border: '1px solid #e67e22',
      '&:focus': {
        borderColor: '#d35400',
      },
    },
  },
}));