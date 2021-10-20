import { Worksheet, Workbook } from 'exceljs';
import { CellRange } from './cellRange';
import { Cursor } from './cursor';
import { WorkSheetHelper } from './workSheetHelper';
export class SheetCloner {
  constructor(public baseSheet: Worksheet, public destSheet: Worksheet) {
    this.helper = new WorkSheetHelper(this.baseSheet);
  }
  public cursor = new Cursor();
  public helper: WorkSheetHelper;
  next(tl: string, br: string, context?: any, margin: number = 0) {
    const templateRange = CellRange.createFromCells(
      this.baseSheet.getCell(tl),
      this.baseSheet.getCell(br)
    );
    const rangeDest = new CellRange(
      1,
      templateRange.left,
      templateRange.countRows,
      templateRange.right
    );
    rangeDest.move(this.cursor.row, this.cursor.col);
    this.helper.copyCellRange(
      templateRange,
      rangeDest,
      this.baseSheet,
      this.destSheet
    );
    if (context) {
      this.helper.parseRange(rangeDest, context, this.destSheet);
    }
    this.cursor.down(templateRange.countRows + margin);
  }
  cloneWidth() {
    this.helper.cloneSheetWidth(this.destSheet);
  }
}

export const getWorksheetCloner = async (
  templatePath: string,
  baseSheetName: string,
  destSheetName?: string
) => {
  const baseWorkbook = new Workbook();
  await baseWorkbook.xlsx.readFile(templatePath);
  const workbook = new Workbook();
  const reportSheet = workbook.addWorksheet(destSheetName);
  const cloner = new SheetCloner(
    baseWorkbook.getWorksheet(baseSheetName),
    reportSheet
  );
  cloner.cloneWidth();
  return { cloner, workbook };
};
