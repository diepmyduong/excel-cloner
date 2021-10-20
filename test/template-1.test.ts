import _ from 'lodash';
import { getWorksheetCloner } from '../src';
import fs from 'fs';

const MOCK_DATA = {
  thu: 'Thứ 2',
  ngay: '01',
  tongTL: '120 phút',
  groups: [
    {
      makyHieu: 'MB001',
      khoangTG: 'Thứ 2 tới thứ 6',
      latCat: '01',
      tenKhung: 'Giờ vàng',
      items: [
        {
          maBang: 'BH001',
          tenBang: 'Quảng cáo OMO',
          thoiLuong: 15,
          viTri: 'A',
          soLich: '01',
          soPLuc: 'PL001',
          ghiChu: 'note',
        },
        {
          maBang: 'BH002',
          tenBang: 'Quảng cáo OMO',
          thoiLuong: 15,
          viTri: 'A',
          soLich: '01',
          soPLuc: 'PL001',
          ghiChu: 'note',
        },
      ],
    },
    {
      makyHieu: 'MB001',
      khoangTG: 'Thứ 2 tới thứ 6',
      latCat: '01',
      tenKhung: 'Giờ vàng',
      items: [
        {
          maBang: 'BH001',
          tenBang: 'Quảng cáo OMO',
          thoiLuong: 15,
          viTri: 'A',
          soLich: '01',
          soPLuc: 'PL001',
          ghiChu: 'note',
        },
        {
          maBang: 'BH002',
          tenBang: 'Quảng cáo OMO',
          thoiLuong: 15,
          viTri: 'A',
          soLich: '01',
          soPLuc: 'PL001',
          ghiChu: 'note',
        },
      ],
    },
  ],
};
describe('template 1', () => {
  it('redner template without crash', async done => {
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

    expect(true).toBeTruthy();

    done();
  }, 10000);
});
