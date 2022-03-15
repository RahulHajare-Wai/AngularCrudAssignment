import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ageCount'
})
export class AgeCountPipe implements PipeTransform {
public age=25;
  transform(value:Date) {
    let date=new Date(value)
    let birthYear=date.getFullYear();
    let today=new Date();
    let age=today.getFullYear()-birthYear;
    return age;
  }
}
