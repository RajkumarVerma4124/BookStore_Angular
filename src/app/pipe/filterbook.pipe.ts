import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterbook'
})
export class FilterbookPipe implements PipeTransform {

  transform(bookFilterData: any, searchString: string) {
    if (!searchString) {
      return bookFilterData;
    }
    return bookFilterData.filter((x: any) => x.bookName.toLocaleLowerCase().includes(searchString)
      || x.bookDetails.toLocaleLowerCase().includes(searchString)
    );
  }

}
