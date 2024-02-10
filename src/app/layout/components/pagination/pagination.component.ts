import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit{
  @Input('limit') limit!: number;
  @Input('counter') counter! : number;
  @Input('totalPages') totalPages! : Array<number>;
  @Output('chagePage')onClickChangePage: EventEmitter<number> = new EventEmitter<number>();
  pages: number = 1;
  pageObject: Array<number> = [];
  
  ngOnInit(): void {
  }

  changePage(pagenumber: number): any {
    let allElements = document.getElementsByClassName('remove-active');
    for(let i = 0; i <+ allElements.length; i ++){
      let ele = allElements.item(i);
      ele?.classList.remove('active');
    }
    let element = document.getElementById( `page-item-${pagenumber}`);
    element?.classList.add("active");

    this.onClickChangePage.emit(pagenumber);
  }


} 
