import React, { useMemo, useState } from "react";
import { Column, CellProps, useTable } from "react-table";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financial-record-context";
import './style.css'

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);

  const handleBlur = () => {
    setIsEditing(false);
    if (value !== initialValue) {
      updateRecord(row.index, column.id, value);
    }
  };

  return (
    <div onClick={() => editable && setIsEditing(true)} style={{cursor: editable ? "pointer" : "default"}}>
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ width: "100%" }}
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};

export const FinancialRecordList: React.FC = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

  const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
    const id = records[rowIndex]?._id
    updateRecord(id ?? "",  {...records[rowIndex], [columnId]:value} )
  }
  
  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={true} />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props: CellProps<FinancialRecord>) => (
          <EditableCell {...props} updateRecord={updateCellRecord} editable={false} />
        ),
      },
      {
        Header: "Delete",
        Cell: ({ row }: CellProps<FinancialRecord>) => (
          <button onClick={() => deleteRecord(row.original._id ?? "")} className="button">
            Delete
          </button>
        ),
      },
    ],
    [records]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data: records });

  return (
    <div className="table-container">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => {
            const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
            return (
              <tr key={key} {...restHeaderGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...restColumnProps } = column.getHeaderProps();
                  return (
                    <th key={columnKey} {...restColumnProps}>{column.render("Header")}</th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            const { key, ...restRowProps } = row.getRowProps();
            return (
              <tr key={key} {...restRowProps}>
                {row.cells.map((cell) => {
                  const { key: cellKey, ...restCellProps } = cell.getCellProps();
                  return (
                    <td key={cellKey} {...restCellProps}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
