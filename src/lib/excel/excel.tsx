import * as React from 'react'
import Workbook from 'react-excel-workbook'

const data1 = [
    {
      foo: '123',
      bar: '456',
      baz: '789'
    },
    {
      foo: 'abc',
      bar: 'dfg',
      baz: 'hij'
    },
    {
      foo: 'aaa',
      bar: 'bbb',
      baz: 'ccc'
    }
  ]
   
  const data2 = [
    {
      aaa: 1,
      bbb: 2,
      ccc: 3
    },
    {
      aaa: 4,
      bbb: 5,
      ccc: 6
    }
  ]

export type ExcelProps  = { 
    children?:JSX.Element,
    dataSet:Array<{sheetName:string,data:Array<{}>}>,
    name:string
}


export function Excel (props:ExcelProps){

    const generateColumns = (row:any) =>{
        const columns:JSX.Element[] = []
        Object.keys(row.data[0]).map((column,index)=>{
           columns.push(
                <Workbook.Column  key={index} label={column} value={column}/>
           )
        })
        return columns
    }
    
    const generateSheet = () => {
        const ui:JSX.Element[] = []
        props.dataSet.map((row,index)=>{
            ui.push(
                <Workbook.Sheet key={index} data={row.data} name={row.sheetName}>
                    {generateColumns(row)}
                </Workbook.Sheet>
            )
        })
        return ui
    }

    return (
        <Workbook filename={`${props.name}.xlsx`} element={props.children}>
           {generateSheet()}
        </Workbook>
    )
}

