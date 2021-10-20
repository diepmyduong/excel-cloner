# Excel Cloner

Easy to clone any fully formatted excel template and place your data any where in template as you like

## Install

```
yarn add excel-cloner
```

## How to use

See test file at test/template-1.test.ts

```
    import { getWorksheetCloner } from 'excel-cloner';

    // Init cloner from template file
    const { cloner, workbook } = await getWorksheetCloner(
      'templates/01.xlsx',
      'template'
    );

    // Prepare data
    const data = MOCK_DATA;

    // Clone Header
    cloner.next('A1', 'L3', data);

    // Clone Group
    _.forEach(data.groups, (group, index) => {
      // Clone Group Header
      cloner.next('A4', 'L7', { ...group, index: index + 1 });

      // Clone Group Item
      const firstItemRowIndex = cloner.cursor.row + 1;
      _.forEach(group.items, (item, index) => {
        cloner.next('A8', 'L8', { ...item, index: index + 1 });
      });

      // Add dynamic formula
      const lastItemRowIndex = cloner.cursor.row;
      const formula = `=SUM(H${firstItemRowIndex}:H${lastItemRowIndex})`;
      // Clone Group Footer & margin 1 row
      cloner.next('A9', 'L9', { tongTL: formula }, 1);
    });

    // Clone Footer
    cloner.next('A10', 'L19', { FOOTER_02: 'Nội dung cuối file' });

    // Export workbook
    const result = fs.createWriteStream('result.xlsx');
    await workbook.xlsx.write(result);

```

## Demo

### Template

![Template](https://i.imgur.com/632mSDU.png)

### Result

![Result](https://i.imgur.com/JbscOXg.png)

# excel-cloner
